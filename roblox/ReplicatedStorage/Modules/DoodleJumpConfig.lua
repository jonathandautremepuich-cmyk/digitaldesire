--[[
	DoodleJumpConfig - Paramètres du jeu type Doodle Jump
	ModuleScript dans ReplicatedStorage.Modules
]]

local DoodleJumpConfig = {}

-- Physique du doodle (personnage)
DoodleJumpConfig.Doodle = {
	JumpForce = 72,           -- Vitesse vers le haut au rebond
	MoveSpeed = 24,          -- Déplacement gauche/droite
	Gravity = 0.6,           -- Gravité personnalisée (si utilisée)
	Size = Vector3.new(2, 2, 2),  -- Taille de la boule
	WrapMinX = -18,          -- Bord gauche (réapparition à droite)
	WrapMaxX = 18,           -- Bord droit (réapparition à gauche)
}

-- Plateformes
DoodleJumpConfig.Platform = {
	Width = 6,
	Height = 1,
	Depth = 4,
	MinGapY = 4,            -- Écart vertical minimum entre plateformes
	MaxGapY = 10,           -- Écart vertical maximum
	MinGapX = -12,          -- Décalage X min par rapport à la précédente
	MaxGapX = 12,
	SpawnHeight = 80,       -- Hauteur au-dessus du joueur pour générer
	DespawnBelow = -30,     -- Supprimer les plateformes en dessous
	CountInitial = 40,      -- Nombre de plateformes au départ
	CountChunk = 25,        -- Plateformes ajoutées par chunk
}

-- Types de plateformes (couleurs / comportements)
DoodleJumpConfig.PlatformTypes = {
	Normal = { Color = Color3.fromRGB(80, 200, 80), MoveSpeed = 0 },
	Moving = { Color = Color3.fromRGB(80, 120, 255), MoveSpeed = 4, MoveRange = 8 },
	Breakable = { Color = Color3.fromRGB(180, 120, 60), BreakOnTouch = true },
}

-- Jeu
DoodleJumpConfig.Game = {
	StartY = 5,
	GameOverY = -50,        -- En dessous = game over
	RespawnY = 10,
}

return DoodleJumpConfig
