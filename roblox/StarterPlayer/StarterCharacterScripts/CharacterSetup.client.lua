--[[
	CharacterSetup - Appliqué au personnage du joueur
	LocalScript dans StarterPlayer.StarterCharacterScripts
	Vitesse, saut, etc. (optionnel, les valeurs par défaut Roblox vont bien)
]]

local character = script.Parent
local humanoid = character:WaitForChild("Humanoid")

-- Optionnel : personnaliser vitesse et saut
-- humanoid.WalkSpeed = 16
-- humanoid.JumpPower = 50
