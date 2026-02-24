--[[
  STEAL A BRAINROT - Design complet
  Lobby + bases avec Core, Spawner, Vault. Brainrots: ID, rareté, poids, traits.
  Capture [E] / Dépôt Vault / Vol + StolenState 45s + Chase + Safe Zone.
  Upgrades Spawner/Vault, New player shield 10min, Raid limit, Panic 30s.
  Coller dans ServerScriptService (Script unique).
]]
print("[SAB] Demarrage...")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Workspace = game:GetService("Workspace")
local RunService = game:GetService("RunService")

-- ========== REMOTES ==========
local rf = ReplicatedStorage:FindFirstChild("Remotes") or (function() local f = Instance.new("Folder"); f.Name = "Remotes"; f.Parent = ReplicatedStorage; return f end)()
local function R(n,c) local r = rf:FindFirstChild(n); if not r then r = Instance.new(c); r.Name = n; r.Parent = rf end return r end
local UpdateUI = R("UpdateUI", "RemoteEvent")
local RequestData = R("RequestData", "RemoteFunction")
local EventLog = R("EventLog", "RemoteEvent")
local GrabBrainrot = R("GrabBrainrot", "RemoteEvent")
local DepositBrainrot = R("DepositBrainrot", "RemoteEvent")
local UpgradeSpawner = R("UpgradeSpawner", "RemoteEvent")
local UpgradeVault = R("UpgradeVault", "RemoteEvent")
local PanicButton = R("PanicButton", "RemoteEvent")
local RequestLeaderboard = R("RequestLeaderboard", "RemoteFunction")

-- ========== CONFIG ==========
local RARITIES = {
	{ name = "Common",   income = 2,   value = 50,  weight = 1, color = BrickColor.new("Bright green"),  dropChance = 70  },
	{ name = "Rare",     income = 6,   value = 200, weight = 2, color = BrickColor.new("Bright blue"),   dropChance = 20  },
	{ name = "Epic",     income = 15,  value = 800, weight = 3, color = BrickColor.new("Royal purple"), dropChance = 8   },
	{ name = "Legendary",income = 45,  value = 4000,weight = 4, color = BrickColor.new("Bright yellow"), dropChance = 1.8 },
	{ name = "Mythic",   income = 120, value = 20000,weight=5, color = BrickColor.new("Hot pink"),     dropChance = 0.2 },
}
local TRAITS = {
	{ name = "None",    incomeMult = 1   },
	{ name = "VIP",     incomeMult = 2   },
	{ name = "Squeaky", incomeMult = 1   },
	{ name = "Slippery",incomeMult = 1   },
	{ name = "Cursed",  incomeMult = 1   },
}
local START_COINS = 200
local START_VAULT_CAP = 6
local START_SPAWNER_LEVEL = 1
local SPAWNER_COOLDOWN_BASE = 12
local SPAWNER_QUEUE_CAP = 3
local STOLEN_STATE_DURATION = 45
local CHASE_DROP_RETURN_TIME = 5
local THIEF_MALUS_DURATION = 10
local SAFE_ZONE_RADIUS = 18
local NEW_PLAYER_SHIELD_MINUTES = 10
local RAID_LIMIT_COUNT = 3
local RAID_LIMIT_WINDOW = 300
local PANIC_DURATION = 30
local INCOME_INTERVAL = 1
local BASE_WALKSPEED = 16
local WEIGHT_SPEED_PENALTY = 2

-- ========== DONNEES ==========
local playerData = {}
local nextBaseId = 1
local nextBrainrotId = 1
local mapFolder
local bases = {}
local brainrotIdToData = {}

local function getData(plr)
	if not playerData[plr.UserId] then
		local baseId = nextBaseId
		nextBaseId = (nextBaseId % 8) + 1
		playerData[plr.UserId] = {
			coins = START_COINS,
			gems = 0,
			vault = {},
			spawnerLevel = START_SPAWNER_LEVEL,
			vaultCap = START_VAULT_CAP,
			baseId = baseId,
			carriedId = nil,
			panicEnd = 0,
			newPlayerShieldEnd = os.clock() + NEW_PLAYER_SHIELD_MINUTES * 60,
			lastRaids = {},
			thiefMalusEnd = 0,
			spawnerQueue = {},
			spawnerNextAt = 0,
		}
	end
	return playerData[plr.UserId]
end

local function getCoinsPerSec(plr)
	local d = getData(plr)
	local total = 0
	for _, b in ipairs(d.vault) do
		if b.stolenStateEnd and os.clock() < b.stolenStateEnd then continue end
		local r = RARITIES[b.rarityId]
		local tr = TRAITS[b.traitId or 1]
		if r and tr then total = total + r.income * (tr.incomeMult or 1) end
	end
	return total
end

local function sendUI(plr)
	local d = getData(plr)
	UpdateUI:FireClient(plr, d.coins, d.gems, getCoinsPerSec(plr), #d.vault, d.vaultCap, d.spawnerLevel, d.panicEnd > os.clock(), math.max(0, d.panicEnd - os.clock()), d.carriedId ~= nil)
end

local function logEvent(plr, msg) EventLog:FireClient(plr, msg) end

RequestData.OnServerInvoke = function(plr)
	local d = getData(plr)
	return {
		coins = d.coins, gems = d.gems, coinsPerSec = getCoinsPerSec(plr),
		vaultCount = #d.vault, vaultCap = d.vaultCap, spawnerLevel = d.spawnerLevel,
		panic = d.panicEnd > os.clock(), panicRemain = math.max(0, d.panicEnd - os.clock()),
		carried = d.carriedId ~= nil, vault = d.vault, baseId = d.baseId,
	}
end

RequestLeaderboard.OnServerInvoke = function(plr)
	local list = {}
	for _, p in ipairs(Players:GetPlayers()) do
		local d = getData(p)
		table.insert(list, { name = p.Name, coins = d.coins, income = getCoinsPerSec(p), vault = #d.vault })
	end
	table.sort(list, function(a,b) return a.coins > b.coins end)
	local out = {} for i = 1, math.min(15, #list) do out[i] = list[i] end
	return out
end

-- ========== CREATION BRAINROT (styles varies: blob, pingouin, baton, flamme) ==========
local function addEyes(model, headPos, anchored)
	local le = Instance.new("Part"); le.Shape = Enum.PartType.Ball; le.Size = Vector3.new(0.28, 0.28, 0.28)
	le.Position = headPos + Vector3.new(-0.28, 0.12, 0.75); le.BrickColor = BrickColor.new("Really black"); le.Anchored = anchored; le.CanCollide = false; le.Parent = model
	local re = Instance.new("Part"); re.Shape = Enum.PartType.Ball; re.Size = Vector3.new(0.28, 0.28, 0.28)
	re.Position = headPos + Vector3.new(0.28, 0.12, 0.75); re.BrickColor = BrickColor.new("Really black"); re.Anchored = anchored; re.CanCollide = false; re.Parent = model
end
local function createBrainrotModel(parent, position, rarityId, traitId, anchored)
	local r = RARITIES[rarityId or 1]
	local model = Instance.new("Model"); model.Name = "Brainrot"; model.Parent = parent
	local style = math.random(1, 4)
	local primary
	if style == 1 then
		local head = Instance.new("Part"); head.Name = "Head"; head.Shape = Enum.PartType.Ball
		head.Size = Vector3.new(2, 2, 2); head.Position = position + Vector3.new(0, 1.2, 0)
		head.BrickColor = r.color; head.Material = Enum.Material.Neon; head.Anchored = anchored; head.CanCollide = true; head.Parent = model
		local body = Instance.new("Part"); body.Name = "Body"; body.Size = Vector3.new(1.4, 1, 0.8)
		body.Position = position + Vector3.new(0, 0.5, 0); body.BrickColor = r.color; body.Material = Enum.Material.Neon; body.Anchored = anchored; body.CanCollide = true; body.Parent = model
		addEyes(model, head.Position, anchored); primary = head
	elseif style == 2 then
		local blob = Instance.new("Part"); blob.Name = "Blob"; blob.Shape = Enum.PartType.Ball
		blob.Size = Vector3.new(2.2, 2.2, 2.2); blob.Position = position + Vector3.new(0, 1.1, 0)
		blob.BrickColor = r.color; blob.Material = Enum.Material.Neon; blob.Anchored = anchored; blob.CanCollide = true; blob.Parent = model
		addEyes(model, blob.Position, anchored); primary = blob
	elseif style == 3 then
		local body = Instance.new("Part"); body.Name = "Body"; body.Shape = Enum.PartType.Ball
		body.Size = Vector3.new(1.4, 1.4, 1.4); body.Position = position + Vector3.new(0, 0.9, 0)
		body.BrickColor = BrickColor.new("Really black"); body.Material = Enum.Material.SmoothPlastic; body.Anchored = anchored; body.CanCollide = true; body.Parent = model
		local belly = Instance.new("Part"); belly.Shape = Enum.PartType.Ball; belly.Size = Vector3.new(1, 0.9, 1)
		belly.Position = body.Position + Vector3.new(0, 0, 0.5); belly.BrickColor = BrickColor.new("White"); belly.Anchored = anchored; belly.CanCollide = false; belly.Parent = model
		local head = Instance.new("Part"); head.Name = "Head"; head.Shape = Enum.PartType.Ball
		head.Size = Vector3.new(0.9, 0.9, 0.9); head.Position = body.Position + Vector3.new(0, 0.8, 0); head.BrickColor = r.color; head.Material = Enum.Material.Neon; head.Anchored = anchored; head.CanCollide = true; head.Parent = model
		addEyes(model, head.Position, anchored); primary = head
	else
		local base = Instance.new("Part"); base.Name = "Base"; base.Size = Vector3.new(0.4, 0.5, 0.4)
		base.Position = position + Vector3.new(0, 0.25, 0); base.BrickColor = r.color; base.Material = Enum.Material.Neon; base.Anchored = anchored; base.CanCollide = true; base.Parent = model
		local mid = Instance.new("Part"); mid.Size = Vector3.new(0.35, 0.8, 0.35); mid.Position = position + Vector3.new(0, 0.9, 0); mid.BrickColor = r.color; mid.Material = Enum.Material.Neon; mid.Anchored = anchored; mid.CanCollide = true; mid.Parent = model
		local head = Instance.new("Part"); head.Name = "Head"; head.Shape = Enum.PartType.Ball; head.Size = Vector3.new(0.7, 0.7, 0.7)
		head.Position = position + Vector3.new(0, 1.5, 0); head.BrickColor = r.color; head.Material = Enum.Material.Neon; head.Anchored = anchored; head.CanCollide = true; head.Parent = model
		addEyes(model, head.Position, anchored); primary = head
	end
	model.PrimaryPart = primary
	model:SetAttribute("RarityId", rarityId or 1)
	model:SetAttribute("TraitId", traitId or 1)
	return model
end

-- ========== SPAWNER (drop rates) ==========
local function rollRarity()
	local roll = math.random() * 100
	local acc = 0
	for i, r in ipairs(RARITIES) do
		acc = acc + r.dropChance
		if roll <= acc then return i end
	end
	return 1
end

local function spawnerTick(plr)
	local d = getData(plr)
	local now = os.clock()
	if now < d.spawnerNextAt then return end
	local baseInfo = bases[d.baseId]
	if not baseInfo or not baseInfo.spawner or not baseInfo.spawnerPoint then return end
	local cooldown = math.max(4, SPAWNER_COOLDOWN_BASE - d.spawnerLevel * 1.2)
	d.spawnerNextAt = now + cooldown
	if #d.spawnerQueue >= SPAWNER_QUEUE_CAP then return end
	local rarityId = rollRarity()
	local traitId = math.random(1, #TRAITS)
	local r = RARITIES[rarityId]
	local pos = baseInfo.spawnerPoint.Position
	local model = createBrainrotModel(baseInfo.model, pos, rarityId, traitId, false)
	local id = nextBrainrotId nextBrainrotId = nextBrainrotId + 1
	model:SetAttribute("UniqueId", id)
	brainrotIdToData[id] = {
		id = id, rarityId = rarityId, traitId = traitId, income = r.income, weight = r.weight,
		model = model, ownerId = plr.UserId, inVault = false, stolenStateEnd = nil,
	}
	table.insert(d.spawnerQueue, id)
	model.Parent = baseInfo.model
	task.delay(0.1, function()
		if model and model.Parent then
			local prompt = Instance.new("ProximityPrompt")
			prompt.ActionText = "Saisir [E]"; prompt.ObjectText = r.name; prompt.KeyboardKeyCode = Enum.KeyCode.E
			prompt.MaxActivationDistance = 8; prompt.HoldDuration = 0; prompt.Parent = model.PrimaryPart
			prompt.Triggered:Connect(function(who)
				if who ~= plr then return end
				local dd = getData(who)
				if dd.carriedId then return end
				for i, qid in ipairs(dd.spawnerQueue) do
					if qid == id then table.remove(dd.spawnerQueue, i); break end
				end
				dd.carriedId = id
				brainrotIdToData[id].model.Parent = who.Character
				if who.Character and who.Character:FindFirstChild("HumanoidRootPart") then
					brainrotIdToData[id].model:SetPrimaryPartCFrame(who.Character.HumanoidRootPart.CFrame + Vector3.new(0, 2, 0))
				end
				local hum = who.Character and who.Character:FindFirstChild("Humanoid")
				if hum then hum.WalkSpeed = math.max(6, BASE_WALKSPEED - r.weight * WEIGHT_SPEED_PENALTY) end
				sendUI(who)
			end)
		end
	end)
end

-- ========== DEPOT VAULT ==========
local function isInVaultZone(plr, baseId)
	local baseInfo = bases[baseId]
	if not baseInfo or not baseInfo.vaultZone then return false end
	local char = plr.Character
	if not char or not char:FindFirstChild("HumanoidRootPart") then return false end
	local pos = char.HumanoidRootPart.Position
	local vz = baseInfo.vaultZone
	local r = vz.Size.Magnitude / 2
	return (vz.Position - pos).Magnitude <= r
end

DepositBrainrot.OnServerEvent:Connect(function(plr)
	local d = getData(plr)
	if not d.carriedId then return end
	if #d.vault >= d.vaultCap then logEvent(plr, "Vault pleine!"); return end
	if not isInVaultZone(plr, d.baseId) then return end
	local bdata = brainrotIdToData[d.carriedId]
	if not bdata or not bdata.model then return end
	bdata.model.Parent = nil
	bdata.model:Destroy()
	bdata.model = nil
	bdata.inVault = true
	bdata.ownerId = plr.UserId
	local stolenEnd = bdata.stolenStateEnd
	bdata.stolenStateEnd = nil
	table.insert(d.vault, { id = d.carriedId, rarityId = bdata.rarityId, traitId = bdata.traitId, income = bdata.income, weight = bdata.weight, stolenStateEnd = stolenEnd })
	d.carriedId = nil
	local hum = plr.Character and plr.Character:FindFirstChild("Humanoid")
	if hum then hum.WalkSpeed = BASE_WALKSPEED end
	logEvent(plr, "BRAAAINROT ACQUIRED!")
	sendUI(plr)
end)

-- ========== GRAB (depuis spawner deja dans spawnerTick) - Grab depuis Vault = VOL ==========
local function tryStealFromBase(plr, targetBaseId)
	local d = getData(plr)
	if d.carriedId then return end
	if d.thiefMalusEnd > os.clock() then logEvent(plr, "Malus voleur actif..."); return end
	local targetPlr = nil
	for _, p in ipairs(Players:GetPlayers()) do if getData(p).baseId == targetBaseId then targetPlr = p; break end end
	if not targetPlr or targetPlr == plr then return end
	local td = getData(targetPlr)
	if #td.vault == 0 then logEvent(plr, "Vault vide!"); return end
	if td.panicEnd > os.clock() then return end
	if (td.newPlayerShieldEnd or 0) > os.clock() then logEvent(plr, "Base protegee (nouveau joueur)"); return end
	local baseInfo = bases[targetBaseId]
	if not baseInfo then return end
	local safeCenter = (baseInfo.spawnPoint and baseInfo.spawnPoint.Position) or baseInfo.floor.Position + Vector3.new(0, 0, -10)
	local char = plr.Character
	if not char or not char:FindFirstChild("HumanoidRootPart") then return end
	if (char.HumanoidRootPart.Position - safeCenter).Magnitude < SAFE_ZONE_RADIUS then logEvent(plr, "Zone safe: pas de vol!"); return end
	local raidKey = targetPlr.UserId
	local now = os.clock()
	if td.lastRaids[raidKey] then
		local r = td.lastRaids[raidKey]
		if now < r.resetTime and r.count >= RAID_LIMIT_COUNT then logEvent(plr, "Limite de raid atteinte"); return end
		if now >= r.resetTime then td.lastRaids[raidKey] = nil end
	end
	local entry = table.remove(td.vault, 1)
	if not entry then return end
	local id = entry.id
	local bdata = brainrotIdToData[id]
	if not bdata then return end
	bdata.ownerId = plr.UserId
	bdata.stolenStateEnd = os.clock() + STOLEN_STATE_DURATION
	bdata.inVault = false
	local r = RARITIES[bdata.rarityId]
	local pos = baseInfo.model:GetPivot().Position + Vector3.new(0, 2, 0)
	bdata.model = createBrainrotModel(baseInfo.model, pos, bdata.rarityId, bdata.traitId, false)
	bdata.model:SetAttribute("UniqueId", id)
	bdata.model:SetAttribute("Stolen", 1)
	bdata.model.Parent = plr.Character
	if plr.Character and plr.Character:FindFirstChild("HumanoidRootPart") then
		bdata.model:SetPrimaryPartCFrame(plr.Character.HumanoidRootPart.CFrame + Vector3.new(0, 2, 0))
	end
	local hum = plr.Character and plr.Character:FindFirstChild("Humanoid")
	if hum then hum.WalkSpeed = math.max(6, BASE_WALKSPEED - (r.weight or 1) * WEIGHT_SPEED_PENALTY) end
	d.carriedId = id
	td.lastRaids[raidKey] = td.lastRaids[raidKey] or { count = 0, resetTime = now + RAID_LIMIT_WINDOW }
	td.lastRaids[raidKey].count = td.lastRaids[raidKey].count + 1
	td.lastRaids[raidKey].resetTime = now + RAID_LIMIT_WINDOW
	logEvent(plr, "Tu as vole un " .. (r.name or "Brainrot") .. " a " .. targetPlr.Name)
	logEvent(targetPlr, "Ta base a ete raid!")
	sendUI(plr)
	sendUI(targetPlr)
end
GrabBrainrot.OnServerEvent:Connect(function(plr, targetBaseId, vaultIndex) if targetBaseId then tryStealFromBase(plr, targetBaseId) end end)

-- Chase: owner touche thief -> drop, Brainrot retourne au owner
local function onTouchForChase(ownerPart, hit)
	local char = ownerPart:FindFirstAncestorOfClass("Model")
	local otherChar = hit:FindFirstAncestorOfClass("Model")
	if not char or not otherChar then return end
	local plrA = Players:GetPlayerFromCharacter(char)
	local plrB = Players:GetPlayerFromCharacter(otherChar)
	if not plrA or not plrB or plrA == plrB then return end
	local dA = getData(plrA)
	local dB = getData(plrB)
	local thief, owner = nil, nil
	if dA.carriedId then
		local bd = brainrotIdToData[dA.carriedId]
		if bd and bd.stolenStateEnd and os.clock() < bd.stolenStateEnd then thief = plrA; owner = plrB end
	end
	if not thief and dB.carriedId then
		local bd = brainrotIdToData[dB.carriedId]
		if bd and bd.stolenStateEnd and os.clock() < bd.stolenStateEnd then thief = plrB; owner = plrA end
	end
	if not thief or not owner then return end
	local td = getData(thief)
	local bd = brainrotIdToData[td.carriedId]
	if not bd then return end
	td.thiefMalusEnd = os.clock() + THIEF_MALUS_DURATION
	if bd.model and bd.model.Parent then bd.model.Parent = nil bd.model:Destroy() bd.model = nil end
	bd.ownerId = owner.UserId
	bd.stolenStateEnd = nil
	bd.inVault = true
	table.insert(getData(owner).vault, { id = td.carriedId, rarityId = bd.rarityId, traitId = bd.traitId, income = bd.income, weight = bd.weight, stolenStateEnd = nil })
	td.carriedId = nil
	local hum = thief.Character and thief.Character:FindFirstChild("Humanoid")
	if hum then hum.WalkSpeed = BASE_WALKSPEED end
	logEvent(thief, "Recupere! Malus 10s.")
	logEvent(owner, "Tu as recupere ton Brainrot!")
	sendUI(thief)
	sendUI(owner)
end

-- ========== UPGRADES ==========
local SPAWNER_UPGRADE_COST = { 500, 2000, 8000, 30000, 100000 }
local VAULT_UPGRADE_COST = { 300, 1500, 6000, 25000, 100000 }
UpgradeSpawner.OnServerEvent:Connect(function(plr)
	local d = getData(plr)
	local lvl = d.spawnerLevel + 1
	local cost = SPAWNER_UPGRADE_COST[lvl]
	if not cost or d.coins < cost then return end
	d.coins = d.coins - cost
	d.spawnerLevel = lvl
	logEvent(plr, "Spawner niveau " .. tostring(lvl))
	sendUI(plr)
end)
UpgradeVault.OnServerEvent:Connect(function(plr)
	local d = getData(plr)
	local cap = d.vaultCap + 2
	if cap > 30 then return end
	local cost = VAULT_UPGRADE_COST[math.min(#VAULT_UPGRADE_COST, math.floor(cap/2))]
	if not cost or d.coins < cost then return end
	d.coins = d.coins - cost
	d.vaultCap = cap
	logEvent(plr, "Vault capacite " .. tostring(cap))
	sendUI(plr)
end)

PanicButton.OnServerEvent:Connect(function(plr)
	local d = getData(plr)
	if d.panicEnd > os.clock() then return end
	d.panicEnd = os.clock() + PANIC_DURATION
	logEvent(plr, "PANIC! Base fermee 30s")
	sendUI(plr)
end)

Players.PlayerAdded:Connect(function(plr)
	getData(plr)
	task.delay(0.5, function() sendUI(plr) end)
end)
Players.PlayerRemoving:Connect(function(plr) playerData[plr.UserId] = nil end)

-- ========== MAP ==========
local function buildMap()
	if Workspace:FindFirstChild("MapJeu") and Workspace.MapJeu:FindFirstChild("Base1") then
		mapFolder = Workspace.MapJeu
		for id = 1, 8 do
			local baseM = mapFolder:FindFirstChild("Base" .. id)
			if baseM then
				local vz = baseM:FindFirstChild("VaultZone")
				if vz and vz:FindFirstChild("ProximityPrompt") then
					vz.ProximityPrompt.Triggered:Connect(function(who)
						if not isInVaultZone(who, id) then return end
						local d = getData(who)
						if d.baseId ~= id or not d.carriedId then return end
						local bdata = brainrotIdToData[d.carriedId]
						if not bdata or not bdata.model then return end
						if #d.vault >= d.vaultCap then logEvent(who, "Vault pleine!"); return end
						bdata.model.Parent = nil; bdata.model:Destroy(); bdata.model = nil
						bdata.inVault = true; bdata.ownerId = who.UserId
						local stolenEnd = bdata.stolenStateEnd; bdata.stolenStateEnd = nil
						table.insert(d.vault, { id = d.carriedId, rarityId = bdata.rarityId, traitId = bdata.traitId, income = bdata.income, weight = bdata.weight, stolenStateEnd = stolenEnd })
						d.carriedId = nil
						local hum = who.Character and who.Character:FindFirstChild("Humanoid")
						if hum then hum.WalkSpeed = BASE_WALKSPEED end
						logEvent(who, "BRAAAINROT ACQUIRED!")
						sendUI(who)
					end)
				end
				local stealPad = baseM:FindFirstChild("StealPad")
				if stealPad and stealPad:FindFirstChild("ProximityPrompt") then stealPad.ProximityPrompt.Triggered:Connect(function(who) tryStealFromBase(who, id) end) end
				bases[id] = {
					model = baseM,
					floor = baseM:FindFirstChild("Floor"),
					vaultZone = vz,
					spawner = baseM:FindFirstChild("Spawner"),
					spawnerPoint = baseM:FindFirstChild("SpawnPoint"),
					spawnPoint = baseM:FindFirstChild("SpawnPoint"),
					core = baseM:FindFirstChild("Core"),
				}
			end
		end
		print("[SAB] Map existante.")
		return
	end
	local existing = Workspace:FindFirstChild("MapJeu")
	if existing then existing:Destroy() end
	mapFolder = Instance.new("Folder"); mapFolder.Name = "MapJeu"; mapFolder.Parent = Workspace
	local function part(n, pos, size, color, mat, parent)
		local p = Instance.new("Part"); p.Name = n; p.Size = size; p.Position = pos; p.Anchored = true
		p.BrickColor = color; p.Material = mat or Enum.Material.SmoothPlastic; p.CanCollide = true; p.Parent = parent or mapFolder
		return p
	end
	-- Sol VERT (style Steal a Brainrot)
	part("Sol", Vector3.new(0, -2, 0), Vector3.new(200, 2, 200), BrickColor.new("Bright green"), Enum.Material.Grass, mapFolder)
	-- Tapis rouge central (chemin)
	for z = -80, 80, 10 do
		part("Path", Vector3.new(0, -1, z), Vector3.new(14, 1, 10), BrickColor.new("Really red"), Enum.Material.SmoothPlastic, mapFolder)
	end
	-- 8 bases = BATIMENTS gris avec toit, porte, panneau
	local baseOffsets = {
		Vector3.new(-58, 0, -58), Vector3.new(58, 0, -58), Vector3.new(-58, 0, 58), Vector3.new(58, 0, 58),
		Vector3.new(-58, 0, 0), Vector3.new(58, 0, 0), Vector3.new(0, 0, -58), Vector3.new(0, 0, 58),
	}
	local baseNames = { "Rookie", "Pro", "Boss", "Elite", "Alpha", "Omega", "Star", "King" }
	for id = 1, 8 do
		local baseM = Instance.new("Model"); baseM.Name = "Base" .. id; baseM.Parent = mapFolder
		local off = baseOffsets[id]
		local W, D, H = 22, 18, 10
		local floor = part("Floor", off + Vector3.new(0, 0.5, 0), Vector3.new(W, 1, D), BrickColor.new("Medium stone grey"), Enum.Material.Concrete, baseM)
		part("WallB1", off + Vector3.new(-6, H/2, -D/2-0.5), Vector3.new(8, H, 1), BrickColor.new("Dark stone grey"), nil, baseM)
		part("WallB2", off + Vector3.new(6, H/2, -D/2-0.5), Vector3.new(8, H, 1), BrickColor.new("Dark stone grey"), nil, baseM)
		local wallF = part("WallF", off + Vector3.new(0, H/2, D/2+0.5), Vector3.new(W+1, H, 1), BrickColor.new("Dark stone grey"), nil, baseM)
		local wallL = part("WallL", off + Vector3.new(-W/2-0.5, H/2, 0), Vector3.new(1, H, D+1), BrickColor.new("Dark stone grey"), nil, baseM)
		local wallR = part("WallR", off + Vector3.new(W/2+0.5, H/2, 0), Vector3.new(1, H, D+1), BrickColor.new("Dark stone grey"), nil, baseM)
		local roof = part("Roof", off + Vector3.new(0, H+0.5, 0), Vector3.new(W+2, 1, D+2), BrickColor.new("Black"), nil, baseM)
		local sign = part("Sign", off + Vector3.new(0, H+2, -D/2-0.5), Vector3.new(8, 2.5, 0.5), BrickColor.new("Brown"), nil, baseM)
		local signGui = Instance.new("SurfaceGui"); signGui.Face = Enum.NormalId.Front; signGui.Parent = sign
		local signTxt = Instance.new("TextLabel"); signTxt.Size = UDim2.new(1, 0, 1, 0); signTxt.BackgroundTransparency = 1; signTxt.Text = (baseNames[id] or "Base") .. "'s floor"; signTxt.TextColor3 = Color3.new(1,1,1); signTxt.TextScaled = true; signTxt.Font = Enum.Font.GothamBold; signTxt.Parent = signGui
		local vaultZone = Instance.new("Part"); vaultZone.Name = "VaultZone"; vaultZone.Size = Vector3.new(10, 5, 8); vaultZone.Position = off + Vector3.new(0, 3, 0); vaultZone.Transparency = 1; vaultZone.CanCollide = false; vaultZone.Anchored = true; vaultZone.Parent = baseM
		local dp = Instance.new("ProximityPrompt"); dp.ActionText = "Deposer"; dp.ObjectText = "[E] Vault"; dp.KeyboardKeyCode = Enum.KeyCode.E; dp.MaxActivationDistance = 12; dp.HoldDuration = 0; dp.Parent = vaultZone
		dp.Triggered:Connect(function(who)
			if not isInVaultZone(who, id) then return end
			local d = getData(who)
			if d.baseId ~= id or not d.carriedId then return end
			local bdata = brainrotIdToData[d.carriedId]
			if not bdata or not bdata.model then return end
			if #d.vault >= d.vaultCap then logEvent(who, "Vault pleine!"); return end
			bdata.model.Parent = nil; bdata.model:Destroy(); bdata.model = nil
			bdata.inVault = true; bdata.ownerId = who.UserId
			local stolenEnd = bdata.stolenStateEnd; bdata.stolenStateEnd = nil
			table.insert(d.vault, { id = d.carriedId, rarityId = bdata.rarityId, traitId = bdata.traitId, income = bdata.income, weight = bdata.weight, stolenStateEnd = stolenEnd })
			d.carriedId = nil
			local hum = who.Character and who.Character:FindFirstChild("Humanoid")
			if hum then hum.WalkSpeed = BASE_WALKSPEED end
			logEvent(who, "BRAAAINROT ACQUIRED!")
			sendUI(who)
		end)
		local spawner = part("Spawner", off + Vector3.new(-5, 2, 0), Vector3.new(3, 2.5, 3), BrickColor.new("Bright violet"), Enum.Material.Neon, baseM)
		local spawnPoint = Instance.new("Part"); spawnPoint.Name = "SpawnPoint"; spawnPoint.Size = Vector3.new(2, 1, 2); spawnPoint.Position = off + Vector3.new(-5, 3.5, 0); spawnPoint.Transparency = 1; spawnPoint.CanCollide = false; spawnPoint.Anchored = true; spawnPoint.Parent = baseM
		local core = part("Core", off + Vector3.new(5, 2, 0), Vector3.new(3, 2, 2), BrickColor.new("Gold"), Enum.Material.Neon, baseM)
		local spawn = Instance.new("SpawnLocation"); spawn.Name = "SpawnPoint"; spawn.Size = Vector3.new(6, 1, 6); spawn.Position = off + Vector3.new(0, 1, -D/2-4); spawn.Transparency = 1; spawn.CanCollide = false; spawn.Anchored = true; spawn.Parent = mapFolder
		local stealPad = part("StealPad", off + Vector3.new(0, 1.5, D/2-1), Vector3.new(6, 1.5, 1), BrickColor.new("Really red"), Enum.Material.Neon, baseM)
		local sp = Instance.new("ProximityPrompt"); sp.ActionText = "Voler"; sp.ObjectText = "Vault"; sp.KeyboardKeyCode = Enum.KeyCode.E; sp.MaxActivationDistance = 10; sp.HoldDuration = 0; sp.Parent = stealPad
		sp.Triggered:Connect(function(who) tryStealFromBase(who, id) end)
		bases[id] = { model = baseM, floor = floor, vaultZone = vaultZone, spawner = spawner, spawnerPoint = spawnPoint, spawnPoint = spawn, core = core }
	end
	print("[SAB] Map creee (vert + tapis rouge + batiments).")
end
buildMap()

-- Revenu passif
task.spawn(function()
	while true do
		task.wait(INCOME_INTERVAL)
		for _, plr in ipairs(Players:GetPlayers()) do
			local d = getData(plr)
			local total = 0
			for _, entry in ipairs(d.vault) do
				if entry.stolenStateEnd and os.clock() < entry.stolenStateEnd then continue end
				local r = RARITIES[entry.rarityId]
				local tr = TRAITS[entry.traitId or 1]
				if r and tr then total = total + r.income * (tr.incomeMult or 1) end
			end
			if total > 0 then d.coins = d.coins + math.floor(total); sendUI(plr) end
		end
	end
end)

-- Spawner tick
task.spawn(function()
	while true do
		task.wait(1)
		for _, plr in ipairs(Players:GetPlayers()) do spawnerTick(plr) end
	end
end)

-- Chase: owner character touch thief character
local function connectChase(part)
	part.Touched:Connect(function(hit) onTouchForChase(part, hit) end)
end
task.spawn(function()
	for _, plr in ipairs(Players:GetPlayers()) do
		if plr.Character then for _, c in ipairs(plr.Character:GetChildren()) do if c:IsA("BasePart") then connectChase(c) end end end
		plr.CharacterAdded:Connect(function(char)
			char.ChildAdded:Connect(function(c) if c:IsA("BasePart") then connectChase(c) end end)
			for _, c in ipairs(char:GetChildren()) do if c:IsA("BasePart") then connectChase(c) end end
		end)
	end
	Players.PlayerAdded:Connect(function(plr)
		plr.CharacterAdded:Connect(function(char)
			char.ChildAdded:Connect(function(c) if c:IsA("BasePart") then connectChase(c) end end)
			for _, c in ipairs(char:GetChildren()) do if c:IsA("BasePart") then connectChase(c) end end
		end)
	end)
end)

print("[SAB] Pret. Spawner + Vault + Vol + Chase + Safe Zone + Panic.")