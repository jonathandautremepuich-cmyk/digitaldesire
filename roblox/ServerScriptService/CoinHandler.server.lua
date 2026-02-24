--[[
	CoinHandler - Gestion des pièces collectibles (SERVEUR)
	Script dans ServerScriptService
	À placer dans ServerScriptService. Les pièces dans le jeu doivent
	être des Parts nommées "Coin" avec un Touched qui appelle le remote.
	Ce script peut aussi créer des pièces automatiquement si tu as un dossier
	Workspace.Coins avec des Parts.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Remotes = ReplicatedStorage:WaitForChild("Remotes")
-- Attendre que GameManager ait créé AddCoinsToPlayer
Remotes:WaitForChild("AddCoinsToPlayer")

local COIN_RESPAWN_TIME = 30

local function onCoinTouched(coinPart, hitPart)
	local character = hitPart:FindFirstAncestorOfClass("Model")
	if not character then return end
	local player = game:GetService("Players"):GetPlayerFromCharacter(character)
	if not player or not character:FindFirstChild("Humanoid") then return end

	-- Désactiver la pièce (invisible + no collision)
	local coin = coinPart:IsA("Model") and coinPart or coinPart.Parent
	if coin and coin:IsA("Model") then
		for _, c in ipairs(coin:GetDescendants()) do
			if c:IsA("BasePart") then
				c.Transparency = 1
				c.CanCollide = false
			end
		end
	else
		coinPart.Transparency = 1
		coinPart.CanCollide = false
	end

	-- Donner les pièces via le GameManager (côté serveur, anti-triche)
	local Remotes = ReplicatedStorage:FindFirstChild("Remotes")
	local AddCoins = Remotes and Remotes:FindFirstChild("AddCoinsToPlayer")
	if AddCoins and AddCoins:IsA("BindableEvent") then
		AddCoins:Fire(player, 10)
	end
end

-- Connexion aux pièces existantes dans Workspace
local function setupCoin(coinPart)
	if not coinPart:IsA("BasePart") then return end
	local conn
	conn = coinPart.Touched:Connect(function(hit)
		onCoinTouched(coinPart, hit)
		if conn then conn:Disconnect() end
		-- Respawn après X secondes
		task.delay(COIN_RESPAWN_TIME, function()
			if coinPart and coinPart.Parent then
				coinPart.Transparency = 0
				coinPart.CanCollide = true
				setupCoin(coinPart)
			end
		end)
	end)
end

-- Si tu as un dossier Workspace.Coins
local coinsFolder = workspace:FindFirstChild("Coins")
if coinsFolder then
	for _, obj in ipairs(coinsFolder:GetDescendants()) do
		if obj:IsA("BasePart") and (obj.Name == "Coin" or obj.Parent and obj.Parent.Name == "Coin") then
			setupCoin(obj)
		end
	end
	coinsFolder.DescendantAdded:Connect(function(obj)
		if obj:IsA("BasePart") and obj.Name == "Coin" then
			setupCoin(obj)
		end
	end)
end

-- Pièces dans Workspace (y compris celles créées plus tard par WorldGenerator)
for _, obj in ipairs(workspace:GetDescendants()) do
	if obj:IsA("BasePart") and obj.Name == "Coin" then
		setupCoin(obj)
	end
end
workspace.DescendantAdded:Connect(function(obj)
	if obj:IsA("BasePart") and obj.Name == "Coin" then
		setupCoin(obj)
	end
end)

print("[CoinHandler] Gestion des pièces activée.")
