--[[
	MainClient - Script client principal
	LocalScript dans StarterPlayer.StarterPlayerScripts
	- Écoute le score et met à jour la GUI
	- Envoie la mort au serveur pour respawn au checkpoint
	- Optionnel : détection toucher pièce/checkpoint côté client (en plus du serveur)
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local player = Players.LocalPlayer
local Remotes = ReplicatedStorage:WaitForChild("Remotes")
local UpdateScore = Remotes:WaitForChild("UpdateScore")
local PlayerDied = Remotes:WaitForChild("PlayerDied")
local RequestData = Remotes:WaitForChild("RequestData")

-- Récupérer les données au spawn
local function onCharacterAdded(character)
	local humanoid = character:WaitForChild("Humanoid")
	humanoid.Died:Connect(function()
		PlayerDied:FireServer()
	end)
end

if player.Character then
	onCharacterAdded(player.Character)
end
player.CharacterAdded:Connect(onCharacterAdded)

local function updateGuiScore(coins)
	local gui = player:FindFirstChild("PlayerGui")
	if not gui then return end
	local screenGui = gui:FindFirstChild("MainGui")
	if screenGui then
		local scoreLabel = screenGui:FindFirstChild("ScoreLabel")
		if scoreLabel and scoreLabel:IsA("TextLabel") then
			scoreLabel.Text = "Pièces : " .. tostring(coins)
		end
	end
end

UpdateScore.OnClientEvent:Connect(updateGuiScore)

task.spawn(function()
	local data = RequestData:InvokeServer()
	if data and data.coins then
		updateGuiScore(data.coins)
	end
end)
