--[[
	DoodleJumpClient - Client du jeu Doodle Jump
	- Touches A/D ou Flèches : gauche / droite
	- Caméra qui suit le doodle (vue de côté, type 2D)
	- Affichage du score et "Game Over"
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local UserInputService = game:GetService("UserInputService")

local player = Players.LocalPlayer
local Remotes = ReplicatedStorage:WaitForChild("Remotes")
local DoodleMove = Remotes:WaitForChild("DoodleMove")
local DoodleGameOver = Remotes:WaitForChild("DoodleGameOver")

local moveDirection = 0
local cameraOffset = Vector3.new(0, 0, 25)
local gameOverGui = nil

-- Input
UserInputService.InputBegan:Connect(function(input, gameProcessed)
	if gameProcessed then return end
	if input.KeyCode == Enum.KeyCode.A or input.KeyCode == Enum.KeyCode.Left then
		moveDirection = -1
	elseif input.KeyCode == Enum.KeyCode.D or input.KeyCode == Enum.KeyCode.Right then
		moveDirection = 1
	end
end)

UserInputService.InputEnded:Connect(function(input)
	if input.KeyCode == Enum.KeyCode.A or input.KeyCode == Enum.KeyCode.Left then
		if moveDirection == -1 then moveDirection = 0 end
	elseif input.KeyCode == Enum.KeyCode.D or input.KeyCode == Enum.KeyCode.Right then
		if moveDirection == 1 then moveDirection = 0 end
	end
end)

-- Envoyer la direction au serveur
RunService.RenderStepped:Connect(function()
	DoodleMove:FireServer(moveDirection)
end)

-- Caméra : suit le doodle (vue de profil, effet 2D)
local function getDoodle()
	local model = workspace:FindFirstChild("Doodle_" .. player.UserId)
	if not model then return nil end
	return model:FindFirstChild("DoodlePart")
end

-- Cacher le personnage Roblox pour ne voir que la boule Doodle
local function hideCharacter()
	local char = player.Character
	if not char then return end
	for _, part in ipairs(char:GetDescendants()) do
		if part:IsA("BasePart") then
			part.Transparency = 1
			part.CanCollide = false
		end
	end
end

RunService.RenderStepped:Connect(function()
	local doodle = getDoodle()
	if not doodle then return end

	hideCharacter()

	local cam = workspace.CurrentCamera
	if not cam then return end

	local pos = doodle.Position
	-- Vue 2D : caméra sur l'axe Z, regarde le plan X-Y (gauche/droite = X, haut/bas = Y)
	cam.CameraType = Enum.CameraType.Scriptable
	cam.CFrame = CFrame.new(pos.X, pos.Y, 30) * CFrame.Angles(0, math.pi, 0)
end)

-- Game Over
DoodleGameOver.OnClientEvent:Connect(function(finalScore)
	if gameOverGui then return end

	local gui = player:WaitForChild("PlayerGui")
	local screen = Instance.new("ScreenGui")
	screen.Name = "DoodleGameOver"
	screen.ResetOnSpawn = false
	screen.Parent = gui

	local frame = Instance.new("Frame")
	frame.Size = UDim2.new(0.6, 0, 0.35, 0)
	frame.Position = UDim2.new(0.2, 0, 0.32, 0)
	frame.BackgroundColor3 = Color3.fromRGB(40, 40, 50)
	frame.BorderSizePixel = 0
	frame.Parent = screen

	local label = Instance.new("TextLabel")
	label.Size = UDim2.new(1, 0, 0.5, 0)
	label.Position = UDim2.new(0, 0, 0.1, 0)
	label.BackgroundTransparency = 1
	label.Text = "GAME OVER"
	label.TextColor3 = Color3.fromRGB(255, 80, 80)
	label.TextScaled = true
	label.Font = Enum.Font.GothamBold
	label.Parent = frame

	local scoreLabel = Instance.new("TextLabel")
	scoreLabel.Size = UDim2.new(1, 0, 0.35, 0)
	scoreLabel.Position = UDim2.new(0, 0, 0.5, 0)
	scoreLabel.BackgroundTransparency = 1
	scoreLabel.Text = "Score : " .. tostring(finalScore)
	scoreLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
	scoreLabel.TextScaled = true
	scoreLabel.Font = Enum.Font.Gotham
	scoreLabel.Parent = frame

	gameOverGui = screen
	task.delay(2.5, function()
		if gameOverGui and gameOverGui.Parent then
			gameOverGui:Destroy()
			gameOverGui = nil
		end
	end)
end)

-- GUI Score (optionnel : le score est déjà dans leaderstats, on peut ajouter un label dédié)
local function createScoreGui()
	local gui = player:WaitForChild("PlayerGui")
	if gui:FindFirstChild("DoodleScoreGui") then return end

	local screen = Instance.new("ScreenGui")
	screen.Name = "DoodleScoreGui"
	screen.ResetOnSpawn = false
	screen.Parent = gui

	local label = Instance.new("TextLabel")
	label.Name = "ScoreLabel"
	label.Size = UDim2.new(0, 200, 0, 50)
	label.Position = UDim2.new(1, -220, 0, 10)
	label.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
	label.BackgroundTransparency = 0.5
	label.BorderSizePixel = 0
	label.Text = "Score : 0"
	label.TextColor3 = Color3.fromRGB(255, 255, 255)
	label.TextSize = 24
	label.Font = Enum.Font.GothamBold
	label.TextXAlignment = Enum.TextXAlignment.Right
	label.Parent = screen

	-- Mettre à jour depuis leaderstats
	local function updateScore()
		local ls = player:FindFirstChild("leaderstats")
		local scoreVal = ls and ls:FindFirstChild("Score")
		if scoreVal and label.Parent then
			label.Text = "Score : " .. tostring(scoreVal.Value)
		end
	end
	updateScore()
	RunService.Heartbeat:Connect(updateScore)
end

task.defer(createScoreGui)
