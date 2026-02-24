--[[
  STEAL A BRAINROT - Client (design complet)
  UI: coins, coins/s, Vault x/y, Spawner, Panic, Journal, Collection, Leaderboard.
  Coller dans StarterGui (LocalScript).
]]
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")
local UserInputService = game:GetService("UserInputService")
local player = Players.LocalPlayer
local gui = player:WaitForChild("PlayerGui")

local Remotes = ReplicatedStorage:WaitForChild("Remotes", 25)
if not Remotes then warn("[SAB] Remotes absent."); return end
local UpdateUI = Remotes:WaitForChild("UpdateUI", 5)
local RequestData = Remotes:WaitForChild("RequestData", 5)
local EventLog = Remotes:WaitForChild("EventLog", 5)
local UpgradeSpawner = Remotes:WaitForChild("UpgradeSpawner", 5)
local UpgradeVault = Remotes:WaitForChild("UpgradeVault", 5)
local PanicButton = Remotes:WaitForChild("PanicButton", 5)
local RequestLeaderboard = Remotes:WaitForChild("RequestLeaderboard", 5)
if not UpdateUI or not RequestData then warn("[SAB] Remotes manquants."); return end

local sg = Instance.new("ScreenGui"); sg.Name = "SAB_Gui"; sg.ResetOnSpawn = false; sg.ZIndexBehavior = Enum.ZIndexBehavior.Sibling; sg.Parent = gui
local function corner(r) local c = Instance.new("UICorner"); c.CornerRadius = UDim.new(0, r); return c end
local function pad(l,r,t,b) local p = Instance.new("UIPadding"); p.PaddingLeft = UDim.new(0, l or 0); p.PaddingRight = UDim.new(0, r or 0); p.PaddingTop = UDim.new(0, t or 0); p.PaddingBottom = UDim.new(0, b or 0); return p end

-- Cadre principal
local frame = Instance.new("Frame"); frame.Name = "Main"; frame.Size = UDim2.new(0, 360, 0, 220); frame.Position = UDim2.new(0, 20, 0, 20)
frame.BackgroundColor3 = Color3.fromRGB(20, 20, 28); frame.BorderSizePixel = 0; frame.Parent = sg; corner(16).Parent = frame; pad(20, 20, 16, 16).Parent = frame

local labelCoins = Instance.new("TextLabel"); labelCoins.Size = UDim2.new(1, -40, 0, 38); labelCoins.Position = UDim2.new(0, 0, 0, 0)
labelCoins.BackgroundTransparency = 1; labelCoins.Text = "Coins: 0"; labelCoins.TextColor3 = Color3.fromRGB(255, 220, 100); labelCoins.TextSize = 32; labelCoins.Font = Enum.Font.GothamBold
labelCoins.TextXAlignment = Enum.TextXAlignment.Left; labelCoins.Parent = frame

local labelIncome = Instance.new("TextLabel"); labelIncome.Size = UDim2.new(1, -40, 0, 22); labelIncome.Position = UDim2.new(0, 0, 0, 40)
labelIncome.BackgroundTransparency = 1; labelIncome.Text = "0 coins/s"; labelIncome.TextColor3 = Color3.fromRGB(150, 255, 150); labelIncome.TextSize = 16; labelIncome.Font = Enum.Font.Gotham
labelIncome.TextXAlignment = Enum.TextXAlignment.Left; labelIncome.Parent = frame

local labelVault = Instance.new("TextLabel"); labelVault.Size = UDim2.new(1, -40, 0, 22); labelVault.Position = UDim2.new(0, 0, 0, 62)
labelVault.BackgroundTransparency = 1; labelVault.Text = "Vault: 0 / 6"; labelVault.TextColor3 = Color3.fromRGB(255, 180, 255); labelVault.TextSize = 16; labelVault.Font = Enum.Font.Gotham
labelVault.TextXAlignment = Enum.TextXAlignment.Left; labelVault.Parent = frame

local labelSpawner = Instance.new("TextLabel"); labelSpawner.Size = UDim2.new(1, -40, 0, 20); labelSpawner.Position = UDim2.new(0, 0, 0, 84)
labelSpawner.BackgroundTransparency = 1; labelSpawner.Text = "Spawner niv.1"; labelSpawner.TextColor3 = Color3.fromRGB(200, 200, 255); labelSpawner.TextSize = 14; labelSpawner.Font = Enum.Font.Gotham
labelSpawner.TextXAlignment = Enum.TextXAlignment.Left; labelSpawner.Parent = frame

local btnUpgradeSpawner = Instance.new("TextButton"); btnUpgradeSpawner.Size = UDim2.new(0, 100, 0, 32); btnUpgradeSpawner.Position = UDim2.new(0, 0, 0, 106)
btnUpgradeSpawner.BackgroundColor3 = Color3.fromRGB(100, 60, 180); btnUpgradeSpawner.BorderSizePixel = 0; btnUpgradeSpawner.Text = "Upgrade Spawner"; btnUpgradeSpawner.TextSize = 12; btnUpgradeSpawner.Font = Enum.Font.GothamBold
btnUpgradeSpawner.Parent = frame; corner(8).Parent = btnUpgradeSpawner

local btnUpgradeVault = Instance.new("TextButton"); btnUpgradeVault.Size = UDim2.new(0, 100, 0, 32); btnUpgradeVault.Position = UDim2.new(0, 108, 0, 106)
btnUpgradeVault.BackgroundColor3 = Color3.fromRGB(60, 120, 180); btnUpgradeVault.BorderSizePixel = 0; btnUpgradeVault.Text = "Upgrade Vault"; btnUpgradeVault.TextSize = 12; btnUpgradeVault.Font = Enum.Font.GothamBold
btnUpgradeVault.Parent = frame; corner(8).Parent = btnUpgradeVault

local btnPanic = Instance.new("TextButton"); btnPanic.Size = UDim2.new(0, 100, 0, 32); btnPanic.Position = UDim2.new(0, 216, 0, 106)
btnPanic.BackgroundColor3 = Color3.fromRGB(180, 60, 60); btnPanic.BorderSizePixel = 0; btnPanic.Text = "PANIC 30s"; btnPanic.TextSize = 12; btnPanic.Font = Enum.Font.GothamBold
btnPanic.Parent = frame; corner(8).Parent = btnPanic

local labelPanic = Instance.new("TextLabel"); labelPanic.Size = UDim2.new(1, -40, 0, 18); labelPanic.Position = UDim2.new(0, 0, 0, 142)
labelPanic.BackgroundTransparency = 1; labelPanic.Text = ""; labelPanic.TextColor3 = Color3.fromRGB(255, 150, 150); labelPanic.TextSize = 12; labelPanic.Font = Enum.Font.Gotham
labelPanic.TextXAlignment = Enum.TextXAlignment.Left; labelPanic.Parent = frame

local labelCarried = Instance.new("TextLabel"); labelCarried.Size = UDim2.new(1, -40, 0, 18); labelCarried.Position = UDim2.new(0, 0, 0, 162)
labelCarried.BackgroundTransparency = 1; labelCarried.Text = ""; labelCarried.TextColor3 = Color3.fromRGB(255, 255, 150); labelCarried.TextSize = 12; labelCarried.Font = Enum.Font.Gotham
labelCarried.TextXAlignment = Enum.TextXAlignment.Left; labelCarried.Parent = frame

local labelHint = Instance.new("TextLabel"); labelHint.Size = UDim2.new(1, -40, 0, 36); labelHint.Position = UDim2.new(0, 0, 0, 182)
labelHint.BackgroundTransparency = 1; labelHint.Text = "[E] Saisir au Spawner | [E] Deposer en Vault | [E] Voler au StealPad\n[Tab] Classement | Zone safe = pas de vol"; labelHint.TextColor3 = Color3.fromRGB(140, 140, 150)
labelHint.TextSize = 11; labelHint.Font = Enum.Font.Gotham; labelHint.TextXAlignment = Enum.TextXAlignment.Left; labelHint.TextYAlignment = Enum.TextYAlignment.Top; labelHint.Parent = frame

-- Journal evenements
local logFrame = Instance.new("Frame"); logFrame.Size = UDim2.new(0, 300, 0, 140); logFrame.Position = UDim2.new(1, -320, 0, 20)
logFrame.BackgroundColor3 = Color3.fromRGB(22, 22, 30); logFrame.BorderSizePixel = 0; logFrame.Parent = sg; corner(12).Parent = logFrame
local logTitle = Instance.new("TextLabel"); logTitle.Size = UDim2.new(1, -16, 0, 24); logTitle.Position = UDim2.new(0, 8, 0, 4)
logTitle.BackgroundTransparency = 1; logTitle.Text = "Journal"; logTitle.TextColor3 = Color3.new(1,1,1); logTitle.TextSize = 16; logTitle.Font = Enum.Font.GothamBold; logTitle.Parent = logFrame
local logScroll = Instance.new("ScrollingFrame"); logScroll.Size = UDim2.new(1, -16, 1, -32); logScroll.Position = UDim2.new(0, 8, 0, 28)
logScroll.BackgroundTransparency = 1; logScroll.BorderSizePixel = 0; logScroll.ScrollBarThickness = 4; logScroll.CanvasSize = UDim2.new(0,0,0,0); logScroll.Parent = logFrame
local logLayout = Instance.new("UIListLayout"); logLayout.Padding = UDim.new(0, 4); logLayout.Parent = logScroll

-- Leaderboard
local lbFrame = Instance.new("Frame"); lbFrame.Name = "Leaderboard"; lbFrame.Size = UDim2.new(0, 320, 0, 400); lbFrame.Position = UDim2.new(0.5, -160, 0.5, -200)
lbFrame.BackgroundColor3 = Color3.fromRGB(28, 28, 38); lbFrame.BorderSizePixel = 0; lbFrame.Visible = false; lbFrame.Parent = sg; corner(16).Parent = lbFrame
local lbTitle = Instance.new("TextLabel"); lbTitle.Size = UDim2.new(1, -20, 0, 44); lbTitle.Position = UDim2.new(0, 10, 0, 10)
lbTitle.BackgroundTransparency = 1; lbTitle.Text = "Classement"; lbTitle.TextColor3 = Color3.new(1,1,1); lbTitle.TextSize = 24; lbTitle.Font = Enum.Font.GothamBold; lbTitle.Parent = lbFrame
local lbList = Instance.new("ScrollingFrame"); lbList.Size = UDim2.new(1, -20, 1, -60); lbList.Position = UDim2.new(0, 10, 0, 54)
lbList.BackgroundTransparency = 1; lbList.BorderSizePixel = 0; lbList.ScrollBarThickness = 6; lbList.CanvasSize = UDim2.new(0,0,0,0); lbList.Parent = lbFrame
local lbLayout = Instance.new("UIListLayout"); lbLayout.Padding = UDim.new(0, 6); lbLayout.Parent = lbList

local function refresh(coins, gems, coinsPerSec, vaultCount, vaultCap, spawnerLevel, panic, panicRemain, carried)
	labelCoins.Text = "Coins: " .. tostring(coins)
	labelIncome.Text = tostring(coinsPerSec) .. " coins/s"
	labelVault.Text = "Vault: " .. tostring(vaultCount) .. " / " .. tostring(vaultCap)
	labelSpawner.Text = "Spawner niv." .. tostring(spawnerLevel)
	if panic and panicRemain > 0 then
		labelPanic.Text = string.format("PANIC %.0fs", panicRemain)
	else
		labelPanic.Text = ""
	end
	labelCarried.Text = carried and "Tu portes un Brainrot -> Depose en Vault!" or ""
end

UpdateUI.OnClientEvent:Connect(refresh)
if EventLog then EventLog.OnClientEvent:Connect(function(msg) if not logScroll then return end local lb = Instance.new("TextLabel"); lb.Size = UDim2.new(1, -8, 0, 22); lb.BackgroundTransparency = 1; lb.Text = msg or ""; lb.TextColor3 = Color3.fromRGB(220, 220, 220); lb.TextSize = 12; lb.Font = Enum.Font.Gotham; lb.TextXAlignment = Enum.TextXAlignment.Left; lb.TextWrapped = true; lb.Parent = logScroll; logScroll.CanvasSize = UDim2.new(0, 0, 0, lbLayout.AbsoluteContentSize.Y + 10) end) end

task.spawn(function()
	local ok, data = pcall(function() return RequestData:InvokeServer() end)
	if ok and type(data) == "table" then
		refresh(data.coins or 0, data.gems or 0, data.coinsPerSec or 0, data.vaultCount or 0, data.vaultCap or 6, data.spawnerLevel or 1, data.panic or false, data.panicRemain or 0, data.carried or false)
	end
end)

btnUpgradeSpawner.MouseButton1Click:Connect(function() UpgradeSpawner:FireServer() end)
btnUpgradeVault.MouseButton1Click:Connect(function() UpgradeVault:FireServer() end)
btnPanic.MouseButton1Click:Connect(function() PanicButton:FireServer() end)

UserInputService.InputBegan:Connect(function(input, gameProcessed)
	if gameProcessed then return end
	if input.KeyCode == Enum.KeyCode.Tab then
		lbFrame.Visible = not lbFrame.Visible
		if lbFrame.Visible and RequestLeaderboard then
			local ok, list = pcall(function() return RequestLeaderboard:InvokeServer() end)
			if ok and type(list) == "table" then
				for _, c in ipairs(lbList:GetChildren()) do if c:IsA("TextLabel") then c:Destroy() end end
				for i, entry in ipairs(list) do
					local row = Instance.new("TextLabel"); row.Size = UDim2.new(1, -10, 0, 30); row.BackgroundColor3 = Color3.fromRGB(40, 40, 52)
					row.BorderSizePixel = 0; row.Text = string.format("#%d %s  |  %s coins  |  %s/s  |  Vault %d", i, entry.name or "?", tostring(entry.coins or 0), tostring(entry.income or 0), entry.vault or 0)
					row.TextColor3 = Color3.new(1,1,1); row.TextSize = 13; row.Font = Enum.Font.Gotham; row.TextXAlignment = Enum.TextXAlignment.Left
					row.Parent = lbList; corner(6).Parent = row; pad(10, 10, 0, 0).Parent = row
				end
				lbList.CanvasSize = UDim2.new(0, 0, 0, lbLayout.AbsoluteContentSize.Y + 10)
			end
		end
	end
end)

task.spawn(function()
	while true do
		task.wait(2)
		local ok, data = pcall(function() return RequestData:InvokeServer() end)
		if ok and type(data) == "table" then
			refresh(data.coins or 0, data.gems or 0, data.coinsPerSec or 0, data.vaultCount or 0, data.vaultCap or 6, data.spawnerLevel or 1, data.panic or false, data.panicRemain or 0, data.carried or false)
		end
	end
end)
