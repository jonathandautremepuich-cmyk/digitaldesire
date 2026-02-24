--[[
	DoodleJumpServer - Jeu type Doodle Jump (SERVEUR)
	- Génère les plateformes (normales, mobiles, cassables)
	- Crée le "doodle" (boule) par joueur et gère la physique
	- Rebond sur plateformes, déplacement gauche/droite, score (hauteur), game over
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local Config = require(ReplicatedStorage:WaitForChild("Modules"):WaitForChild("DoodleJumpConfig"))

-- Remotes
local Remotes = ReplicatedStorage:FindFirstChild("Remotes") or Instance.new("Folder")
Remotes.Name = "Remotes"
Remotes.Parent = ReplicatedStorage

local function getRemote(name, className)
	local r = Remotes:FindFirstChild(name)
	if not r then
		r = Instance.new(className)
		r.Name = name
		r.Parent = Remotes
	end
	return r
end

local DoodleMove = getRemote("DoodleMove", "RemoteEvent")
local DoodleGameOver = getRemote("DoodleGameOver", "RemoteEvent")

-- Dossier des plateformes
local platformsFolder = workspace:FindFirstChild("DoodlePlatforms")
if not platformsFolder then
	platformsFolder = Instance.new("Folder")
	platformsFolder.Name = "DoodlePlatforms"
	platformsFolder.Parent = workspace
end

-- Données par joueur: { doodle = Part, velocity = Vector3, moveX = number, score = number, leaderstat = IntValue }
local playerData = {}

-- Plateformes mobiles: { part = Part, speed = number, range = number, baseX = number, direction = number }
local movingPlatforms = {}

local function createPlatform(x, y, platformTypeName)
	local t = Config.PlatformTypes[platformTypeName] or Config.PlatformTypes.Normal
	local p = Instance.new("Part")
	p.Name = "Platform"
	p.Size = Vector3.new(Config.Platform.Width, Config.Platform.Height, Config.Platform.Depth)
	p.Position = Vector3.new(x, y, 0)
	p.Anchored = true
	p.CanCollide = true
	p.Color = t.Color
	p.Material = Enum.Material.SmoothPlastic
	if t.BreakOnTouch then
		p:SetAttribute("Breakable", true)
	end
	p.Parent = platformsFolder

	local info = {
		part = p,
		typeName = platformTypeName,
	}
	if t.MoveSpeed and t.MoveSpeed ~= 0 then
		info.speed = t.MoveSpeed
		info.range = t.MoveRange or 8
		info.baseX = x
		info.direction = 1
		table.insert(movingPlatforms, info)
	end
	if t.BreakOnTouch then
		info.breakable = true
	end
	return info
end

local function generatePlatformChunk(startY, count, lastXIn)
	local lastX = lastXIn or 0
	local platforms = {}
	for i = 1, count do
		local gapY = math.random(Config.Platform.MinGapY, Config.Platform.MaxGapY)
		local gapX = math.random(Config.Platform.MinGapX * 100, Config.Platform.MaxGapX * 100) / 100
		local y = startY + gapY
		local x = math.clamp(lastX + gapX, Config.Doodle.WrapMinX + 2, Config.Doodle.WrapMaxX - 2)
		lastX = x
		local roll = math.random(1, 100)
		local ptype = "Normal"
		if roll <= 25 then
			ptype = "Moving"
		elseif roll <= 45 then
			ptype = "Breakable"
		end
		table.insert(platforms, createPlatform(x, y, ptype))
		startY = y
	end
	return startY, lastX
end

-- Génération initiale
local nextSpawnY, lastPlatformX = 0, 0
nextSpawnY, lastPlatformX = generatePlatformChunk(Config.Game.StartY, Config.Platform.CountInitial)

local function ensureLeaderstats(player)
	local ls = player:FindFirstChild("leaderstats")
	if not ls then
		ls = Instance.new("Folder")
		ls.Name = "leaderstats"
		ls.Parent = player
		local scoreVal = Instance.new("IntValue")
		scoreVal.Name = "Score"
		scoreVal.Value = 0
		scoreVal.Parent = ls
	end
	return ls:FindFirstChild("Score")
end

local function createDoodle(player)
	local data = playerData[player.UserId]
	if data and data.doodle and data.doodle.Parent then
		return data.doodle
	end

	local model = Instance.new("Model")
	model.Name = "Doodle_" .. player.UserId

	local part = Instance.new("Part")
	part.Name = "DoodlePart"
	part.Shape = Enum.PartType.Ball
	part.Size = Config.Doodle.Size
	part.Position = Vector3.new(0, Config.Game.RespawnY, 0)
	part.Anchored = false
	part.CanCollide = true
	part.Color = Color3.fromRGB(255, 200, 50)
	part.Material = Enum.Material.SmoothPlastic
	part.CustomPhysicalProperties = PhysicalProperties.new(0.3, 0, 0.5, 1, 1)
	part.Parent = model

	model.PrimaryPart = part
	model.Parent = workspace

	if not playerData[player.UserId] then
		playerData[player.UserId] = {}
	end
	playerData[player.UserId].doodle = part
	playerData[player.UserId].velocity = Vector3.new(0, 0, 0)
	playerData[player.UserId].moveX = 0
	playerData[player.UserId].score = 0
	playerData[player.UserId].leaderstat = ensureLeaderstats(player)

	return part
end

local function respawnDoodle(player)
	local data = playerData[player.UserId]
	if not data or not data.doodle then return end
	data.doodle.Position = Vector3.new(0, Config.Game.RespawnY, 0)
	data.velocity = Vector3.new(0, 0, 0)
	data.moveX = 0
	-- On garde le meilleur score dans leaderstats, on ne le remet pas à 0
end

-- Rebond : le doodle doit être au-dessus du haut de la plateforme et tomber, et aligné en X
local function tryBounce(doodle, platformPart, velocity, data)
	local doodleBottom = doodle.Position.Y - doodle.Size.Y / 2
	local platformTop = platformPart.Position.Y + platformPart.Size.Y / 2
	local dx = math.abs(doodle.Position.X - platformPart.Position.X)
	local halfW = platformPart.Size.X / 2 + doodle.Size.X / 2
	if velocity.Y > 0 then return velocity end -- déjà en montée
	if dx > halfW then return velocity end -- pas au-dessus de la plateforme
	if doodleBottom > platformTop - 1.5 and doodleBottom < platformTop + 2 then
		if platformPart:GetAttribute("Breakable") then
			task.delay(0.15, function()
				if platformPart.Parent then
					platformPart.Transparency = 1
					platformPart.CanCollide = false
					task.delay(2, function()
						platformPart:Destroy()
					end)
				end
			end)
		end
		return Vector3.new(velocity.X, Config.Doodle.JumpForce, velocity.Z)
	end
	return velocity
end

-- Touched sur le doodle pour détecter les plateformes
local function setupDoodleTouched(doodle, player)
	local data = playerData[player.UserId]
	if not data then return end
	doodle.Touched:Connect(function(hit)
		if not hit:IsDescendantOf(platformsFolder) then return end
		if hit.Name ~= "Platform" then return end
		data.velocity = tryBounce(doodle, hit, data.velocity, data)
	end)
end

DoodleMove.OnServerEvent:Connect(function(player, moveX)
	local data = playerData[player.UserId]
	if data then
		data.moveX = type(moveX) == "number" and math.clamp(moveX, -1, 1) or 0
	end
end)

-- Mise à jour physique et plateformes
local highestYNeeded = nextSpawnY
RunService.Heartbeat:Connect(function(dt)
	-- Plateformes mobiles
	for i = #movingPlatforms, 1, -1 do
		local m = movingPlatforms[i]
		if not m.part or not m.part.Parent then
			table.remove(movingPlatforms, i)
		else
			local pos = m.part.Position
			local newX = pos.X + m.speed * m.direction * dt * 60
			if newX >= m.baseX + m.range then
				newX = m.baseX + m.range
				m.direction = -1
			elseif newX <= m.baseX - m.range then
				newX = m.baseX - m.range
				m.direction = 1
			end
			m.part.Position = Vector3.new(newX, pos.Y, pos.Z)
		end
	end

	for _, player in ipairs(Players:GetPlayers()) do
		local data = playerData[player.UserId]
		if not data or not data.doodle or not data.doodle.Parent then continue end

		local doodle = data.doodle
		local vel = data.velocity

		-- Gravité
		vel = vel + Vector3.new(0, -Config.Doodle.Gravity * 60 * dt, 0)
		vel = Vector3.new(data.moveX * Config.Doodle.MoveSpeed, vel.Y, 0)

		-- Vérifier les plateformes en contact pour rebond
		for _, platform in ipairs(platformsFolder:GetChildren()) do
			if not platform:IsA("BasePart") or not platform.CanCollide then continue end
			local dist = (doodle.Position - platform.Position).Magnitude
			if dist < 10 then
				vel = tryBounce(doodle, platform, vel, data)
			end
		end

		data.velocity = vel
		doodle.AssemblyLinearVelocity = vel

		-- World wrap
		local pos = doodle.Position
		local newX = pos.X
		if newX < Config.Doodle.WrapMinX then newX = Config.Doodle.WrapMaxX end
		if newX > Config.Doodle.WrapMaxX then newX = Config.Doodle.WrapMinX end
		if newX ~= pos.X then
			doodle.Position = Vector3.new(newX, pos.Y, pos.Z)
		end

		-- Score = hauteur max
		local y = doodle.Position.Y
		if y > data.score then
			data.score = math.floor(y)
			if data.leaderstat then
				data.leaderstat.Value = data.score
			end
		end
		if y > highestYNeeded then
			highestYNeeded = y
		end

		-- Game over
		if y < Config.Game.GameOverY then
			DoodleGameOver:FireClient(player, data.score)
			respawnDoodle(player)
		end
	end

	-- Générer de nouvelles plateformes au-dessus
	if highestYNeeded > nextSpawnY - Config.Platform.SpawnHeight then
		nextSpawnY, lastPlatformX = generatePlatformChunk(nextSpawnY, Config.Platform.CountChunk, lastPlatformX)
	end

	-- Supprimer les plateformes trop en bas
	local lowestY = math.huge
	for _, p in ipairs(Players:GetPlayers()) do
		local d = playerData[p.UserId]
		if d and d.doodle and d.doodle.Parent then
			lowestY = math.min(lowestY, d.doodle.Position.Y)
		end
	end
	if lowestY ~= math.huge then
		for _, platform in ipairs(platformsFolder:GetChildren()) do
			if platform:IsA("BasePart") and platform.Position.Y < lowestY + Config.Platform.DespawnBelow then
				platform:Destroy()
			end
		end
	end
end)

-- Quand un joueur rejoint : créer son Doodle après un court délai
Players.PlayerAdded:Connect(function(player)
	task.defer(function()
		task.wait(0.5)
		local doodle = createDoodle(player)
		setupDoodleTouched(doodle, player)
	end)
end)

-- Joueurs déjà présents au chargement du script
for _, p in ipairs(Players:GetPlayers()) do
	task.defer(function()
		task.wait(0.5)
		local doodle = createDoodle(p)
		setupDoodleTouched(doodle, p)
	end)
end

print("[DoodleJumpServer] Doodle Jump prêt.")
