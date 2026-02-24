--[[
	GameConfig - Configuration centrale du jeu
	ModuleScript dans ReplicatedStorage.Modules
]]

local GameConfig = {}

-- Paramètres du joueur
GameConfig.Player = {
	WalkSpeed = 16,
	JumpPower = 50,
	MaxHealth = 100,
	RespawnTime = 3,
}

-- Paramètres des pièces (collectibles)
GameConfig.Coins = {
	Value = 10,
	RespawnTime = 30,
}

-- Paramètres des checkpoints
GameConfig.Checkpoint = {
	SaveCoins = true,
}

-- Clés des RemoteEvents/RemoteFunctions (doivent correspondre au serveur)
GameConfig.RemoteNames = {
	CoinCollected = "CoinCollected",
	UpdateScore = "UpdateScore",
	PlayerDied = "PlayerDied",
	ReachedCheckpoint = "ReachedCheckpoint",
	RequestData = "RequestData",
}

return GameConfig
