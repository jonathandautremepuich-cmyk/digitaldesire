--[[
	WorldGenerator - Génère le monde au lancement (SERVEUR)
	Script dans ServerScriptService
	Crée automatiquement : pièces (Coin), checkpoint, et une petite plateforme.
	Si le dossier "MondeGenere" existe déjà, ne fait rien (pour ne pas dupliquer).
]]

local Workspace = game:GetService("Workspace")

local FOLDER_NAME = "MondeGenere"

if Workspace:FindFirstChild(FOLDER_NAME) then
	-- Le monde a déjà été généré (sauvegarde précédente)
	return
end

local folder = Instance.new("Folder")
folder.Name = FOLDER_NAME
folder.Parent = Workspace

-- Créer une Part (bloc) avec position et taille
local function createPart(name, position, size, color, material)
	local part = Instance.new("Part")
	part.Name = name
	part.Size = size
	part.Position = position
	part.Anchored = true
	part.CanCollide = true
	part.BrickColor = color
	part.Material = material or Enum.Material.Plastic
	part.Parent = folder
	return part
end

-- Positions (X, Y, Z) - Y = hauteur
local function pos(x, y, z)
	return Vector3.new(x, y, z)
end

-- ========== CHECKPOINT (une grosse Part verte) ==========
createPart(
	"Checkpoint",
	pos(30, 1.5, 0),
	Vector3.new(12, 3, 8),
	BrickColor.new("Lime green"),
	Enum.Material.Neon
)

-- ========== PIÈCES (plusieurs Coins dorés) ==========
local coinPositions = {
	pos(10, 2, 0),
	pos(15, 2, 5),
	pos(20, 2, -3),
	pos(25, 2, 2),
	pos(35, 2, 8),
	pos(40, 2, -5),
	pos(45, 2, 0),
}

for i, position in ipairs(coinPositions) do
	local coin = createPart(
		"Coin",
		position,
		Vector3.new(2, 2, 2),
		BrickColor.new("Bright yellow"),
		Enum.Material.Neon
	)
end

-- ========== Petite plateforme de départ (optionnel) ==========
local plateforme = createPart(
	"PlateformeDepart",
	pos(0, -1, 0),
	Vector3.new(20, 2, 20),
	BrickColor.new("Medium stone grey"),
	Enum.Material.Concrete
)

print("[WorldGenerator] Monde généré : pièces, checkpoint et plateforme créés.")
