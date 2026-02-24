--[[
	CreateMainGui - Crée l'interface principale (score, etc.)
	LocalScript dans StarterGui
	Crée un ScreenGui "MainGui" avec un TextLabel "ScoreLabel" pour les pièces.
]]

local Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Éviter de dupliquer si le script tourne plusieurs fois
if playerGui:FindFirstChild("MainGui") then
	return
end

local screenGui = Instance.new("ScreenGui")
screenGui.Name = "MainGui"
screenGui.ResetOnSpawn = false
screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
screenGui.Parent = playerGui

local scoreLabel = Instance.new("TextLabel")
scoreLabel.Name = "ScoreLabel"
scoreLabel.Size = UDim2.new(0, 200, 0, 40)
scoreLabel.Position = UDim2.new(0, 20, 0, 20)
scoreLabel.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
scoreLabel.BorderSizePixel = 0
scoreLabel.Text = "Pièces : 0"
scoreLabel.TextColor3 = Color3.new(1, 1, 1)
scoreLabel.TextSize = 24
scoreLabel.Font = Enum.Font.GothamBold
scoreLabel.TextXAlignment = Enum.TextXAlignment.Left
scoreLabel.Parent = screenGui

-- Coins arrondis (optionnel)
local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 8)
corner.Parent = scoreLabel

local padding = Instance.new("UIPadding")
padding.PaddingLeft = UDim.new(0, 12)
padding.PaddingRight = UDim.new(0, 12)
padding.Parent = scoreLabel
