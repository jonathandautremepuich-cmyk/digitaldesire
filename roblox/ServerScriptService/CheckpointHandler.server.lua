--[[
	CheckpointHandler - Enregistrement des checkpoints (SERVEUR)
	Script dans ServerScriptService
	Les checkpoints sont des Parts dans Workspace avec le nom "Checkpoint".
	Quand un joueur touche un checkpoint, sa position est sauvegardée pour le respawn.
]]

local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Remotes = ReplicatedStorage:WaitForChild("Remotes")
local SetCheckpoint = Remotes:WaitForChild("SetCheckpoint")

local function onCheckpointTouched(part, hit)
	local character = hit:FindFirstAncestorOfClass("Model")
	if not character then return end
	local player = game:GetService("Players"):GetPlayerFromCharacter(character)
	if not player or not character:FindFirstChild("Humanoid") then return end

	SetCheckpoint:Fire(player, part)
end

-- Connecter tous les checkpoints
local function setupCheckpoint(part)
	if not part:IsA("BasePart") then return end
	part.Touched:Connect(function(hit)
		onCheckpointTouched(part, hit)
	end)
end

for _, obj in ipairs(workspace:GetDescendants()) do
	if obj:IsA("BasePart") and obj.Name == "Checkpoint" then
		setupCheckpoint(obj)
	end
end

workspace.DescendantAdded:Connect(function(obj)
	if obj:IsA("BasePart") and obj.Name == "Checkpoint" then
		setupCheckpoint(obj)
	end
end)

print("[CheckpointHandler] Checkpoints activés.")
