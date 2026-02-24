--[[
	CheckpointClient - Notifier le serveur quand on atteint un checkpoint
	LocalScript dans StarterPlayer.StarterPlayerScripts
	Optionnel si tu utilises CheckpointHandler (serveur) qui utilise SetCheckpoint.
	Tu peux garder ce script pour afficher un message "Checkpoint enregistré !" côté client.
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local player = Players.LocalPlayer
local Remotes = ReplicatedStorage:WaitForChild("Remotes")
local ReachedCheckpoint = Remotes:WaitForChild("ReachedCheckpoint")

player.CharacterAdded:Connect(function(character)
	character:WaitForChild("HumanoidRootPart")
	for _, obj in ipairs(workspace:GetDescendants()) do
		if obj:IsA("BasePart") and obj.Name == "Checkpoint" then
			obj.Touched:Connect(function(hit)
				if hit:IsDescendantOf(character) then
					ReachedCheckpoint:FireServer(obj)
					-- Optionnel : afficher "Checkpoint !" dans la GUI
				end
			end)
		end
	end
end)
