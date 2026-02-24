--[[
	CoinCollectClient - Détection client des pièces (optionnel)
	LocalScript dans StarterPlayer.StarterPlayerScripts
	Envoie au serveur quand le joueur touche une pièce. Le serveur (CoinHandler)
	fait aussi la détection et donne la récompense, donc ce script est optionnel
	et peut servir pour des effets visuels/sons immédiats côté client.
]]

local Players = game:GetService("Players")

local player = Players.LocalPlayer

-- Optionnel : jouer un son ou effet quand on touche une pièce
local function onCoinTouched(coinPart, hitPart)
	local character = hitPart:FindFirstAncestorOfClass("Model")
	if not character or character ~= player.Character then return end
	if not character:FindFirstChild("Humanoid") then return end

	-- Le serveur donne déjà les pièces. Ici tu peux : jouer un son, particules, etc.
	-- Ne pas appeler CoinCollected:FireServer() pour éviter le double gain.
end

-- Écouter les pièces (pour effet client uniquement, le serveur fait la vraie récompense)
player.CharacterAdded:Connect(function(character)
	character:WaitForChild("HumanoidRootPart")
	for _, obj in ipairs(workspace:GetDescendants()) do
		if obj:IsA("BasePart") and obj.Name == "Coin" then
			obj.Touched:Connect(function(hit)
				if hit:IsDescendantOf(character) then
					onCoinTouched(obj, hit)
				end
			end)
		end
	end
end)
