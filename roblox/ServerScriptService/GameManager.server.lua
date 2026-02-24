--[[
	GameManager - Gestion principale du jeu (SERVEUR)
	Script dans ServerScriptService
	- Crée les RemoteEvents/RemoteFunctions
	- Gère les scores et les pièces
	- Gère le respawn et les checkpoints
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Créer le dossier pour les remotes s'il n'existe pas
local remotesFolder = ReplicatedStorage:FindFirstChild("Remotes")
if not remotesFolder then
	remotesFolder = Instance.new("Folder")
	remotesFolder.Name = "Remotes"
	remotesFolder.Parent = ReplicatedStorage
end

-- Créer les RemoteEvents
local function getOrCreateRemote(name, className)
	local r = remotesFolder:FindFirstChild(name)
	if not r then
		r = Instance.new(className)
		r.Name = name
		r.Parent = remotesFolder
	end
	return r
end

local CoinCollected = getOrCreateRemote("CoinCollected", "RemoteEvent")
local UpdateScore = getOrCreateRemote("UpdateScore", "RemoteEvent")
local PlayerDied = getOrCreateRemote("PlayerDied", "RemoteEvent")
local ReachedCheckpoint = getOrCreateRemote("ReachedCheckpoint", "RemoteEvent")
local RequestData = getOrCreateRemote("RequestData", "RemoteFunction")

-- Données par joueur (score, checkpoint, etc.)
local playerData = {}

local function getPlayerData(player)
	if not playerData[player.UserId] then
		playerData[player.UserId] = {
			coins = 0,
			checkpoint = nil,
			leaderstats = nil,
		}
	end
	return playerData[player.UserId]
end

-- Créer ou mettre à jour Leaderstats (affichés dans le jeu)
local function updateLeaderstats(player, coins)
	local data = getPlayerData(player)
	data.coins = coins
	if not data.leaderstats then
		local ls = Instance.new("Folder")
		ls.Name = "leaderstats"
		ls.Parent = player
		local coinValue = Instance.new("IntValue")
		coinValue.Name = "Coins"
		coinValue.Value = 0
		coinValue.Parent = ls
		data.leaderstats = coinValue
	end
	data.leaderstats.Value = coins
end

-- Quand un joueur rejoint
Players.PlayerAdded:Connect(function(player)
	getPlayerData(player)
	updateLeaderstats(player, 0)
end)

-- Quand un joueur quitte, on nettoie
Players.PlayerRemoving:Connect(function(player)
	playerData[player.UserId] = nil
end)

-- Pièce collectée (appelé par le script des pièces ou par le client)
CoinCollected.OnServerEvent:Connect(function(player)
	local data = getPlayerData(player)
	data.coins = data.coins + 10
	updateLeaderstats(player, data.coins)
	UpdateScore:FireClient(player, data.coins)
end)

-- Checkpoint atteint (appelé par le client OU par un autre script serveur via BindableEvent)
ReachedCheckpoint.OnServerEvent:Connect(function(player, checkpointPart)
	if type(checkpointPart) ~= "userdata" or not checkpointPart:IsA("BasePart") then return end
	local data = getPlayerData(player)
	data.checkpoint = checkpointPart
end)

local SetCheckpoint = Instance.new("BindableEvent")
SetCheckpoint.Name = "SetCheckpoint"
SetCheckpoint.Parent = remotesFolder
SetCheckpoint.Event:Connect(function(player, checkpointPart)
	if type(player) ~= "userdata" or not player:IsA("Player") then return end
	if type(checkpointPart) ~= "userdata" or not checkpointPart:IsA("BasePart") then return end
	local data = getPlayerData(player)
	data.checkpoint = checkpointPart
end)

-- Le client demande les données (score, checkpoint)
RequestData.OnServerInvoke = function(player)
	local data = getPlayerData(player)
	return {
		coins = data.coins,
		checkpoint = data.checkpoint,
	}
end

-- Optionnel : mort du joueur (pour respawn au checkpoint)
PlayerDied.OnServerEvent:Connect(function(player)
	-- Le respawn est géré par Roblox par défaut (spawn aux spawns)
	-- Tu peux ici téléporter au checkpoint si tu en as un
	local data = getPlayerData(player)
	if data.checkpoint and data.checkpoint:IsDescendantOf(workspace) then
		player.CharacterAdded:Wait()
		task.wait(0.1)
		local hrp = player.Character and player.Character:FindFirstChild("HumanoidRootPart")
		if hrp and data.checkpoint then
			hrp.CFrame = data.checkpoint.CFrame + Vector3.new(0, 3, 0)
		end
	end
end)

-- BindableEvent pour que d'autres scripts serveur donnent des pièces (anti-triche)
local AddCoinsToPlayer = Instance.new("BindableEvent")
AddCoinsToPlayer.Name = "AddCoinsToPlayer"
AddCoinsToPlayer.Parent = remotesFolder

AddCoinsToPlayer.Event:Connect(function(player, amount)
	if type(player) ~= "userdata" or not player:IsA("Player") then return end
	local data = getPlayerData(player)
	data.coins = data.coins + (amount or 10)
	updateLeaderstats(player, data.coins)
	UpdateScore:FireClient(player, data.coins)
end)

print("[GameManager] Serveur prêt.")
