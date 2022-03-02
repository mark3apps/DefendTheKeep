udg_force_allied = nil
udg_force_federation = nil
udg_grp_RevivableHeroes = nil
udg_TempReal = 0.0
udg_timer_Revive = {}
udg_ReviveTimerWindows = {}
udg_grp_UNIT_Bases = {}
udg_grp_Healing = {}
udg_TEMP_Pos_Hero = nil
udg_TEMP_Pos2 = nil
udg_grp_TEMP_UnitGroup = nil
udg_TEMP_Pos_Spell = nil
udg_TEMP_Real = 0.0
udg_TEMP_Real_2 = 0.0
udg_TEMP_Int2 = 0
udg_Spell_LOC_Spell = nil
udg_Spell_LOC_Cast = nil
udg_Spell_Counter = 0.0
udg_Spell_Duration = 0.0
udg_Spell_Level = 0
udg_Spell_Distance = 0.0
udg_Spell_Speed = 0.0
udg_Spell_Phase = 0
udg_Spell_Unit_Target = nil
udg_Spell_Player = nil
udg_Hero_Levels = __jarray(0)
udg_CALC_Level_Factor = 0.0
udg_CALC_Base = 0.0
udg_CALC_Constant = 0.0
udg_CALC_Previous_Value = 0.0
udg_CALC_LOOP = 0
udg_CALC_ITERATIONS = 0
udg_CALC_RESULT = 0.0
udg_Spell_Caster = nil
udg_Paradox_HASH = nil
udg_Paradox_INTERVAL = 0.0
udg_Paradox_GROUP = nil
udg_TimeTravel_HASH = nil
udg_TimeTravel_GROUP = nil
udg_TimeTravel_INTERVAL = 0.0
udg_Spell_Damage = 0.0
udg_grp_Bases_Teleport = {}
udg_units = nil
udg_unit_PickedHero = nil
gg_snd_PurgeTarget1 = nil
gg_snd_BattleNetTick = nil
gg_snd_CreepAggroWhat1 = nil
gg_snd_Error = nil
gg_snd_MapPing = nil
gg_snd_Warning = nil
gg_snd_GateEpicDeath = nil
gg_trg_Level100 = nil
gg_trg_fogofwar = nil
gg_trg_testing = nil
gg_trg_FUNC_Calculate_Level_Factor = nil
gg_trg_Paradox_INIT = nil
gg_trg_Paradox_CAST = nil
gg_trg_Paradox_LOOP = nil
gg_trg_Chrono_Atrophy_CAST = nil
gg_trg_Time_Travel_INIT = nil
gg_trg_Time_Travel_CAST = nil
gg_trg_Time_Travel_LOOP = nil
gg_trg_Level_Up_Team = nil
gg_trg_Revive_Hero = nil
gg_trg_Revive_Hero_Timer = nil
gg_trg_End_Of_Game_Left = nil
gg_trg_End_Of_Game_Right = nil
gg_trg_baseAndHeals = nil
gg_trg_units = nil
gg_unit_h00E_0081 = nil
gg_unit_n00K_0477 = nil
function InitGlobals()
    local i = 0
    udg_force_allied = CreateForce()
    udg_force_federation = CreateForce()
    udg_grp_RevivableHeroes = CreateGroup()
    udg_TempReal = 0.0
    i = 0
    while (true) do
        if ((i > 24)) then break end
        udg_timer_Revive[i] = CreateTimer()
        i = i + 1
    end
    i = 0
    while (true) do
        if ((i > 2)) then break end
        udg_grp_UNIT_Bases[i] = CreateGroup()
        i = i + 1
    end
    i = 0
    while (true) do
        if ((i > 2)) then break end
        udg_grp_Healing[i] = CreateGroup()
        i = i + 1
    end
    udg_grp_TEMP_UnitGroup = CreateGroup()
    udg_TEMP_Real = 0.0
    udg_TEMP_Real_2 = 0.0
    udg_TEMP_Int2 = 0
    udg_Spell_Counter = 0.0
    udg_Spell_Duration = 0.0
    udg_Spell_Level = 0
    udg_Spell_Distance = 0.0
    udg_Spell_Speed = 0.0
    udg_Spell_Phase = 0
    i = 0
    while (true) do
        if ((i > 0)) then break end
        udg_Hero_Levels[i] = 0
        i = i + 1
    end
    udg_CALC_Level_Factor = 0.0
    udg_CALC_Base = 0.0
    udg_CALC_Constant = 0.0
    udg_CALC_Previous_Value = 0.0
    udg_CALC_LOOP = 0
    udg_CALC_ITERATIONS = 0
    udg_CALC_RESULT = 0.0
    udg_Paradox_INTERVAL = 0.0
    udg_Paradox_GROUP = CreateGroup()
    udg_TimeTravel_GROUP = CreateGroup()
    udg_TimeTravel_INTERVAL = 0.0
    udg_Spell_Damage = 0.0
    i = 0
    while (true) do
        if ((i > 2)) then break end
        udg_grp_Bases_Teleport[i] = CreateGroup()
        i = i + 1
    end
    udg_units = CreateGroup()
end

-- Requires https://www.hiveworkshop.com/threads/lua-timerutils.316957/
do
    local data = {}
    function SetTimerData(whichTimer, dat)
        data[whichTimer] = dat
    end
 
    --GetData functionality doesn't even require an argument.
    function GetTimerData(whichTimer)
        if not whichTimer then whichTimer = GetExpiredTimer() end
        return data[whichTimer]
    end
 
    --NewTimer functionality includes optional parameter to pass data to timer.
    function NewTimer(dat)
        local t = CreateTimer()
        if dat then data[t] = dat end
        return t
    end
 
    --Release functionality doesn't even need for you to pass the expired timer.
    --as an arg. It also returns the user data passed.
    function ReleaseTimer(whichTimer)
        if not whichTimer then whichTimer = GetExpiredTimer() end
        local dat = data[whichTimer]
        data[whichTimer] = nil
        PauseTimer(whichTimer)
        DestroyTimer(whichTimer)
        return dat
    end
end



do
    local oldWait = PolledWait
    function PolledWait(duration)
        local thread = coroutine.running()
        if thread then
            TimerStart(NewTimer(thread), duration, false, function()
                coroutine.resume(ReleaseTimer())
            end)
            coroutine.yield(thread)
        else
            oldWait(duration)
        end
    end
  
    local oldTSA = TriggerSleepAction
    function TriggerSleepAction(duration) PolledWait(duration) end
  
    local thread
    local oldSync = SyncSelections
    function SyncSelectionsHelper()
        local t = thread
        oldSync()
        coroutine.resume(t)
    end
    function SyncSelections()
        thread = coroutine.running()
        if thread then
            ExecuteFunc("SyncSelectionsHelper")
            coroutine.yield(thread)
        else
            oldSync()
        end
    end
  
    if not EnableWaits then --Added this check to ensure compatibilitys with Lua Fast Triggers
        local oldAction = TriggerAddAction
        function TriggerAddAction(whichTrig, userAction)
            oldAction(whichTrig, function()
                coroutine.resume(coroutine.create(function()
                    userAction()
                end))
            end)
        end
    end
end
TasButtonAction = {
    Set = function(frame, action)
        -- first call?
        if not TasButtonAction.Trigger then
            -- yes, Create the Trigger and the click handler
            TasButtonAction.Trigger = CreateTrigger()
            TriggerAddAction(TasButtonAction.Trigger, function()
                local frame = BlzGetTriggerFrame()
                -- remove Focus for the local clicking player
                if GetTriggerPlayer() == GetLocalPlayer() then
                    BlzFrameSetEnable(frame, false)
                    BlzFrameSetEnable(frame, true)
                end
                -- call the action set for that frame
                TasButtonAction[frame](frame, GetTriggerPlayer())
                frame = nil
            end)
        end

        -- create the click event only when it does not exist yet.
        if not TasButtonAction[frame] then
            BlzTriggerRegisterFrameEvent(TasButtonAction.Trigger, frame, FRAMEEVENT_CONTROL_CLICK)
        end
        
        TasButtonAction[frame] = action
    end
}
--[[
HeroSelector V1.6

------
This functions are found directly below the config and belong to the config.
They also can be hooked but you might lose the default. Could do it like it is done in TeamViewer create a Backup of the current then overwrite it and call the backup in the replacement.

function HeroSelector.unitCreated(player, unitCode, isRandom)
    this function is called when an unit is picked, add here you actions that have to be done for the picked unit

function HeroSelector.buttonSelected(player, unitCode)
    this function is called when an player selects an button, this is not the picking.

function HeroSelector.unitBaned(player, unitCode)
    this function is called when a player bans an unitCode.

function HeroSelector.repick(unit[, player])
    if player is skiped unit owner sees the selection
    this will remove the unit from the game.
    Adds thie unitcode of the unit to the randompool

function HeroSelector.autoDetectCategory(unitCode)
    this called on every unit added. It is a good place for simple automatic categorizes, on default it categorizes melee as 1 and ranged as 2.

function HeroSelector.initHeroes()
    this function will be called before anything is created, when not using GUI to setup data you could add the selectable heroes here.
------
How use the Selection grid?
Each hero can only be once in the grid. When using HeroSelector.addUnit it will add a new slot. There are HeroSelector.ButtonColCount*HeroSelector.ButtonRowCount slots.
3 rows with 4 cols would result into:
01 02 03 04
05 06 07 08
09 10 11 12

When you want to leave fields in the grid empty use HeroSelector.addUnit(0) or HeroSelector.addUnit().
There is a GUI setup which works with indexes, not set indexes will be empty fields.
------
function HeroSelector.setUnitReq(unitCode, who)
    adds an requirement: can be a player, a force, a teamNumber, a race, a table {techcode, level}, skip who or nil will remove an requirment.
    Only when the local player fullfills than he can click the button.
    calling this will not update the selected buttonIndex of players nor does this update the clickability.
    To update the clickability when setting requirments after the Box was created use HeroSelector.update() and deselect indexes
    won't work when the unitCode wasn't added yet.
    
function HeroSelector.addUnit([unitCode, onlyRandom, requirement])
    can be called without arguments to hava a empty slot calling it with 0 has the same effect
    requirement works like who in HeroSelector.setUnitReq.

function HeroSelector.setUnitCategory(unitCode, category)
    sets the category of an added Option.
    Category should be a power 2 number. 1 2 4 8 16 32 ....

function HeroSelector.addUnitCategory(unitCode, category)
    Keeps previous setings untouched

function HeroSelector.addCategory(icon, text)
    icon is the enabled image, text is the tooltip text.

function HeroSelector.clearUnitData()
    removes all current UnitData this includes limit-counters, requirements, categories.

function HeroSelector.show(flag, [who])
    Shows/Hides HeroSelector to who
    flag = true show it, false = hide it
    who can be a player, a force, a teamNumber, a race or nothing = anyone
    teamNumbers are the warcraft 3 given teamNumbers starting with 0 for team 1.
    the force is expected to be kept alive

function HeroSelector.setFrameText(frame, text[, who])
    uses BlzFrameSetText onto frame when the local player is included in who by the rules of function HeroSelector.includesPlayer
function HeroSelector.setTitleText(text[, who])
    wrapper HeroSelector.setFrameText
function HeroSelector.setBanButtonText(text[, who])
    wrapper HeroSelector.setFrameText
function HeroSelector.setAcceptButtonText(text[, who])
    wrapper HeroSelector.setFrameText

function HeroSelector.enablePick(flag[, who])
    enable/disable the accept/random button also makes them visible for that players and hides the ban Button.
    
function HeroSelector.enableBan(flag[, who])
    enable/disable the ban button also makes accept/random invisible for that players and shows the ban Button.

function HeroSelector.forceRandom([who])
    wrapper for doRandom for player

function HeroSelector.forcePick([who])
    forces to pick what currently is selected, if that fails doRandom

function HeroSelector.buttonRequirementDone(unitCode, player)

function HeroSelector.deselectButtons([buttonIndex])
    deselect selected buttons for all players with 0 or nil
    when an index is given only this specific buttonIndex

function HeroSelector.update()
    reDo possible selection, textures and enability for all heroButtons.

function HeroSelector.destroy()
    destroys and nil HeroSelector

function HeroSelector.getDisabledIcon(icon)
    ReplaceableTextures\CommandButtons\BTNHeroPaladin.tga -> ReplaceableTextures\CommandButtonsDisabled\DISBTNHeroPaladin.tga

function HeroSelector.showFrame(frame, flag[, who])
    Set the visibility of frame to flag when who includes the local player by the rules of function HeroSelector.includesPlayer

function HeroSelector.includesPlayer(who, player)
    does player include who?
    return true, if yes.
    return false otherwise
    who can be a number(GetPlayerTeam), a race(GetPlayerRace), a player, a force(BlzForceHasPlayer) or
    nil => true    

function HeroSelector.counterChangeUnitCode(unitCode, add, player)
    increases/decreases the counter for picks of unitCode for the player's team.
    This can allow/disallow picking this unit for that team.
    
function HeroSelector.frameLoseFocus(frame)
    this disables & enables frame for the local player to free current focus (enable hotkeys, chat ...).

function HeroSelector.rollOption(player, includeRandomOnly, excludedIndex, category)
    get an random Unitcode from the added options
    returns an unitcode or nil when none could be found
--]] HeroSelector = {}

-- Box
HeroSelector.BoxFrameName = "HeroSelectorRaceBox" -- this is the background box being created
HeroSelector.BoxPosX = 0.3
HeroSelector.BoxPosY = 0.4
HeroSelector.BoxPosPoint = FRAMEPOINT_CENTER
HeroSelector.AutoShow = false -- (true) shows the box and the Selection at 0.0 for all players
-- Unique Picks
HeroSelector.UnitCount = 5 -- each hero is in total allowed to be picked this amount of times (includes random, repicking allows a hero again).
HeroSelector.UnitCountPerTeam = 5 -- Each Team is allowed to pick this amount of each unitType
HeroSelector.ToManyTooltip = "OUTOFSTOCKTOOLTIP"
-- Ban
HeroSelector.DelayBanUntilPick = false -- (true) baning will not be applied instantly, instead it is applied when HeroSelector.enablePick is called the next time.
-- Category
HeroSelector.Category = {
    -- Icon path, tooltip Text (tries to localize)
    {"ReplaceableTextures\\CommandButtons\\BTNSteelMelee", "MELEE"}, -- 1, automatic detected when adding an unit
    {"ReplaceableTextures\\CommandButtons\\BTNHumanMissileUpOne", "Ranged"}, -- 2, automatic detected when adding an unit
    {"ReplaceableTextures\\CommandButtons\\BTNGauntletsOfOgrePower", "STRENGTH"}, -- 4
    {"ReplaceableTextures\\CommandButtons\\BTNSlippersOfAgility", "AGILITY"}, -- 8
    {
        "ReplaceableTextures\\CommandButtons\\BTNMantleOfIntelligence",
        "INTELLECT"
    } -- 16
}
HeroSelector.CategoryAffectRandom = true -- (false) random will not care about selected category
HeroSelector.CategoryMultiSelect = false -- (false) deselect other category when selecting one, (true) can selected multiple categories and all heroes having any of them are not filtered.
HeroSelector.CategorySize = 0.02 -- the size of the Category Button
HeroSelector.CategorySpaceX = 0.0008 -- space between 2 category Buttons, it is meant to need only one line of Categoryy Buttons.
HeroSelector.CategoryFilteredAlpha = 45 -- Alpha value of Heroes being filtered by unselected categories
HeroSelector.CategoryAutoDetectHero = true -- Will create and remove added Heroes to setup the Category for the primary Attribute Str(4) Agi(8) Int(16)   

-- Indicator
HeroSelector.IndicatorPathPick = "UI\\Feedback\\Autocast\\UI-ModalButtonOn.mdl" -- this model is used by the indicator during picking
HeroSelector.IndicatorPathBan = "war3mapImported\\HeroSelectorBan.mdl" -- this model is used by the indicator during baning
-- Grid
HeroSelector.SpaceBetweenX = 0.008 -- space between 2 buttons in one row
HeroSelector.SpaceBetweenY = 0.008 -- space between 2 rows
HeroSelector.ButtonColCount = 4 -- amount of buttons in one row
HeroSelector.ButtonRowCount = 4 -- amount of rows
HeroSelector.ChainedButtons = true -- (true) connect to the previous button/ or row, (false) have a offset to the box topLeft in this moving a button has no effect on other buttons.
-- Button
HeroSelector.ButtonSize = 0.036 -- size of each button
HeroSelector.ButtonBlendAll = false -- (true) when a hero icon uses transparenzy
HeroSelector.EmptyButtonPath =
    "UI\\Widgets\\EscMenu\\Human\\blank-background.blp"
HeroSelector.HideEmptyButtons = true
-- Ban Button
HeroSelector.BanButtonTextPrefix = "|cffcf2084" -- Prefix Text for the Ban Button
HeroSelector.BanButtonText = "CHAT_ACTION_BAN" -- tries to get a Localized String
HeroSelector.BanButtonSizeX = 0.13
HeroSelector.BanButtonSizeY = 0.03
HeroSelector.BanTooltip = "DISALLOWED"
HeroSelector.BanIgnoreRequirment = true -- (true) Ban is not restricted by Requirments
-- Accept Button
HeroSelector.AcceptButtonTextPrefix = ""
HeroSelector.AcceptButtonText = "ACCEPT"
HeroSelector.AcceptButtonSizeX = 0.085
HeroSelector.AcceptButtonSizeY = 0.03
HeroSelector.AcceptButtonIsShown = true
HeroSelector.AcceptButtonAnchor = FRAMEPOINT_BOTTOMRIGHT -- places the Accept button with which Point to the bottom, with right he is at the left
-- Random Button
HeroSelector.RandomButtonTextPrefix = ""
HeroSelector.RandomButtonText = "RANDOM" -- tries Localizing
HeroSelector.RandomButtonSizeX = 0.085
HeroSelector.RandomButtonSizeY = 0.03
HeroSelector.RandomButtonIsShown = true
HeroSelector.RandomButtonAnchor = FRAMEPOINT_BOTTOMLEFT
HeroSelector.RandomButtonPick = false -- (true) pressing the random button will pick the option. (false) pressing the random button will select a button, random only heroes can not be selected, but that does not matter. This weak random and randomonly should not be combined.
-- Tooltip
HeroSelector.TooltipPrefix = "|cffffcc00"
HeroSelector.TooltipOffsetX = 0
HeroSelector.TooltipOffsetY = 0
HeroSelector.TooltipPoint = FRAMEPOINT_BOTTOM -- pos the Tooltip with which Point
HeroSelector.TooltipRelativePoint = FRAMEPOINT_TOP -- pos the Tooltip to which Point of the Relative
HeroSelector.TooltipRelativIsBox = false -- (true) use the box as anchor, (false) use the button as anchor
HeroSelector.TooltipRequires = "QUESTCOMPONENTS"

-- Border
HeroSelector.BorderSize = {}
HeroSelector.BorderSize[RACE_HUMAN] = 0.029 -- border size seen by Race Human, this is needed cause the borders are different in size.
HeroSelector.BorderSize[RACE_ORC] = 0.029
HeroSelector.BorderSize[RACE_UNDEAD] = 0.035
HeroSelector.BorderSize[RACE_NIGHTELF] = 0.035
HeroSelector.BorderSize[RACE_DEMON] = 0.024

-- This runs before the box is created with that the system has the needed data right when it is needed.
-- you can add units somewhere else but it is done after the box was created you have to use the update function to update the textures of shown buttons
function HeroSelector.initHeroes()
    -- create categories setuped in config
    local categories = HeroSelector.Category
    HeroSelector.Category = {}
    for index, value in ipairs(categories) do
        HeroSelector.addCategory(value[1], value[2])
    end

    -- adding further units when using the GUI Array does not make much sense, except you would add rows.

    -- skip further demo code
    -- if true then return end

    -- Adds requirments
    -- when you have a ban phase it might be better to add the requirments after the ban phase is over, otherwise one can only ban own options.
    -- human only work for human, as nightelf only for Nightelf

    -- local categoryMelee = 1 --autodetected
    -- local categoryRanged = 2 --autodetected
    -- local categoryStr = 4
    -- local categoryAgi = 8
    -- local categoryInt = 16
    -- HeroSelector.addUnitCategory('Hpal', categoryStr)
    -- HeroSelector.addUnitCategory('Hamg', categoryInt)
    -- HeroSelector.addUnitCategory('Hblm', categoryInt)
    -- HeroSelector.addUnitCategory('Hmkg', categoryStr)
    -- HeroSelector.addUnitCategory('Ofar', categoryInt)
    -- HeroSelector.addUnitCategory('Oshd', categoryAgi)
    -- HeroSelector.addUnitCategory('Otch', categoryAgi)
    -- HeroSelector.addUnitCategory('Obla', categoryAgi)
    -- HeroSelector.addUnitCategory('Emoo', categoryAgi)
    -- HeroSelector.addUnitCategory('Edem', categoryAgi)
    -- HeroSelector.addUnitCategory('Ekee', categoryInt)
    -- HeroSelector.addUnitCategory('Ewar', categoryAgi)
    -- HeroSelector.addUnitCategory('Udea', categoryStr)
    -- HeroSelector.addUnitCategory('Ulic', categoryInt)
    -- HeroSelector.addUnitCategory('Udre', categoryStr)
    -- HeroSelector.addUnitCategory('Ucrl', categoryStr)

    -- HeroSelector.setUnitCategory('Hgam', categoryInt + categoryRanged)
    -- HeroSelector.setUnitCategory("Eevi", categoryAgi + categoryMelee)

end

function HeroSelector.autoDetectCategory(unitCode)
    if IsUnitIdType(unitCode, UNIT_TYPE_MELEE_ATTACKER) then
        HeroSelector.UnitData[unitCode].Category = 1
    elseif IsUnitIdType(unitCode, UNIT_TYPE_RANGED_ATTACKER) then
        HeroSelector.UnitData[unitCode].Category = 2
    end
    if HeroSelector.CategoryAutoDetectHero and
        IsUnitIdType(unitCode, UNIT_TYPE_HERO) then
        local unit = CreateUnit(Player(bj_PLAYER_NEUTRAL_EXTRA), unitCode, 0, 0,
                                270)
        local primaryAttribute = BlzGetUnitIntegerField(unit,
                                                        UNIT_IF_PRIMARY_ATTRIBUTE)
        RemoveUnit(unit)
        if ConvertHeroAttribute(primaryAttribute) == HERO_ATTRIBUTE_STR then
            HeroSelector.UnitData[unitCode].Category =
                HeroSelector.UnitData[unitCode].Category + 4
        elseif ConvertHeroAttribute(primaryAttribute) == HERO_ATTRIBUTE_AGI then
            HeroSelector.UnitData[unitCode].Category =
                HeroSelector.UnitData[unitCode].Category + 8
        elseif ConvertHeroAttribute(primaryAttribute) == HERO_ATTRIBUTE_INT then
            HeroSelector.UnitData[unitCode].Category =
                HeroSelector.UnitData[unitCode].Category + 16
        end
    end
end

-- what happens to the unit being picked, player is the one having pressed the button
function HeroSelector.unitCreated(player, unitCode, isRandom)
    
    udg_unit_PickedHero = CreateUnit(player, unitCode,
                                GetPlayerStartLocationX(player),
                                GetPlayerStartLocationY(player), 0)

    HeroSelector.enablePick(false, GetOwningPlayer(udg_unit_PickedHero))

    -- if isRandom then
    --     --randomed
    -- else
    --     --picked
    -- end

    -- print(GetPlayerName(player),"picks",GetUnitName(unit))
end

-- happens when the banButton is pressed, player is the one having pressed the button
function HeroSelector.unitBaned(player, unitCode)
    HeroSelector.enableBan(false, player) -- only one ban
    -- print(GetPlayerName(player),"bans",GetObjectName(unitCode))
end

function HeroSelector.buttonSelected(player, unitCode)
    -- player who pressed the button
    -- unitCode the unitCode selected
    -- this is not picked.

    -- print(GetPlayerName(player),"selects",GetObjectName(unitCode))
end

function HeroSelector.repick(unit, player)
    -- UnitRemoveBuffsBJ(bj_REMOVEBUFFS_ALL, unit) -- this is done to undo metamorph
    -- local unitCode = GetUnitTypeId(unit)
    -- if unitCode == 0 then return end

    -- HeroSelector.counterChangeUnitCode(unitCode, -1, player)

    -- if not player then player = GetOwningPlayer(unit) end
    -- HeroSelector.show(true, player)
    -- HeroSelector.enablePick(true, player)
    -- RemoveUnit(unit)
end
-- =====
-- code start
-- =====
BlzLoadTOCFile("war3mapImported\\HeroSelector.toc") -- ex/import also "HeroSelector.fdf"
HeroSelector.HeroButtons = {} -- the clickable Buttons
HeroSelector.UnitData = {} -- all avaiable selections
HeroSelector.UnitDataPool = {} -- all possible random values
HeroSelector.CategoryButton = {}

HeroSelector.Frames = {}
HeroSelector.BanDelayed = {}

function HeroSelector.CategoryClickAction()
    local button = BlzGetTriggerFrame()
    local category = HeroSelector.CategoryButton[button]
    HeroSelector.frameLoseFocus(BlzGetTriggerFrame())
    local player = GetTriggerPlayer()
    local playerData = HeroSelector.Category[player]
    if not playerData then playerData = 0 end
    -- has this category already?
    if BlzBitAnd(playerData, category.Value) ~= 0 then
        -- yes, unable
        playerData = playerData - category.Value
        if GetLocalPlayer() == player then
            BlzFrameSetTexture(category.Icon, category.TextureDisabled, 0, true)
            BlzFrameSetTexture(category.IconPushed, category.TextureDisabled, 0,
                               true)
        end

    else
        if not HeroSelector.CategoryMultiSelect and
            HeroSelector.CategoryButton[player] then
            local lastCategory = HeroSelector.CategoryButton[player]
            BlzFrameSetTexture(lastCategory.Icon, lastCategory.TextureDisabled,
                               0, true)
            BlzFrameSetTexture(lastCategory.IconPushed, lastCategory.Texture, 0,
                               true)
            if playerData ~= 0 then playerData = 0 end
        end

        -- no, enable
        playerData = playerData + category.Value
        if GetLocalPlayer() == player then
            BlzFrameSetTexture(category.Icon, category.Texture, 0, true)
            BlzFrameSetTexture(category.IconPushed, category.Texture, 0, true)
        end
        HeroSelector.CategoryButton[player] = category
    end

    HeroSelector.Category[player] = playerData

    if GetLocalPlayer() == player then
        -- update all buttons
        -- buttons not having at least 1 selected category becomes partly transparent
        for buttonIndex, value in ipairs(HeroSelector.HeroButtons) do
            local button = HeroSelector.HeroButtons[buttonIndex].Frame
            local unitCode = HeroSelector.UnitData[buttonIndex]
            if unitCode and unitCode > 0 then
                if playerData == 0 or
                    BlzBitAnd(HeroSelector.UnitData[unitCode].Category,
                              playerData) > 0 then
                    BlzFrameSetAlpha(button, 255)
                else
                    BlzFrameSetAlpha(button, HeroSelector.CategoryFilteredAlpha)
                end
            end
        end
    end
end

function HeroSelector.getDisabledIcon(icon)
    -- ReplaceableTextures\CommandButtons\BTNHeroPaladin.tga -> ReplaceableTextures\CommandButtonsDisabled\DISBTNHeroPaladin.tga
    if string.sub(icon, 35, 35) ~= "\\" then return icon end -- this string has not enough chars return it
    -- string.len(icon) < 35 then return icon end --this string has not enough chars return it
    local prefix = string.sub(icon, 1, 34)
    local sufix = string.sub(icon, 36)
    return prefix .. "Disabled\\DIS" .. sufix
end

function HeroSelector.updateTooltip(unitCode)
    local tooltipFrame =
        HeroSelector.HeroButtons[HeroSelector.UnitData[unitCode].Index].Tooltip
    local unitData = HeroSelector.UnitData[unitCode]
    if unitData.Count > HeroSelector.UnitCount then
        BlzFrameSetText(tooltipFrame,
                        HeroSelector.TooltipPrefix .. GetObjectName(unitCode) ..
                            "\n|r(" ..
                            GetLocalizedString(HeroSelector.BanTooltip) .. ")")
    else
        if unitData.Count == HeroSelector.UnitCount or
            unitData.InTeam[GetPlayerTeam(GetLocalPlayer())] >=
            HeroSelector.UnitCountPerTeam then
            BlzFrameSetText(tooltipFrame,
                            HeroSelector.TooltipPrefix ..
                                GetObjectName(unitCode) .. "\n|r(" ..
                                GetLocalizedString(HeroSelector.ToManyTooltip) ..
                                ")")
        elseif not HeroSelector.buttonRequirementDone(unitCode, GetLocalPlayer()) then
            BlzFrameSetText(tooltipFrame,
                            HeroSelector.TooltipPrefix ..
                                GetObjectName(unitCode) .. "\n|r(" ..
                                GetLocalizedString(HeroSelector.TooltipRequires) ..
                                ")")
        else
            BlzFrameSetText(tooltipFrame, HeroSelector.TooltipPrefix ..
                                GetObjectName(unitCode))
        end
    end
end

function HeroSelector.addCategory(icon, text)
    if HeroSelector.CategoryHighest then
        HeroSelector.CategoryHighest = HeroSelector.CategoryHighest * 2
    else
        HeroSelector.CategoryHighest = 1
    end

    local newObject = {}
    table.insert(HeroSelector.Category, newObject)
    newObject.Value = HeroSelector.CategoryHighest
    newObject.Texture = icon
    newObject.TextureDisabled = HeroSelector.getDisabledIcon(icon)
    newObject.Text = text

    if HeroSelector.Box then
        local box = HeroSelector.Box
        local lastButton =
            HeroSelector.CategoryButton[#HeroSelector.CategoryButton]
        local button = BlzCreateFrame("HeroSelectorCategoryButton", box, 0, 0)
        local icon = BlzGetFrameByName("HeroSelectorCategoryButtonIcon", 0)
        local iconPushed = BlzGetFrameByName(
                               "HeroSelectorCategoryButtonIconPushed", 0)
        local tooltip = BlzCreateFrame("HeroSelectorText", box, 0, 0)
        BlzFrameSetText(tooltip, GetLocalizedString(text))
        newObject.Text = tooltip -- when this is reached overwritte textframe with the tooltip
        BlzFrameSetTooltip(button, tooltip)
        BlzFrameSetPoint(tooltip, FRAMEPOINT_BOTTOM, button, FRAMEPOINT_TOP, 0,
                         0)
        BlzFrameSetSize(button, 0.02, 0.02)
        BlzFrameSetTexture(icon, newObject.TextureDisabled, 0, true)
        BlzFrameSetTexture(iconPushed, newObject.TextureDisabled, 0, true)
        HeroSelector.CategoryButton[button] = newObject
        TasButtonAction.Set(button, HeroSelector.CategoryClickAction)
        newObject.Icon = icon
        newObject.IconPushed = iconPushed
        newObject.Button = button

        if not lastButton then
            local titleSize = 0.015
            local borderSize = HeroSelector.BorderSize[GetPlayerRace(
                                   GetLocalPlayer())]
            local y = -borderSize - titleSize - 0.01
            local x = borderSize
            BlzFrameSetPoint(button, FRAMEPOINT_TOPLEFT, box,
                             FRAMEPOINT_TOPLEFT, x, y)
        else
            BlzFrameSetPoint(button, FRAMEPOINT_LEFT, lastButton,
                             FRAMEPOINT_RIGHT, 0, 0)
        end
        table.insert(HeroSelector.CategoryButton, button)
        table.insert(HeroSelector.Frames, tooltip)
        table.insert(HeroSelector.Frames, icon)
        table.insert(HeroSelector.Frames, button)
    end
end

function HeroSelector.addUnit(unitCode, onlyRandom, requirement)
    -- no unitCode => empty field
    if not unitCode or unitCode == 0 then
        table.insert(HeroSelector.UnitData, 0)
    else
        -- 'Hpal' -> number?
        if type(unitCode) == "string" then unitCode = FourCC(unitCode) end

        -- Such an object Exist?
        if GetObjectName(unitCode) == "" then
            print(('>I4'):pack(unitCode), "is not an valid Object")
            return
        end

        -- only unique
        if HeroSelector.UnitData[unitCode] then return end
        HeroSelector.UnitDataPool[unitCode] = true -- add to random

        HeroSelector.UnitData[unitCode] = {
            Index = 0,
            Count = 0,
            InTeam = __jarray(0),
            Category = 0,
            Requirment = HeroSelector.convertReq(requirement),
            RequirmentData = requirement
        }
        HeroSelector.autoDetectCategory(unitCode)
        if not onlyRandom then
            table.insert(HeroSelector.UnitData, unitCode)
            HeroSelector.UnitData[unitCode].Index = #HeroSelector.UnitData -- remember the index for the unitCode
        end

    end

end

function HeroSelector.clearUnitData()
    HeroSelector.UnitDataPool = {}
    HeroSelector.UnitData = {}
    HeroSelector.BanDelayed = {}
    HeroSelector.update()
end

function HeroSelector.setFrameText(frame, text, who)
    if HeroSelector.includesPlayer(who, GetLocalPlayer()) then
        BlzFrameSetText(frame, text)
    end
end

function HeroSelector.setTitleText(text, who)
    HeroSelector.setFrameText(HeroSelector.Title, text, who)
end
function HeroSelector.setAcceptButtonText(text, who)
    HeroSelector.setFrameText(HeroSelector.AcceptButton, text, who)
end
function HeroSelector.setBanButtonText(text, who)
    HeroSelector.setFrameText(HeroSelector.BanButton, text, who)
end

function HeroSelector.isPlayerRace(unitCode, player)
    return HeroSelector.UnitData[unitCode].RequirmentData ==
               GetPlayerRace(player)
end
function HeroSelector.IsPlayerForce(unitCode, player)
    return BlzForceHasPlayer(HeroSelector.UnitData[unitCode].RequirmentData,
                             player)
end
function HeroSelector.IsPlayerTeamNr(unitCode, player)
    return HeroSelector.UnitData[unitCode].RequirmentData ==
               GetPlayerTeam(player)
end
function HeroSelector.isPlayer(unitCode, player)
    return HeroSelector.UnitData[unitCode].RequirmentData == player
end
function HeroSelector.HasPlayerTechLevel(unitCode, player)
    return GetPlayerTechCount(player, HeroSelector.UnitData[unitCode]
                                  .RequirmentData[1], true) >=
               HeroSelector.UnitData[unitCode].RequirmentData[2]
end

function HeroSelector.convertReq(who)
    if not who then
        return nil
    elseif type(who) == "number" then
        return HeroSelector.IsPlayerTeamNr
    elseif type(who) == "table" then
        return HeroSelector.HasPlayerTechLevel
    elseif tostring(who):sub(1, 5) == "race:" then
        return HeroSelector.isPlayerRace
    elseif tostring(who):sub(1, 7) == "player:" then
        return HeroSelector.isPlayer
    elseif tostring(who):sub(1, 6) == "force:" then
        return HeroSelector.IsPlayerForce
    end
    return nil
end

function HeroSelector.setUnitReq(unitCode, who)
    if type(unitCode) == "string" then unitCode = FourCC(unitCode) end
    -- Such an object Exist?
    if not HeroSelector.UnitData[unitCode] then return end

    HeroSelector.UnitData[unitCode].RequirmentData = who
    HeroSelector.UnitData[unitCode].Requirment = HeroSelector.convertReq(who)
end
function HeroSelector.setUnitCategory(unitCode, category)
    if type(unitCode) == "string" then unitCode = FourCC(unitCode) end
    -- Such an object Exist?
    if not HeroSelector.UnitData[unitCode] then return end

    HeroSelector.UnitData[unitCode].Category = category
end
function HeroSelector.addUnitCategory(unitCode, category)
    if type(unitCode) == "string" then unitCode = FourCC(unitCode) end
    -- Such an object Exist?
    if not HeroSelector.UnitData[unitCode] then return end

    HeroSelector.UnitData[unitCode].Category = BlzBitOr(category,
                                                        HeroSelector.UnitData[unitCode]
                                                            .Category)
end

function HeroSelector.deselectButtons(buttonIndex)
    if buttonIndex and buttonIndex > 0 then
        if HeroSelector.HeroButtons[GetLocalPlayer()] == buttonIndex then
            BlzFrameSetVisible(HeroSelector.SelectedIndikator, false)
        end
        for index = 0, GetBJMaxPlayers() - 1, 1 do
            if HeroSelector.HeroButtons[Player(index)] == buttonIndex then
                HeroSelector.HeroButtons[Player(index)] = 0
            end
        end
    else
        for index = 0, GetBJMaxPlayers() - 1, 1 do
            HeroSelector.HeroButtons[Player(index)] = 0
        end
        BlzFrameSetVisible(HeroSelector.SelectedIndikator, false)
    end
end

function HeroSelector.buttonRequirementDone(unitCode, player)
    -- true when no requirement is set or the requirment call is successful
    return not HeroSelector.UnitData[unitCode].Requirment or
               HeroSelector.UnitData[unitCode].Requirment(unitCode, player)
end

function HeroSelector.disableButtonIndex(buttonIndex, teamNr)
    if buttonIndex > 0 then
        if HeroSelector.includesPlayer(teamNr, GetLocalPlayer()) then
            BlzFrameSetEnable(HeroSelector.HeroButtons[buttonIndex].Frame, false)
        end
        if HeroSelector.HeroButtons[GetLocalPlayer()] == buttonIndex then
            BlzFrameSetVisible(HeroSelector.SelectedIndikator, false)
        end

        -- deselect this Button from all players or the team
        for index = 0, GetBJMaxPlayers() - 1, 1 do
            local player = Player(index)
            if (not teamNr or teamNr == GetPlayerTeam(player)) and
                HeroSelector.HeroButtons[player] == buttonIndex then
                HeroSelector.HeroButtons[player] = 0
            end
        end
    end
end

function HeroSelector.enableButtonIndex(unitCode, buttonIndex, teamNr)
    if buttonIndex > 0 and
        (not teamNr or teamNr == GetPlayerTeam(GetLocalPlayer())) then
        BlzFrameSetEnable(HeroSelector.HeroButtons[buttonIndex].Frame, true and
                              (HeroSelector.BanIgnoreRequirment and
                                  BlzFrameIsVisible(HeroSelector.BanButton)) or
                              HeroSelector.buttonRequirementDone(unitCode,
                                                                 GetLocalPlayer()))
    end
end

function HeroSelector.counterChangeUnitCode(unitCode, add, player)
    if not HeroSelector.UnitData[unitCode] then
        HeroSelector.UnitData[unitCode] = {Count = 0, InTeam = __jarray(0)}
    end
    local buttonIndex = HeroSelector.UnitData[unitCode].Index
    if not buttonIndex then buttonIndex = 0 end

    local teamNr = GetPlayerTeam(player)

    HeroSelector.UnitData[unitCode].InTeam[teamNr] =
        HeroSelector.UnitData[unitCode].InTeam[teamNr] + add
    HeroSelector.UnitData[unitCode].Count =
        HeroSelector.UnitData[unitCode].Count + add

    if HeroSelector.UnitData[unitCode].Count >= HeroSelector.UnitCount then
        -- disable for all
        HeroSelector.disableButtonIndex(buttonIndex)
    else
        -- enable for all
        HeroSelector.enableButtonIndex(unitCode, buttonIndex)
        if HeroSelector.UnitData[unitCode].InTeam[teamNr] >=
            HeroSelector.UnitCountPerTeam then
            -- disable for this team
            HeroSelector.disableButtonIndex(buttonIndex, teamNr)
        end
    end
    HeroSelector.updateTooltip(unitCode)
end

HeroSelector.rollOptionData = {Count = 0}

function HeroSelector.rollOption(player, includeRandomOnly, excludedIndex,
                                 category)
    if not excludedIndex then excludedIndex = 0 end
    if not category then category = 0 end
    local teamNr = GetPlayerTeam(player)
    HeroSelector.rollOptionData.Count = 0
    for unitCode, value in pairs(HeroSelector.UnitDataPool) do

        local allowed = value
        -- total limited reached?
        if HeroSelector.UnitData[unitCode].Count >= HeroSelector.UnitCount then
            allowed = false
            -- print(GetObjectName(unitCode))
            -- print("rejected total limit")
        end
        -- team limited reached?
        if allowed and HeroSelector.UnitData[unitCode].InTeam[teamNr] >=
            HeroSelector.UnitCountPerTeam then
            -- print(GetObjectName(unitCode))
            -- print("rejected team limit")
            allowed = false
        end
        -- allow randomOnly?
        if allowed and not includeRandomOnly and
            HeroSelector.UnitData[unitCode].Index == 0 then
            -- print(GetObjectName(unitCode))
            -- print("rejected random only")
            allowed = false
        end
        -- this index is excluded? This can make sure you get another button.
        if allowed and HeroSelector.UnitData[unitCode].Index > 0 and
            HeroSelector.UnitData[unitCode].Index == excludedIndex then
            -- print(GetObjectName(unitCode))
            -- print("rejected exclude")
            allowed = false
        end
        -- fullfills the requirement?
        if allowed and not HeroSelector.buttonRequirementDone(unitCode, player) then
            -- print(GetObjectName(unitCode))
            -- print("rejected requirement")
            allowed = false
        end
        -- when having an given an category only allow options having that category atleast partly
        if allowed and category and category > 0 and
            BlzBitAnd(category, HeroSelector.UnitData[unitCode].Category) == 0 then
            -- print(GetObjectName(unitCode))
            -- print("  rejected category", category, HeroSelector.UnitData[unitCode].Category)
            allowed = false
        end

        if allowed then
            HeroSelector.rollOptionData.Count =
                HeroSelector.rollOptionData.Count + 1
            HeroSelector.rollOptionData[HeroSelector.rollOptionData.Count] =
                unitCode
        end
    end
    -- nothing is allwoed?
    if HeroSelector.rollOptionData.Count == 0 then return nil end

    return HeroSelector.rollOptionData[GetRandomInt(1,
                                                    HeroSelector.rollOptionData
                                                        .Count)]
end

function HeroSelector.doRandom(player)
    local category = 0
    if HeroSelector.CategoryAffectRandom then
        category = HeroSelector.Category[player]
    end
    local unitCode = HeroSelector.rollOption(player, true, 0, category)
    if not unitCode then return end

    HeroSelector.counterChangeUnitCode(unitCode, 1, player)
    HeroSelector.unitCreated(player, unitCode, true)
end

function HeroSelector.doPick(player)
    -- pick what currently is selected, returns true on success returns false when something went wrong,
    if not HeroSelector.HeroButtons[player] then return false end
    local buttonIndex = HeroSelector.HeroButtons[player]
    if buttonIndex <= 0 then return false end -- reject nothing selected
    local unitCode = HeroSelector.UnitData[buttonIndex]
    if not HeroSelector.buttonRequirementDone(unitCode, player) then
        return false
    end -- requirment fullfilled

    HeroSelector.counterChangeUnitCode(unitCode, 1, player)
    HeroSelector.unitCreated(player, unitCode)
    return true
end

function HeroSelector.forceRandom(who)
    -- this is a wrapper for doRandom allowing different dataTypes
    if not who then
        for index = 0, GetBJMaxPlayers() - 1, 1 do
            local player = Player(index)
            if GetPlayerSlotState(player) == PLAYER_SLOT_STATE_PLAYING then
                HeroSelector.doRandom(Player(index))
            end
        end
    elseif type(who) == "number" then
        for index = 0, GetBJMaxPlayers() - 1, 1 do
            local player = Player(index)
            if GetPlayerSlotState(player) == PLAYER_SLOT_STATE_PLAYING then
                if GetPlayerTeam(player) == who then
                    HeroSelector.doRandom(player)
                end
            end
        end
    elseif tostring(who):sub(1, 5) == "race:" then
        for index = 0, GetBJMaxPlayers() - 1, 1 do
            local player = Player(index)
            if GetPlayerSlotState(player) == PLAYER_SLOT_STATE_PLAYING then
                if GetPlayerRace(player) == who then
                    HeroSelector.doRandom(player)
                end
            end
        end
    elseif tostring(who):sub(1, 7) == "player:" then
        HeroSelector.doRandom(who)
    elseif tostring(who):sub(1, 6) == "force:" then
        ForForce(who, function() HeroSelector.doRandom(GetEnumPlayer()) end)
    end
end

function HeroSelector.forcePick(who)
    if not who then
        for index = 0, GetBJMaxPlayers() - 1, 1 do
            local player = Player(index)
            if GetPlayerSlotState(player) == PLAYER_SLOT_STATE_PLAYING then
                if not HeroSelector.doPick(player) then -- do picking, when that fails doRandom
                    HeroSelector.doRandom(player)
                end
            end
        end
    elseif type(who) == "number" then
        for index = 0, GetBJMaxPlayers() - 1, 1 do
            local player = Player(index)
            if GetPlayerSlotState(player) == PLAYER_SLOT_STATE_PLAYING then
                if GetPlayerTeam(player) == who then
                    if not HeroSelector.doPick(player) then
                        HeroSelector.doRandom(player)
                    end
                end
            end
        end
    elseif tostring(who):sub(1, 5) == "race:" then
        for index = 0, GetBJMaxPlayers() - 1, 1 do
            local player = Player(index)
            if GetPlayerSlotState(player) == PLAYER_SLOT_STATE_PLAYING then
                if GetPlayerRace(player) == who then
                    if not HeroSelector.doPick(player) then
                        HeroSelector.doRandom(player)
                    end
                end
            end
        end
    elseif tostring(who):sub(1, 7) == "player:" then
        if not HeroSelector.doPick(who) then HeroSelector.doRandom(who) end
    elseif tostring(who):sub(1, 6) == "force:" then
        ForForce(who, function()
            local player = GetEnumPlayer()
            if not HeroSelector.doPick(player) then
                HeroSelector.doRandom(player)
            end
        end)
    end
end

function HeroSelector.includesPlayer(who, player)
    if not who then -- there is no who -> everyone
        return true
    elseif type(who) == "number" and GetPlayerTeam(player) == who then
        return true
    elseif tostring(who):sub(1, 5) == "race:" and GetPlayerRace(player) == who then
        return true
    elseif tostring(who):sub(1, 7) == "player:" and player == who then
        return true
    elseif tostring(who):sub(1, 6) == "force:" and
        BlzForceHasPlayer(who, player) then
        return true
    end
    return false
end

function HeroSelector.enablePick(flag, who)
    for index = #HeroSelector.BanDelayed, 1, -1 do
        local ban = table.remove(HeroSelector.BanDelayed)
        HeroSelector.counterChangeUnitCode(ban[1], HeroSelector.UnitCount + 1,
                                           ban[2])
    end

    if HeroSelector.includesPlayer(who, GetLocalPlayer()) then
        BlzFrameSetVisible(HeroSelector.AcceptButton,
                           true and HeroSelector.AcceptButtonIsShown)
        BlzFrameSetVisible(HeroSelector.RandomButton,
                           true and HeroSelector.RandomButtonIsShown)
        BlzFrameSetVisible(HeroSelector.BanButton, false)
        BlzFrameSetEnable(HeroSelector.AcceptButton, flag)
        BlzFrameSetEnable(HeroSelector.RandomButton, flag)
        BlzFrameSetModel(HeroSelector.SelectedIndikator,
                         HeroSelector.IndicatorPathPick, 0)
        if HeroSelector.BanIgnoreRequirment then HeroSelector.update() end
    end

end

function HeroSelector.enableBan(flag, who)
    if HeroSelector.includesPlayer(who, GetLocalPlayer()) then
        BlzFrameSetVisible(HeroSelector.AcceptButton, false)
        BlzFrameSetVisible(HeroSelector.RandomButton, false)
        BlzFrameSetVisible(HeroSelector.BanButton, true)
        BlzFrameSetEnable(HeroSelector.BanButton, flag)
        BlzFrameSetModel(HeroSelector.SelectedIndikator,
                         HeroSelector.IndicatorPathBan, 0)
        if HeroSelector.BanIgnoreRequirment then HeroSelector.update() end
    end
end

function HeroSelector.destroy()
    for key, value in ipairs(HeroSelector.Frames) do BlzDestroyFrame(value) end
    HeroSelector.Frames = nil
    for key, value in ipairs(HeroSelector.HeroButtons) do
        BlzDestroyFrame(value.Tooltip)
        BlzDestroyFrame(value.Icon)
        BlzDestroyFrame(value.IconDisabled)
        BlzDestroyFrame(value.Frame)
    end
    HeroSelector.HeroButtons = nil

    BlzDestroyFrame(HeroSelector.SelectedIndikator)

    HeroSelector.UnitData = nil
    HeroSelector.BorderSize = nil
    HeroSelector = nil

end

function HeroSelector.frameLoseFocus(frame)
    if BlzFrameGetEnable(frame) then
        BlzFrameSetEnable(frame, false)
        BlzFrameSetEnable(frame, true)
    end
end

function HeroSelector.actionPressHeroButton()
    local button = BlzGetTriggerFrame()
    local player = GetTriggerPlayer()
    local buttonIndex = HeroSelector.HeroButtons[button]
    local unitCode = HeroSelector.UnitData[buttonIndex]
    HeroSelector.HeroButtons[player] = buttonIndex
    if GetLocalPlayer() == player then
        HeroSelector.frameLoseFocus(BlzGetTriggerFrame())
    end
    if GetLocalPlayer() == player then
        BlzFrameSetVisible(HeroSelector.SelectedIndikator, true)

        BlzFrameSetPoint(HeroSelector.SelectedIndikator, FRAMEPOINT_TOPLEFT,
                         button, FRAMEPOINT_TOPLEFT, -0.001, 0.001)
        BlzFrameSetPoint(HeroSelector.SelectedIndikator, FRAMEPOINT_BOTTOMRIGHT,
                         button, FRAMEPOINT_BOTTOMRIGHT, -0.0012, -0.0016)
    end
    HeroSelector.buttonSelected(player, unitCode)
end

function HeroSelector.actionRandomButton()
    local player = GetTriggerPlayer()
    HeroSelector.frameLoseFocus(BlzGetTriggerFrame())
    if HeroSelector.RandomButtonPick then
        HeroSelector.doRandom(player)
    else
        local unitCode = HeroSelector.rollOption(player, false,
                                                 HeroSelector.HeroButtons[player],
                                                 HeroSelector.Category[player])
        if unitCode and GetLocalPlayer() == player then
            local buttonIndex = HeroSelector.UnitData[unitCode].Index
            BlzFrameClick(HeroSelector.HeroButtons[buttonIndex].Frame)
        end
    end
end

function HeroSelector.actionAcceptButton()
    HeroSelector.frameLoseFocus(BlzGetTriggerFrame())
    HeroSelector.doPick(GetTriggerPlayer())
end

function HeroSelector.actionBanButton()
    local player = GetTriggerPlayer()
    HeroSelector.frameLoseFocus(BlzGetTriggerFrame())
    if not HeroSelector.HeroButtons[player] then return end
    local buttonIndex = HeroSelector.HeroButtons[player]
    if buttonIndex <= 0 then return end -- reject nothing selected
    local unitCode = HeroSelector.UnitData[buttonIndex]
    if not HeroSelector.DelayBanUntilPick then
        HeroSelector.counterChangeUnitCode(unitCode, HeroSelector.UnitCount + 1,
                                           player)
    else
        table.insert(HeroSelector.BanDelayed, {unitCode, player})
    end
    HeroSelector.unitBaned(player, unitCode)
end

function HeroSelector.update()
    for buttonIndex, value in ipairs(HeroSelector.HeroButtons) do
        -- have data for this button?

        if HeroSelector.UnitData[buttonIndex] and
            HeroSelector.UnitData[buttonIndex] > 0 then
            if HeroSelector.HideEmptyButtons then
                BlzFrameSetVisible(value.Frame, true)
            end
            local unitCode = HeroSelector.UnitData[buttonIndex]
            if HeroSelector.UnitData[unitCode].Count >= HeroSelector.UnitCount then
                -- disable for all
                HeroSelector.disableButtonIndex(buttonIndex)
            else
                -- enable for all
                HeroSelector.enableButtonIndex(unitCode, buttonIndex)
                for teamNr, inTeamCount in pairs(
                                               HeroSelector.UnitData[unitCode]
                                                   .InTeam) do
                    if HeroSelector.UnitData[unitCode].InTeam[teamNr] >=
                        HeroSelector.UnitCountPerTeam then
                        -- disable for this team
                        HeroSelector.disableButtonIndex(buttonIndex, teamNr)
                    end
                end
            end
            BlzFrameSetTexture(value.Icon, BlzGetAbilityIcon(unitCode), 0,
                               HeroSelector.ButtonBlendAll)
            BlzFrameSetTexture(value.IconPushed, BlzGetAbilityIcon(unitCode), 0,
                               HeroSelector.ButtonBlendAll)
            BlzFrameSetTexture(value.IconDisabled,
                               HeroSelector.getDisabledIcon(
                                   BlzGetAbilityIcon(unitCode)), 0,
                               HeroSelector.ButtonBlendAll)
            -- BlzFrameSetText(value.Tooltip, HeroSelector.TooltipPrefix..GetObjectName(unitCode))
            HeroSelector.updateTooltip(unitCode)

        else
            -- no, make it unclickable and empty
            if HeroSelector.HideEmptyButtons then
                BlzFrameSetVisible(value.Frame, false)
            end
            BlzFrameSetEnable(value.Frame, false)
            BlzFrameSetTexture(value.Icon, HeroSelector.EmptyButtonPath, 0, true)
            BlzFrameSetTexture(value.IconPushed, HeroSelector.EmptyButtonPath,
                               0, true)
            BlzFrameSetTexture(value.IconDisabled, HeroSelector.EmptyButtonPath,
                               0, true)
        end
    end
end

function HeroSelector.showFrame(frame, flag, who)
    if HeroSelector.includesPlayer(who, GetLocalPlayer()) then
        BlzFrameSetVisible(frame, flag)
    end
end

function HeroSelector.show(flag, who)
    HeroSelector.showFrame(HeroSelector.Box, flag, who)
end

do
    local backUp = MarkGameStarted
    function MarkGameStarted()
        backUp()
        backUp = nil
        if HeroSelector.initHeroes then HeroSelector.initHeroes() end

        -- for key, value in ipairs(HeroSelector.UnitData)
        -- do
        --        print(key, ('>I4'):pack(value), GetObjectName(value))
        -- end

        local titleSize = 0.015
        local buttonSize = HeroSelector.ButtonSize
        local borderSize = HeroSelector.BorderSize[GetPlayerRace(
                               GetLocalPlayer())]
        local colCount = HeroSelector.ButtonColCount
        local rowCount = HeroSelector.ButtonRowCount
        local box = BlzCreateFrame(HeroSelector.BoxFrameName,
                                   BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0),
                                   0, 0)
        -- local boxTitle = BlzCreateFrame(HeroSelector.BoxFrameName, box, 0, 0)
        local boxBottom = BlzCreateFrame("HeroSelectorRaceTopBox", box, 0, 0)
        local titel = BlzCreateFrame("HeroSelectorTitle", box, 0, 0)

        HeroSelector.Title = titel
        local indicatorParent = BlzCreateFrameByType("BUTTON",
                                                     "MyHeroIndikatorParent",
                                                     box, "", 0)
        HeroSelector.SelectedIndikator =
            BlzCreateFrameByType("SPRITE", "MyHeroIndikator", indicatorParent,
                                 "", 0)
        BlzFrameSetLevel(indicatorParent, 9)

        BlzFrameSetModel(HeroSelector.SelectedIndikator,
                         HeroSelector.IndicatorPathPick, 0)
        BlzFrameSetScale(HeroSelector.SelectedIndikator, buttonSize / 0.036) -- scale the model to the button size.

        -- BlzFrameSetPoint(boxTitle, FRAMEPOINT_TOPLEFT, box, FRAMEPOINT_TOPLEFT, 0, -(titleSize - 0.003 + 0.9*borderSize))
        -- BlzFrameSetPoint(boxTitle, FRAMEPOINT_BOTTOMRIGHT, box, FRAMEPOINT_TOPRIGHT, 0, - 0.9*borderSize - titleSize - 0.003 -HeroSelector.CategorySize)
        -- BlzFrameSetSize(boxTitle, 0.01, 0.1)
        -- human UI size differs much, needs other numbers
        if GetPlayerRace(GetLocalPlayer()) == RACE_HUMAN then
            BlzFrameSetPoint(boxBottom, FRAMEPOINT_TOPLEFT, box,
                             FRAMEPOINT_TOPLEFT, borderSize * 0.055, -0.9 *
                                 borderSize - titleSize - 0.003 -
                                 HeroSelector.CategorySize)
            BlzFrameSetPoint(boxBottom, FRAMEPOINT_TOPRIGHT, box,
                             FRAMEPOINT_TOPRIGHT, -borderSize * 0.055, -0.9 *
                                 borderSize - titleSize - 0.003 -
                                 HeroSelector.CategorySize)
        else
            BlzFrameSetPoint(boxBottom, FRAMEPOINT_TOPLEFT, box,
                             FRAMEPOINT_TOPLEFT, borderSize * 0.25, -0.9 *
                                 borderSize - titleSize - 0.003 -
                                 HeroSelector.CategorySize)
            BlzFrameSetPoint(boxBottom, FRAMEPOINT_TOPRIGHT, box,
                             FRAMEPOINT_TOPRIGHT, -borderSize * 0.25, -0.9 *
                                 borderSize - titleSize - 0.003 -
                                 HeroSelector.CategorySize)
        end
        BlzFrameSetSize(boxBottom, 0.01, 0.1)

        BlzFrameSetVisible(HeroSelector.SelectedIndikator, false)
        BlzFrameSetAbsPoint(box, HeroSelector.BoxPosPoint, HeroSelector.BoxPosX,
                            HeroSelector.BoxPosY)
        BlzFrameSetSize(box,
                        borderSize * 2 + buttonSize * colCount +
                            HeroSelector.SpaceBetweenX * (colCount - 1),
                        borderSize * 2 + buttonSize * rowCount +
                            HeroSelector.SpaceBetweenY * (rowCount - 1) +
                            titleSize + HeroSelector.CategorySize + 0.0145)
        BlzFrameSetTextAlignment(titel, TEXT_JUSTIFY_MIDDLE, TEXT_JUSTIFY_CENTER)
        BlzFrameSetPoint(titel, FRAMEPOINT_TOP, box, FRAMEPOINT_TOP, 0,
                         -borderSize * 0.6)
        BlzFrameSetSize(titel, BlzFrameGetWidth(box) - borderSize * 2, 0.03)

        BlzFrameSetText(titel, "Hero Selection")

        local rowRemaining = colCount
        if colCount * rowCount < #HeroSelector.UnitData then
            print("FieldCount:", colCount * rowCount, "HeroCount",
                  #HeroSelector.UnitData)
        end
        local y = -borderSize - titleSize - 0.0125 - HeroSelector.CategorySize
        local x = borderSize
        for buttonIndex = 1, colCount * rowCount, 1 do
            local button = BlzCreateFrame("HeroSelectorButton", box, 0,
                                          buttonIndex)
            local icon =
                BlzGetFrameByName("HeroSelectorButtonIcon", buttonIndex)
            local iconPushed = BlzGetFrameByName("HeroSelectorButtonIconPushed",
                                                 buttonIndex)
            local iconDisabled = BlzGetFrameByName(
                                     "HeroSelectorButtonIconDisabled",
                                     buttonIndex)
            local tooltipBox = BlzCreateFrame("HeroSelectorTextBox", box, 0,
                                              buttonIndex)
            local tooltip = BlzCreateFrame("HeroSelectorText", tooltipBox, 0,
                                           buttonIndex)
            BlzFrameSetTooltip(button, tooltipBox)
            if not HeroSelector.TooltipRelativIsBox then
                BlzFrameSetPoint(tooltip, HeroSelector.TooltipPoint, button,
                                 HeroSelector.TooltipRelativePoint,
                                 HeroSelector.TooltipOffsetX,
                                 HeroSelector.TooltipOffsetY)
            else
                BlzFrameSetPoint(tooltip, HeroSelector.TooltipPoint, box,
                                 HeroSelector.TooltipRelativePoint,
                                 HeroSelector.TooltipOffsetX,
                                 HeroSelector.TooltipOffsetY)
            end
            BlzFrameSetPoint(tooltipBox, FRAMEPOINT_BOTTOMLEFT, tooltip,
                             FRAMEPOINT_BOTTOMLEFT, -0.007, -0.007)
            BlzFrameSetPoint(tooltipBox, FRAMEPOINT_TOPRIGHT, tooltip,
                             FRAMEPOINT_TOPRIGHT, 0.007, 0.007)
            TasButtonAction.Set(button, HeroSelector.actionPressHeroButton)
            BlzFrameSetSize(button, buttonSize, buttonSize)

            local heroButton = {}
            HeroSelector.HeroButtons[buttonIndex] = heroButton
            heroButton.Frame = button
            heroButton.Icon = icon
            heroButton.IconPushed = iconPushed
            heroButton.IconDisabled = iconDisabled
            heroButton.Tooltip = tooltip

            HeroSelector.HeroButtons[button] = buttonIndex
            if HeroSelector.ChainedButtons then -- buttons are connected to the previous one or the previous row
                if buttonIndex == 1 then
                    BlzFrameSetPoint(button, FRAMEPOINT_TOPLEFT, box,
                                     FRAMEPOINT_TOPLEFT, borderSize, y)
                elseif rowRemaining <= 0 then
                    BlzFrameSetPoint(button, FRAMEPOINT_TOPLEFT,
                                     HeroSelector.HeroButtons[buttonIndex -
                                         colCount].Frame, FRAMEPOINT_BOTTOMLEFT,
                                     0, -HeroSelector.SpaceBetweenY)
                    rowRemaining = colCount
                else
                    BlzFrameSetPoint(button, FRAMEPOINT_LEFT,
                                     HeroSelector.HeroButtons[buttonIndex - 1]
                                         .Frame, FRAMEPOINT_RIGHT,
                                     HeroSelector.SpaceBetweenX, 0)
                end
            else -- buttons have an offset to the TopLeft of the box
                if rowRemaining <= 0 then
                    x = borderSize
                    rowRemaining = colCount
                    y = y - HeroSelector.SpaceBetweenY - buttonSize
                elseif buttonIndex ~= 1 then
                    x = x + buttonSize + HeroSelector.SpaceBetweenX
                end
                BlzFrameSetPoint(button, FRAMEPOINT_TOPLEFT, box,
                                 FRAMEPOINT_TOPLEFT, x, y)
            end
            rowRemaining = rowRemaining - 1
        end
        local y = -0.9 * borderSize - titleSize - 0.0025
        local x = borderSize * 0.65
        -- create category buttons added before the box was created
        for buttonIndex, value in ipairs(HeroSelector.Category) do
            local button = BlzCreateFrame("HeroSelectorCategoryButton", box, 0,
                                          0)
            local icon = BlzGetFrameByName("HeroSelectorCategoryButtonIcon", 0)
            local iconPushed = BlzGetFrameByName(
                                   "HeroSelectorCategoryButtonIconPushed", 0)
            local tooltipBox = BlzCreateFrame("HeroSelectorTextBox", box, 0,
                                              buttonIndex)
            local tooltip = BlzCreateFrame("HeroSelectorText", tooltipBox, 0,
                                           buttonIndex)
            BlzFrameSetPoint(tooltipBox, FRAMEPOINT_BOTTOMLEFT, tooltip,
                             FRAMEPOINT_BOTTOMLEFT, -0.007, -0.007)
            BlzFrameSetPoint(tooltipBox, FRAMEPOINT_TOPRIGHT, tooltip,
                             FRAMEPOINT_TOPRIGHT, 0.007, 0.007)
            BlzFrameSetText(tooltip, GetLocalizedString(value.Text))
            value.Text = tooltip
            BlzFrameSetPoint(tooltip, FRAMEPOINT_BOTTOM, button, FRAMEPOINT_TOP,
                             0, 0.007)
            BlzFrameSetTooltip(button, tooltipBox)
            BlzFrameSetSize(button, HeroSelector.CategorySize,
                            HeroSelector.CategorySize)
            BlzFrameSetTexture(icon, value.TextureDisabled, 0, true)
            BlzFrameSetTexture(iconPushed, value.TextureDisabled, 0, true)
            HeroSelector.CategoryButton[button] = value
            TasButtonAction.Set(button, HeroSelector.CategoryClickAction)
            value.Icon = icon
            value.IconPushed = iconPushed
            value.Button = button

            local lastButton = HeroSelector.CategoryButton[buttonIndex - 1]
            if not lastButton then
                BlzFrameSetPoint(button, FRAMEPOINT_TOPLEFT, box,
                                 FRAMEPOINT_TOPLEFT, x, y)
            else
                BlzFrameSetPoint(button, FRAMEPOINT_LEFT, lastButton,
                                 FRAMEPOINT_RIGHT, HeroSelector.CategorySpaceX,
                                 0)
            end
            table.insert(HeroSelector.CategoryButton, button)
            table.insert(HeroSelector.Frames, tooltip)
            table.insert(HeroSelector.Frames, icon)
            table.insert(HeroSelector.Frames, button)
        end

        local acceptButton = BlzCreateFrame("HeroSelectorTextButton", box, 0, 0)
        local randomButton = BlzCreateFrame("HeroSelectorTextButton", box, 0, 1)
        local banButton = BlzCreateFrame("HeroSelectorTextButton", box, 0, 2)

        TasButtonAction.Set(acceptButton, HeroSelector.actionAcceptButton)
        TasButtonAction.Set(randomButton, HeroSelector.actionRandomButton)
        TasButtonAction.Set(banButton, HeroSelector.actionBanButton)
        BlzFrameSetSize(acceptButton, HeroSelector.AcceptButtonSizeX,
                        HeroSelector.AcceptButtonSizeY)
        BlzFrameSetSize(randomButton, HeroSelector.RandomButtonSizeX,
                        HeroSelector.RandomButtonSizeY)
        BlzFrameSetSize(banButton, HeroSelector.BanButtonSizeX,
                        HeroSelector.BanButtonSizeY)

        -- OK, READY, ACCEPT
        BlzFrameSetText(acceptButton, HeroSelector.AcceptButtonTextPrefix ..
                            GetLocalizedString(HeroSelector.AcceptButtonText))
        BlzFrameSetText(randomButton, HeroSelector.RandomButtonTextPrefix ..
                            GetLocalizedString(HeroSelector.RandomButtonText))
        BlzFrameSetText(banButton, HeroSelector.BanButtonTextPrefix ..
                            GetLocalizedString(HeroSelector.BanButtonText))
        BlzFrameSetPoint(acceptButton, HeroSelector.AcceptButtonAnchor, box,
                         FRAMEPOINT_BOTTOM, 0, 0)
        BlzFrameSetPoint(randomButton, HeroSelector.RandomButtonAnchor, box,
                         FRAMEPOINT_BOTTOM, 0, 0)
        BlzFrameSetPoint(banButton, FRAMEPOINT_BOTTOM, box, FRAMEPOINT_BOTTOM,
                         0, 0)
        HeroSelector.AcceptButton = acceptButton
        HeroSelector.RandomButton = randomButton
        HeroSelector.BanButton = banButton
        BlzFrameSetVisible(banButton, false)
        BlzFrameSetVisible(acceptButton, HeroSelector.AcceptButtonIsShown)
        BlzFrameSetVisible(randomButton, HeroSelector.RandomButtonIsShown)

        table.insert(HeroSelector.Frames, randomButton)
        table.insert(HeroSelector.Frames, acceptButton)
        table.insert(HeroSelector.Frames, titel)
        table.insert(HeroSelector.Frames, box)
        table.insert(HeroSelector.Frames, banButton)
        table.insert(HeroSelector.Frames, indicatorParent)

        HeroSelector.Box = box
        if not HeroSelector.AutoShow then
            BlzFrameSetVisible(box, false)
        else
            HeroSelector.AutoShow = nil
        end
        HeroSelector.update()
        -- clean of globals
        HeroSelector.BoxPosPoint = nil
        HeroSelector.BoxPosX = nil
        HeroSelector.BoxPosY = nil
        HeroSelector.AcceptButtonTextPrefix = nil
        HeroSelector.RandomButtonTextPrefix = nil
        HeroSelector.BanButtonTextPrefix = nil
        if TeamViewer then TeamViewer.Init() end
        if HeroInfo then HeroInfo.Init() end
    end
end

-- TeamViewer 1.3c
-- Plugin for HeroSelector by Tasyen
-- It shows the selection of Teams in groups
-- Default setup could be suited for 2 team games
TeamViewer = {}

TeamViewer.ShowNonAllies = true -- show non allies
TeamViewer.UpdateNonAllies = false -- update the image of non allies when the select or pick
TeamViewer.Scale = 1.0
-- position when TeamViewer.ShowNonAllies = false or when a TeamPos is not set
TeamViewer.TeamPosX = 0.02
TeamViewer.TeamPosY = 0.5
TeamViewer.TeamPosGapY = 0.015
TeamViewer.TeamPosLeft2Right = true -- (true) button is left and text is right, (false) button is right and text ist left
-- how big are the Faces
TeamViewer.ButtonSize = 0.03
TeamViewer.ButtonAlphaSelected = 150
TeamViewer.ButtonDefaultIcon = "UI\\Widgets\\EscMenu\\Human\\quest-unknown.blp"
TeamViewer.CategoryButtonSize = 0.015 -- size of the CategoryButtons below an players name
TeamViewer.CategoryButtonGap = 0.002 -- space between 2 CategoryButtons

-- used when ShowNonAllies = true
-- warcraft 3 Teams start with 0
TeamViewer.TeamPos = {}
TeamViewer.TeamPos[0] = {}
-- abs positions on the screen
TeamViewer.TeamPos[0].X = 0.02
TeamViewer.TeamPos[0].Y = 0.5
TeamViewer.TeamPos[0].GapY = 0.015
TeamViewer.TeamPos[0].Left2Right = true

TeamViewer.TeamPos[1] = {}
TeamViewer.TeamPos[1].X = 0.75
TeamViewer.TeamPos[1].Y = 0.5
TeamViewer.TeamPos[1].Left2Right = false

TeamViewer.Frames = {} -- this is used to destroy all frames created by TeamViewer.
TeamViewer.HasPicked = {}
TeamViewer.BackupSelected = HeroSelector.buttonSelected
TeamViewer.BackupCreated = HeroSelector.unitCreated
TeamViewer.BackupRepick = HeroSelector.repick
TeamViewer.BackupDestroy = HeroSelector.destroy

function TeamViewer.AllowPlayer(player)
    return GetPlayerSlotState(player) == PLAYER_SLOT_STATE_PLAYING and GetConvertedPlayerId(player) < 12
end

function OppositeFramePoint(framepoint)
    if framepoint == FRAMEPOINT_BOTTOM then
        return FRAMEPOINT_TOP
    elseif framepoint == FRAMEPOINT_TOP then
        return FRAMEPOINT_BOTTOM
    elseif framepoint == FRAMEPOINT_TOPLEFT then
        return FRAMEPOINT_BOTTOMRIGHT
    elseif framepoint == FRAMEPOINT_TOPRIGHT then
        return FRAMEPOINT_BOTTOMLEFT
    elseif framepoint == FRAMEPOINT_LEFT then
        return FRAMEPOINT_RIGHT
    elseif framepoint == FRAMEPOINT_RIGHT then
        return FRAMEPOINT_LEFT
    elseif framepoint == FRAMEPOINT_CENTER then
        return FRAMEPOINT_CENTER
    elseif framepoint == FRAMEPOINT_BOTTOMLEFT then
        return FRAMEPOINT_TOPRIGHT
    elseif framepoint == FRAMEPOINT_BOTTOMRIGHT then
        return FRAMEPOINT_TOPLEFT
    else
        return framepoint
    end
end

function HeroSelector.destroy()
    for key, value in pairs(TeamViewer.Frames) do BlzDestroyFrame(value) end
    TeamViewer.BackupDestroy()
    TeamViewer = nil
end

function TeamViewer.PosFirstFrame(movingFrame, relativFrame, left2Right)
    if left2Right then
        -- BlzFrameSetPoint(movingFrame, FRAMEPOINT_TOPLEFT, relativFrame, FRAMEPOINT_BOTTOMRIGHT, 0, 0)
        BlzFrameSetPoint(movingFrame, FRAMEPOINT_TOPLEFT, relativFrame,
                         FRAMEPOINT_BOTTOMLEFT, 0, 0)
    else
        BlzFrameSetPoint(movingFrame, FRAMEPOINT_TOPRIGHT, relativFrame,
                         FRAMEPOINT_BOTTOMRIGHT, 0, 0)
    end
end

function TeamViewer.PosFrame(movingFrame, relativFrame, left2Right)
    if left2Right then
        BlzFrameSetPoint(movingFrame, FRAMEPOINT_TOPLEFT, relativFrame,
                         FRAMEPOINT_TOPRIGHT, TeamViewer.CategoryButtonGap, 0)
    else
        BlzFrameSetPoint(movingFrame, FRAMEPOINT_TOPRIGHT, relativFrame,
                         FRAMEPOINT_TOPLEFT, -TeamViewer.CategoryButtonGap, 0)
    end
end

function TeamViewer.Init()
    local function buttonActionFunc(frame)
        HeroSelector.frameLoseFocus(frame)
        TeamViewer.ButtonClicked(GetTriggerPlayer(), TeamViewer[frame])
    end

    for index = 0, GetBJMaxPlayers() - 1, 1 do
        local player = Player(index)
        if TeamViewer.AllowPlayer(player) then
            local teamNr = GetPlayerTeam(player)
            if not TeamViewer[teamNr] then TeamViewer[teamNr] = {} end
            table.insert(TeamViewer[teamNr], player)

            local createContext = 1000 + index
            -- local playerFrame = BlzCreateFrameByType("FRAME", "TeamViewerPlayerFrame", HeroSelector.Box, "", createContext)
            local playerFrame = BlzCreateFrame("HeroSelectorTextBox",
                                               HeroSelector.Box, 0,
                                               createContext)
            local colorFrame = BlzCreateFrameByType("BACKDROP", "", playerFrame,
                                                    "", createContext)
            local button = BlzCreateFrame("HeroSelectorButton", playerFrame, 0,
                                          createContext)
            local textFrame = BlzCreateFrame("HeroSelectorText", playerFrame, 0,
                                             createContext) -- do not the buttons child, else it is affected by Alpha change
            local icon = BlzGetFrameByName("HeroSelectorButtonIcon",
                                           createContext)
            local iconPushed = BlzGetFrameByName("HeroSelectorButtonIconPushed",
                                                 createContext)
            local iconDisabled = BlzGetFrameByName(
                                     "HeroSelectorButtonIconDisabled",
                                     createContext)
            local tooltipBox = BlzCreateFrame("HeroSelectorTextBox", button, 0,
                                              createContext)
            local tooltip = BlzCreateFrame("HeroSelectorText", tooltipBox, 0,
                                           createContext)
            local left2Right = nil
            TasButtonAction.Set(button, buttonActionFunc)
            BlzFrameSetSize(playerFrame, 0.11 + TeamViewer.ButtonSize,
                            TeamViewer.ButtonSize +
                                TeamViewer.CategoryButtonSize + 0.001)
            BlzFrameSetPoint(colorFrame, FRAMEPOINT_TOPLEFT, playerFrame,
                             FRAMEPOINT_TOPLEFT, 0.005, -0.0035)
            BlzFrameSetPoint(colorFrame, FRAMEPOINT_TOPRIGHT, playerFrame,
                             FRAMEPOINT_TOPRIGHT, -0.005, -0.0035)
            BlzFrameSetSize(colorFrame, 0, 0.003)

            local colorIndex = GetHandleId(GetPlayerColor(player))
            if colorIndex < 10 then
                BlzFrameSetTexture(colorFrame,
                                   "ReplaceableTextures\\TeamColor\\TeamColor0" ..
                                       colorIndex, 0, false)
            else
                BlzFrameSetTexture(colorFrame,
                                   "ReplaceableTextures\\TeamColor\\TeamColor" ..
                                       colorIndex, 0, false)
            end

            if TeamViewer.ShowNonAllies and TeamViewer.TeamPos[teamNr] then
                left2Right = TeamViewer.TeamPos[teamNr].Left2Right
            else
                left2Right = TeamViewer.TeamPosLeft2Right
            end
            BlzFrameSetSize(button, TeamViewer.ButtonSize, TeamViewer.ButtonSize)
            BlzFrameSetSize(textFrame, 0.105 - TeamViewer.ButtonSize, 0.013)
            if #TeamViewer[teamNr] == 1 then
                if TeamViewer.ShowNonAllies and TeamViewer.TeamPos[teamNr] then
                    BlzFrameSetAbsPoint(button, FRAMEPOINT_BOTTOMLEFT,
                                        TeamViewer.TeamPos[teamNr].X,
                                        TeamViewer.TeamPos[teamNr].Y)
                else
                    BlzFrameSetAbsPoint(button, FRAMEPOINT_BOTTOMLEFT,
                                        TeamViewer.TeamPosX, TeamViewer.TeamPosY)
                end
            else
                local prevTeamPlayer = TeamViewer[teamNr][#TeamViewer[teamNr] -
                                           1]

                if TeamViewer.TeamPos[teamNr].GapY then
                    BlzFrameSetPoint(button, FRAMEPOINT_TOPLEFT,
                                     TeamViewer[prevTeamPlayer].Button,
                                     FRAMEPOINT_BOTTOMLEFT, 0,
                                     -TeamViewer.TeamPos[teamNr].GapY)
                else
                    BlzFrameSetPoint(button, FRAMEPOINT_TOPLEFT,
                                     TeamViewer[prevTeamPlayer].Button,
                                     FRAMEPOINT_BOTTOMLEFT, 0,
                                     -TeamViewer.TeamPosGapY)
                end
            end
            TeamViewer.PosFrame(textFrame, button, left2Right)
            if left2Right then
                BlzFrameSetPoint(tooltip, FRAMEPOINT_BOTTOMLEFT, button,
                                 FRAMEPOINT_TOPLEFT, 0, 0.007)
                BlzFrameSetPoint(playerFrame, FRAMEPOINT_TOPLEFT, button,
                                 FRAMEPOINT_TOPLEFT, -0.007, 0.007)
            else
                BlzFrameSetPoint(tooltip, FRAMEPOINT_BOTTOMRIGHT, button,
                                 FRAMEPOINT_TOPRIGHT, 0, 0.007)
                BlzFrameSetPoint(playerFrame, FRAMEPOINT_TOPRIGHT, button,
                                 FRAMEPOINT_TOPRIGHT, 0.007, 0.007)
                BlzFrameSetTextAlignment(textFrame, TEXT_JUSTIFY_TOP,
                                         TEXT_JUSTIFY_RIGHT)
            end
            BlzFrameSetPoint(tooltipBox, FRAMEPOINT_BOTTOMLEFT, tooltip,
                             FRAMEPOINT_BOTTOMLEFT, -0.007, -0.007)
            BlzFrameSetPoint(tooltipBox, FRAMEPOINT_TOPRIGHT, tooltip,
                             FRAMEPOINT_TOPRIGHT, 0.007, 0.007)
            BlzFrameSetText(textFrame, GetPlayerName(player))
            BlzFrameSetTooltip(button, tooltipBox)
            BlzFrameSetTexture(icon, TeamViewer.ButtonDefaultIcon, 0, true)
            BlzFrameSetTexture(iconPushed, TeamViewer.ButtonDefaultIcon, 0, true)
            table.insert(TeamViewer.Frames, button)
            table.insert(TeamViewer.Frames, textFrame)
            table.insert(TeamViewer.Frames, icon)
            table.insert(TeamViewer.Frames, iconDisabled)
            table.insert(TeamViewer.Frames, iconPushed)
            table.insert(TeamViewer.Frames, tooltip)
            table.insert(TeamViewer.Frames, playerFrame)

            TeamViewer[player] = {}
            TeamViewer[player].PlayerFrame = playerFrame
            TeamViewer[player].Text = textFrame
            TeamViewer[player].Button = button
            TeamViewer[button] = player
            TeamViewer[player].Icon = icon
            TeamViewer[player].IconPushed = iconPushed
            TeamViewer[player].IconDisabled = iconDisabled
            TeamViewer[player].Tooltip = tooltip
            TeamViewer[player].Category = {}
            local prevCategoryButton = nil
            -- print("Pre HeroSelector.Category")
            for key, value in ipairs(HeroSelector.Category) do
                -- print("Index",key)
                local categoryButton = {}
                categoryButton.Button = BlzCreateFrameByType("BUTTON", "",
                                                             playerFrame, "", 0)
                categoryButton.Icon = BlzCreateFrameByType("BACKDROP", "",
                                                           categoryButton.Button,
                                                           "", 0)
                categoryButton.TooltipBox = BlzCreateFrame(
                                                "HeroSelectorTextBox",
                                                categoryButton.Button, 0,
                                                createContext)
                categoryButton.Tooltip =
                    BlzCreateFrame("HeroSelectorText",
                                   categoryButton.TooltipBox, 0, key)
                BlzFrameSetPoint(categoryButton.TooltipBox,
                                 FRAMEPOINT_BOTTOMLEFT, categoryButton.Tooltip,
                                 FRAMEPOINT_BOTTOMLEFT, -0.007, -0.007)
                BlzFrameSetPoint(categoryButton.TooltipBox, FRAMEPOINT_TOPRIGHT,
                                 categoryButton.Tooltip, FRAMEPOINT_TOPRIGHT,
                                 0.007, 0.007)
                BlzFrameSetText(categoryButton.Tooltip,
                                BlzFrameGetText(value.Text))
                BlzFrameSetTooltip(categoryButton.Button,
                                   categoryButton.TooltipBox)
                BlzFrameSetAllPoints(categoryButton.Icon, categoryButton.Button)
                BlzFrameSetPoint(categoryButton.Tooltip, FRAMEPOINT_BOTTOM,
                                 categoryButton.Button, FRAMEPOINT_TOP, 0, 0.007)
                BlzFrameSetSize(categoryButton.Button, 0.015, 0.015)
                BlzFrameSetTexture(categoryButton.Icon, value.Texture, 0, true)
                BlzFrameSetVisible(categoryButton.Button, false)

                table.insert(TeamViewer[player].Category, categoryButton)
                table.insert(TeamViewer.Frames, categoryButton.Button)
                table.insert(TeamViewer.Frames, categoryButton.Icon)
                table.insert(TeamViewer.Frames, categoryButton.Tooltip)

            end

            BlzFrameSetScale(playerFrame, TeamViewer.Scale)
            -- When showning only allies, hide non allies
            if not TeamViewer.ShowNonAllies and
                not IsPlayerAlly(player, GetLocalPlayer()) then
                BlzFrameSetVisible(playerFrame, false)
            end
        end
    end
end

function TeamViewer.ButtonClicked(clickingPlayer, targetPlayer)
    print(GetPlayerName(clickingPlayer), "Clicked", GetPlayerName(targetPlayer))
end

function HeroSelector.buttonSelected(player, unitCode)

    TeamViewer.BackupSelected(player, unitCode)

    if not TeamViewer.HasPicked[player] then
        local teamNr = GetPlayerTeam(player)
        if TeamViewer.UpdateNonAllies or IsPlayerAlly(GetLocalPlayer(), player) then
            BlzFrameSetText(TeamViewer[player].Tooltip, GetObjectName(unitCode))
            BlzFrameSetTexture(TeamViewer[player].Icon,
                               BlzGetAbilityIcon(unitCode), 0, true)
            BlzFrameSetTexture(TeamViewer[player].IconPushed,
                               BlzGetAbilityIcon(unitCode), 0, true)
            BlzFrameSetAlpha(TeamViewer[player].Button,
                             TeamViewer.ButtonAlphaSelected)
            local category = 1
            local prevCategoryButton = nil
            local left2Right = nil
            if TeamViewer.ShowNonAllies and TeamViewer.TeamPos[teamNr] then
                left2Right = TeamViewer.TeamPos[teamNr].Left2Right
            else
                left2Right = TeamViewer.TeamPosLeft2Right
            end
            for key, value in ipairs(HeroSelector.Category) do
                local categoryButton = TeamViewer[player].Category[key]
                BlzFrameClearAllPoints(categoryButton.Button)
                if BlzBitAnd(category, HeroSelector.UnitData[unitCode].Category) >
                    0 then

                    BlzFrameSetVisible(categoryButton.Button, true)

                    if TeamViewer.ShowNonAllies and TeamViewer.TeamPos[teamNr] then
                        if not prevCategoryButton then
                            -- TeamViewer.PosFirstFrame(categoryButton.Button, TeamViewer[player].Button, left2Right)
                            TeamViewer.PosFirstFrame(categoryButton.Button,
                                                     TeamViewer[player].Text,
                                                     left2Right)
                            -- TeamViewer[player].Text
                        else
                            TeamViewer.PosFrame(categoryButton.Button,
                                                prevCategoryButton, left2Right)
                        end
                    else
                        if not prevCategoryButton then
                            TeamViewer.PosFirstFrame(categoryButton.Button,
                                                     TeamViewer[player].Button,
                                                     left2Right)
                        else
                            TeamViewer.PosFrame(categoryButton.Button,
                                                prevCategoryButton, left2Right)
                        end
                    end

                    prevCategoryButton = categoryButton.Button
                else
                    BlzFrameSetVisible(categoryButton.Button, false)
                end
                category = category + category
            end
        end
    end
end

function HeroSelector.unitCreated(player, unitCode, isRandom)
    TeamViewer.BackupCreated(player, unitCode, isRandom)
    if TeamViewer.UpdateNonAllies or IsPlayerAlly(GetLocalPlayer(), player) then
        BlzFrameSetText(TeamViewer[player].Tooltip, GetObjectName(unitCode))
        BlzFrameSetTexture(TeamViewer[player].Icon, BlzGetAbilityIcon(unitCode),
                           0, true)
        BlzFrameSetTexture(TeamViewer[player].IconPushed,
                           BlzGetAbilityIcon(unitCode), 0, true)
        BlzFrameSetAlpha(TeamViewer[player].Button, 255)
    end
    TeamViewer.HasPicked[player] = true
end

function HeroSelector.repick(unit, player)
    TeamViewer.BackupRepick(unit, player)
    if not player then player = GetOwningPlayer(unit) end
    if TeamViewer.UpdateNonAllies or IsPlayerAlly(GetLocalPlayer(), player) then
        BlzFrameSetText(TeamViewer[player].Tooltip, "")
        BlzFrameSetTexture(TeamViewer[player].Icon,
                           TeamViewer.ButtonDefaultIcon, 0, true)
        BlzFrameSetTexture(TeamViewer[player].IconPushed,
                           TeamViewer.ButtonDefaultIcon, 0, true)
        BlzFrameSetAlpha(TeamViewer[player].Button, 255)
    end
    TeamViewer.HasPicked[player] = false
end

--HeroInfo 1.2
--Plugin for HeroInfo by Tasyen
--This Creates a TextArea which displays the name, the Extended tooltip of selected units and can show some of their skills.

HeroInfo = {}
-- TextArea
HeroInfo.DescHeroNamePrefix     = "|cffffcc00"   --added before the Units Name
HeroInfo.DescHeroNameSufix      = "|r"           --added after the units Name
HeroInfo.TextAreaSizeX          = 0.2
HeroInfo.TextAreaSizeY          = 0.2
HeroInfo.TextAreaOffsetX        = 0
HeroInfo.TextAreaOffsetY        = 0
HeroInfo.TextAreaPoint          = FRAMEPOINT_TOPLEFT --pos the Tooltip with which Point
HeroInfo.TextAreaRelativePoint  = FRAMEPOINT_TOPRIGHT --pos the Tooltip to which Point of the Relative
HeroInfo.TextAreaRelativeGame   = false --(false) relativ to box, (true) relativ to GameUI
HeroInfo.BackupSelected         = HeroSelector.buttonSelected
HeroInfo.BackupDestroy          = HeroSelector.destroy
-- Skill Priview
HeroInfo.MaxButtonCount         = 7 -- max amount of preview skills
HeroInfo.ButtonPerRow           = 7
HeroInfo.DetectUnitSkills       = true -- (true) creates a dummy (for neutral Passive) when selecting an option to find any skill this unitCode has on default and displays them in the preview
HeroInfo.ButtonSizeX            = 0.03
HeroInfo.ButtonSizeY            = 0.03
HeroInfo.ToolTipSize            = 0.2 -- how big is one line in the tooltip
HeroInfo.ToolTipFixedPos        = true -- (true) All tooltip's starts over the first Button

-- feed HeroInfo with skills units will preview.
HeroInfo.HeroData = {
    -- unitCode = "skillA,Skillb,SkillC..."
    -- get skill list from object editor:  hold shift then open the hero/unit skill field now copy paste the content
    Hpal = "AHhb,AHds,AHre,AHad"
    ,Hamg = "AHbz,AHab,AHwe,AHmt"
    ,Hmkg = "AHtc,AHtb,AHbh,AHav"
    ,Hblm = "AHfs,AHbn,AHdr,AHpx"
    ,Obla = "AOwk,AOcr,AOmi,AOww"
    ,Ofar = "AOfs,AOsf,AOcl,AOeq"
    ,Otch = "AOsh,AOae,AOre,AOws"
    ,Oshd = "AOhw,AOhx,AOsw,AOvd"
    ,Udea = "AUdc,AUdp,AUau,AUan"
    ,Ulic = "AUfn,AUfu,AUdr,AUdd"
    ,Udre = "AUav,AUsl,AUcs,AUin"
    ,Ucrl = "AUim,AUts,AUcb,AUls"
    ,Ekee = "AEer,AEfn,AEah,AEtq"
    ,Emoo = "AHfa,AEst,AEar,AEsf"
    ,Edem = "AEmb,AEim,AEev,AEme"
    ,Ewar = "AEbl,AEfk,AEsh,AEsv"
}

HeroInfo.Buttons = {}
HeroInfo.ButtonCurrentIndex = 0
-- taken from Prometheus3375
-- converts an objectId into it's string equl x -> "hfoo"
function GetFourCC(num)
    return string.pack(">I4", num)
end

function HeroSelector.destroy()
    BlzDestroyFrame(HeroInfo.TextArea)
    for index = 1, HeroInfo.MaxButtonCount do
        BlzDestroyFrame(HeroInfo.Buttons[index].Tooltip)
        BlzDestroyFrame(HeroInfo.Buttons[index].Icon)
        BlzDestroyFrame(HeroInfo.Buttons[index].IconPushed)
        BlzDestroyFrame(HeroInfo.Buttons[index].IconOff)
        BlzDestroyFrame(HeroInfo.Buttons[index].TooltipBox)
        BlzDestroyFrame(HeroInfo.Buttons[index].Button)        
    end
    HeroInfo.BackupDestroy()
    HeroInfo = nil
end

function HeroInfo.Init()
    
    HeroInfo.TextArea = BlzCreateFrame("HeroSelectorTextArea", HeroSelector.Box, 0, 0)    
    BlzFrameSetSize(HeroInfo.TextArea , HeroInfo.TextAreaSizeX, HeroInfo.TextAreaSizeY)
    if not HeroInfo.TextAreaRelativeGame then
        BlzFrameSetPoint(HeroInfo.TextArea, HeroInfo.TextAreaPoint, HeroSelector.Box, HeroInfo.TextAreaRelativePoint, HeroInfo.TextAreaOffsetX, HeroInfo.TextAreaOffsetY)
    else
        BlzFrameSetPoint(HeroInfo.TextArea, HeroInfo.TextAreaPoint, BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0), HeroInfo.TextAreaRelativePoint, HeroInfo.TextAreaOffsetX, HeroInfo.TextAreaOffsetY)
    end
    local this, col
    local col = 0
    for index = 1, HeroInfo.MaxButtonCount do
        HeroInfo.Buttons[index] = {}
        this = HeroInfo.Buttons[index]
        this.Button = BlzCreateFrame("HeroSelectorButton", HeroInfo.TextArea, 0, 0)
        this.Icon = BlzGetFrameByName("HeroSelectorButtonIcon", 0)
        this.IconPushed = BlzGetFrameByName("HeroSelectorButtonIconPushed", 0)
        this.IconOff = BlzGetFrameByName("HeroSelectorButtonIconDisabled", 0)
        this.TooltipBox = BlzCreateFrame("HeroSelectorTextBox", this.Button, 0, 0)
        this.Tooltip = BlzCreateFrame("HeroSelectorText", this.TooltipBox, 0, 0)
        BlzFrameSetSize(this.Button, HeroInfo.ButtonSizeX, HeroInfo.ButtonSizeY)
        if HeroInfo.ToolTipFixedPos then
            BlzFrameSetPoint(this.Tooltip, FRAMEPOINT_BOTTOMLEFT, HeroInfo.Buttons[1].Button, FRAMEPOINT_TOPLEFT, 0, 0.007)
        else
            BlzFrameSetPoint(this.Tooltip, FRAMEPOINT_BOTTOMLEFT, this.Button, FRAMEPOINT_TOPLEFT, 0, 0.007)
        end
        BlzFrameSetPoint(this.TooltipBox, FRAMEPOINT_BOTTOMLEFT, this.Tooltip, FRAMEPOINT_BOTTOMLEFT, -0.007, -0.007)
        BlzFrameSetPoint(this.TooltipBox, FRAMEPOINT_TOPRIGHT, this.Tooltip, FRAMEPOINT_TOPRIGHT, 0.007, 0.007)
        BlzFrameSetTooltip(this.Button, this.TooltipBox)
        BlzFrameSetSize(this.Tooltip, HeroInfo.ToolTipSize, 0)
        if index > 1 then
            
            col = col + 1
            if col >= HeroInfo.ButtonPerRow then
                col = 0
                BlzFrameSetPoint(this.Button, FRAMEPOINT_TOPLEFT, HeroInfo.Buttons[index - HeroInfo.ButtonPerRow].Button, FRAMEPOINT_BOTTOMLEFT, 0.00, -0.004)
            else
                BlzFrameSetPoint(this.Button, FRAMEPOINT_TOPLEFT, HeroInfo.Buttons[index - 1].Button, FRAMEPOINT_TOPRIGHT, 0.004, 0)
            end
        else
            BlzFrameSetPoint(this.Button, FRAMEPOINT_TOPLEFT, HeroInfo.TextArea, FRAMEPOINT_BOTTOMLEFT, 0.002, 0)
        end
        
        BlzFrameSetEnable(this.Button, false)
        BlzFrameSetVisible(this.Button, false)
    end
end

function HeroInfo.UpdateSkillPreivew(icon, name, text)

    HeroInfo.ButtonCurrentIndex = HeroInfo.ButtonCurrentIndex + 1
    local object = HeroInfo.Buttons[HeroInfo.ButtonCurrentIndex]
    if not object then return end

    BlzFrameSetVisible(object.Button, true)

    BlzFrameSetTexture(object.Icon, icon, 0, false)
    BlzFrameSetTexture(object.IconPushed, icon, 0, false)
    BlzFrameSetTexture(object.IconOff, HeroSelector.getDisabledIcon(icon), 0, false)
    BlzFrameSetTexture(object.IconOff, icon, 0, false)

    -- x Size and no y Size makes it multiline text when the text does not fit into 1 line

    if text and name then
        BlzFrameSetSize(object.Tooltip, HeroInfo.ToolTipSize, 0)
        BlzFrameSetText(object.Tooltip, name.."\n"..text)
    else
        -- only the name, set frameSize to 0/0 to match the displayed text
        BlzFrameSetSize(object.Tooltip, 0, 0)
        BlzFrameSetText(object.Tooltip, name)
    end
end

function HeroSelector.ValidTooltip(text)
    if text == "Tool tip missing!" or text == "" and text == " " then
        return false
    end
    return true
end

function HeroSelector.abiFilter(abi)
    -- no skills markes as item skills
    if BlzGetAbilityBooleanField(abi, ABILITY_BF_ITEM_ABILITY) then
        return false
    end

    if not HeroSelector.ValidTooltip(BlzGetAbilityStringLevelField(abi, ABILITY_SLF_TOOLTIP_NORMAL, 0)) then
        return false
    end
    text = nil
    return true
end

function HeroSelector.buttonSelected(player, unitCode)
    HeroInfo.BackupSelected(player, unitCode)
    local dummyUnit 
    if HeroInfo.DetectUnitSkills then
        dummyUnit = CreateUnit(Player(GetPlayerNeutralPassive()), unitCode, 0, 0, 0)
    end

    -- Reset the global button Index
    HeroInfo.ButtonCurrentIndex = 0

    if GetLocalPlayer() == player then
        BlzFrameSetText(HeroInfo.TextArea, HeroInfo.DescHeroNamePrefix .. GetObjectName(unitCode).. HeroInfo.DescHeroNameSufix)
        BlzFrameAddText(HeroInfo.TextArea, BlzGetAbilityExtendedTooltip(unitCode,0))

        if not HeroInfo.HeroData[unitCode] and HeroInfo.HeroData[GetFourCC(unitCode)] then
            -- user did a none number setup
            unitCode = GetFourCC(unitCode)
        end
        
        if HeroInfo.HeroData[unitCode] then
            local startIndex = 1
            while startIndex + 3 <= string.len(HeroInfo.HeroData[unitCode])  do
                local skillCode = string.sub(HeroInfo.HeroData[unitCode], startIndex, startIndex + 3)
                
                startIndex = startIndex + 5
                skillCode = FourCC(skillCode)
                
                -- for hero skills show the learn text, "Tool tip missing!" is the default string
                if HeroSelector.ValidTooltip(BlzGetAbilityResearchExtendedTooltip(skillCode, 0)) then
                    HeroInfo.UpdateSkillPreivew(BlzGetAbilityIcon(skillCode), GetObjectName(skillCode), BlzGetAbilityResearchExtendedTooltip(skillCode, 0) )
                elseif HeroSelector.ValidTooltip(BlzGetAbilityExtendedTooltip(skillCode, 0)) then
                    -- skills without a research text show the first Level
                    HeroInfo.UpdateSkillPreivew(BlzGetAbilityIcon(skillCode), GetObjectName(skillCode), BlzGetAbilityExtendedTooltip(skillCode, 0) )
                else
                    HeroInfo.UpdateSkillPreivew(BlzGetAbilityIcon(skillCode), GetObjectName(skillCode))                    
                end
            end
        end

        if HeroInfo.DetectUnitSkills then
            local abi, abiIndex
            abiIndex = 0
            while (true) do
                abi = BlzGetUnitAbilityByIndex(dummyUnit, abiIndex)
                if abi then
                    if HeroSelector.abiFilter(abi) then
                        if HeroSelector.ValidTooltip(BlzGetAbilityStringLevelField(abi, ABILITY_SLF_TOOLTIP_LEARN_EXTENDED, 0)) then
                            HeroInfo.UpdateSkillPreivew(BlzGetAbilityStringLevelField(abi, ABILITY_SLF_ICON_NORMAL, 0), BlzGetAbilityStringLevelField(abi, ABILITY_SLF_TOOLTIP_NORMAL, 0), BlzGetAbilityStringLevelField(abi, ABILITY_SLF_TOOLTIP_LEARN_EXTENDED, 0))
                        else
                            HeroInfo.UpdateSkillPreivew(BlzGetAbilityStringLevelField(abi, ABILITY_SLF_ICON_NORMAL, 0), BlzGetAbilityStringLevelField(abi, ABILITY_SLF_TOOLTIP_NORMAL, 0), BlzGetAbilityStringLevelField(abi, ABILITY_SLF_TOOLTIP_NORMAL_EXTENDED, 0))
                        end
                    end
                    abiIndex = abiIndex + 1
                else
                    break
                end
            end
        end

        for index = HeroInfo.ButtonCurrentIndex + 1, HeroInfo.MaxButtonCount do
            BlzFrameSetVisible(HeroInfo.Buttons[index].Button, false)
        end
    end

    if HeroInfo.DetectUnitSkills then
        RemoveUnit(dummyUnit)
        dummyUnit = nil
    end
end
function InitSounds()
    gg_snd_PurgeTarget1 = CreateSound("Abilities/Spells/Orc/Purge/PurgeTarget1.flac", false, true, true, 0, 0, "SpellsEAX")
    SetSoundParamsFromLabel(gg_snd_PurgeTarget1, "Purge")
    SetSoundDuration(gg_snd_PurgeTarget1, 2095)
    SetSoundVolume(gg_snd_PurgeTarget1, 127)
    gg_snd_BattleNetTick = CreateSound("Sound/Interface/BattleNetTick.flac", false, false, false, 0, 0, "DefaultEAXON")
    SetSoundParamsFromLabel(gg_snd_BattleNetTick, "ChatroomTimerTick")
    SetSoundDuration(gg_snd_BattleNetTick, 657)
    SetSoundVolume(gg_snd_BattleNetTick, 80)
    gg_snd_CreepAggroWhat1 = CreateSound("Sound/Interface/CreepAggroWhat1.flac", false, false, false, 0, 0, "DefaultEAXON")
    SetSoundParamsFromLabel(gg_snd_CreepAggroWhat1, "CreepAggro")
    SetSoundDuration(gg_snd_CreepAggroWhat1, 1784)
    SetSoundVolume(gg_snd_CreepAggroWhat1, 127)
    gg_snd_Error = CreateSound("Sound/Interface/Error.flac", false, false, false, 0, 0, "DefaultEAXON")
    SetSoundParamsFromLabel(gg_snd_Error, "InterfaceError")
    SetSoundDuration(gg_snd_Error, 614)
    SetSoundVolume(gg_snd_Error, 127)
    gg_snd_MapPing = CreateSound("Sound/Interface/MapPing.flac", false, false, false, 0, 0, "DefaultEAXON")
    SetSoundParamsFromLabel(gg_snd_MapPing, "MapPing")
    SetSoundDuration(gg_snd_MapPing, 2845)
    SetSoundVolume(gg_snd_MapPing, 127)
    gg_snd_Warning = CreateSound("Sound/Interface/Warning.flac", false, false, false, 0, 0, "DefaultEAXON")
    SetSoundParamsFromLabel(gg_snd_Warning, "Warning")
    SetSoundDuration(gg_snd_Warning, 1903)
    SetSoundVolume(gg_snd_Warning, 80)
    gg_snd_GateEpicDeath = CreateSound("Doodads/LordaeronSummer/Terrain/Gate/GateEpicDeath.flac", false, true, true, 0, 0, "DefaultEAXON")
    SetSoundParamsFromLabel(gg_snd_GateEpicDeath, "GateDeath")
    SetSoundDuration(gg_snd_GateEpicDeath, 1581)
    SetSoundVolume(gg_snd_GateEpicDeath, 127)
end

function CreateBuildingsForPlayer20()
    local p = Player(20)
    local u
    local unitID
    local t
    local life
    u = BlzCreateUnitWithSkin(p, FourCC("n00T"), -17920.0, -6080.0, 270.000, FourCC("n00T"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00U"), -15424.0, -3200.0, 270.000, FourCC("n00U"))
    u = BlzCreateUnitWithSkin(p, FourCC("nft2"), -13632.0, -6336.0, 270.000, FourCC("nft2"))
    u = BlzCreateUnitWithSkin(p, FourCC("nft2"), -13632.0, -2624.0, 270.000, FourCC("nft2"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01J"), -15168.0, -2624.0, 270.000, FourCC("n01J"))
    u = BlzCreateUnitWithSkin(p, FourCC("h00G"), -17408.0, -4608.0, 270.000, FourCC("h00G"))
    u = BlzCreateUnitWithSkin(p, FourCC("h024"), -16320.0, -4608.0, 270.000, FourCC("h024"))
    SetUnitState(u, UNIT_STATE_MANA, 1000)
    u = BlzCreateUnitWithSkin(p, FourCC("n00S"), -15808.0, -1920.0, 270.000, FourCC("n00S"))
    u = BlzCreateUnitWithSkin(p, FourCC("n007"), -18304.0, -4800.0, 270.000, FourCC("n007"))
    u = BlzCreateUnitWithSkin(p, FourCC("n007"), -17664.0, -3200.0, 270.000, FourCC("n007"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01G"), -17344.0, -2624.0, 270.000, FourCC("n01G"))
    u = BlzCreateUnitWithSkin(p, FourCC("nft2"), -15552.0, -3904.0, 270.000, FourCC("nft2"))
    u = BlzCreateUnitWithSkin(p, FourCC("h003"), -18816.0, -4224.0, 270.000, FourCC("h003"))
    SetUnitColor(u, ConvertPlayerColor(3))
    u = BlzCreateUnitWithSkin(p, FourCC("n01R"), -18176.0, -1920.0, 270.000, FourCC("n01R"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01F"), -17600.0, -6528.0, 270.000, FourCC("n01F"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01H"), -18496.0, -1984.0, 270.000, FourCC("n01H"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01L"), -17920.0, -2944.0, 270.000, FourCC("n01L"))
    u = BlzCreateUnitWithSkin(p, FourCC("nft2"), -18432.0, -3072.0, 270.000, FourCC("nft2"))
    u = BlzCreateUnitWithSkin(p, FourCC("nft2"), -15552.0, -4544.0, 270.000, FourCC("nft2"))
    u = BlzCreateUnitWithSkin(p, FourCC("n004"), -17056.0, -3072.0, 270.000, FourCC("n004"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01P"), -16640.0, -6464.0, 270.000, FourCC("n01P"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01K"), -16384.0, -3392.0, 270.000, FourCC("n01K"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01N"), -14592.0, -5056.0, 270.000, FourCC("n01N"))
    u = BlzCreateUnitWithSkin(p, FourCC("n007"), -17664.0, -5184.0, 270.000, FourCC("n007"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01G"), -14080.0, -3200.0, 270.000, FourCC("n01G"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00S"), -15808.0, -6464.0, 270.000, FourCC("n00S"))
    u = BlzCreateUnitWithSkin(p, FourCC("h00G"), -16000.0, -4224.0, 270.000, FourCC("h00G"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01N"), -14656.0, -3392.0, 270.000, FourCC("n01N"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01L"), -15168.0, -4544.0, 270.000, FourCC("n01L"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01T"), -12800.0, -3200.0, 270.000, FourCC("n01T"))
    u = BlzCreateUnitWithSkin(p, FourCC("h00G"), -18816.0, -4672.0, 270.000, FourCC("h00G"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01E"), -14016.0, -5120.0, 270.000, FourCC("n01E"))
    u = BlzCreateUnitWithSkin(p, FourCC("h00G"), -18752.0, -3584.0, 270.000, FourCC("h00G"))
    u = BlzCreateUnitWithSkin(p, FourCC("n007"), -18944.0, -5120.0, 270.000, FourCC("n007"))
    u = BlzCreateUnitWithSkin(p, FourCC("h024"), -16320.0, -3840.0, 270.000, FourCC("h024"))
    SetUnitState(u, UNIT_STATE_MANA, 1000)
    u = BlzCreateUnitWithSkin(p, FourCC("n01D"), -16064.0, -4928.0, 270.000, FourCC("n01D"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01L"), -15168.0, -3904.0, 270.000, FourCC("n01L"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00S"), -18432.0, -2432.0, 270.000, FourCC("n00S"))
    u = BlzCreateUnitWithSkin(p, FourCC("n007"), -15872.0, -4544.0, 270.000, FourCC("n007"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01L"), -17920.0, -5504.0, 270.000, FourCC("n01L"))
    u = BlzCreateUnitWithSkin(p, FourCC("h024"), -18560.0, -4992.0, 270.000, FourCC("h024"))
    SetUnitState(u, UNIT_STATE_MANA, 1000)
    u = BlzCreateUnitWithSkin(p, FourCC("n01F"), -17600.0, -1920.0, 270.000, FourCC("n01F"))
    u = BlzCreateUnitWithSkin(p, FourCC("h024"), -13888.0, -2752.0, 270.000, FourCC("h024"))
    u = BlzCreateUnitWithSkin(p, FourCC("hars"), -13888.0, -6016.0, 270.000, FourCC("hars"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01Q"), -15104.0, -1920.0, 270.000, FourCC("n01Q"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01G"), -16512.0, -5952.0, 270.000, FourCC("n01G"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00U"), -15424.0, -5248.0, 270.000, FourCC("n00U"))
    u = BlzCreateUnitWithSkin(p, FourCC("hars"), -13888.0, -2432.0, 270.000, FourCC("hars"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01L"), -15744.0, -5760.0, 270.000, FourCC("n01L"))
    u = BlzCreateUnitWithSkin(p, FourCC("h024"), -15680.0, -4224.0, 270.000, FourCC("h024"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01H"), -18496.0, -6464.0, 270.000, FourCC("n01H"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01G"), -17408.0, -5760.0, 270.000, FourCC("n01G"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01R"), -18176.0, -6528.0, 270.000, FourCC("n01R"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01L"), -15744.0, -2688.0, 270.000, FourCC("n01L"))
    u = BlzCreateUnitWithSkin(p, FourCC("n007"), -15872.0, -3904.0, 270.000, FourCC("n007"))
    u = BlzCreateUnitWithSkin(p, FourCC("h00G"), -14336.0, -6016.0, 270.000, FourCC("h00G"))
    u = BlzCreateUnitWithSkin(p, FourCC("nft2"), -13632.0, -2112.0, 270.000, FourCC("nft2"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01S"), -19136.0, -3712.0, 270.000, FourCC("n01S"))
    u = BlzCreateUnitWithSkin(p, FourCC("h024"), -13888.0, -5696.0, 270.000, FourCC("h024"))
    u = BlzCreateUnitWithSkin(p, FourCC("h00G"), -14336.0, -2432.0, 270.000, FourCC("h00G"))
    u = BlzCreateUnitWithSkin(p, FourCC("h014"), -16448.0, -4224.0, 270.000, FourCC("h014"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01K"), -16384.0, -5056.0, 270.000, FourCC("n01K"))
    u = BlzCreateUnitWithSkin(p, FourCC("n007"), -18304.0, -3648.0, 270.000, FourCC("n007"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01K"), -16768.0, -4800.0, 270.000, FourCC("n01K"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01G"), -16512.0, -2496.0, 270.000, FourCC("n01G"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01J"), -15168.0, -5824.0, 270.000, FourCC("n01J"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01H"), -16512.0, -5312.0, 270.000, FourCC("n01H"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01M"), -15488.0, -6272.0, 270.000, FourCC("n01M"))
    u = BlzCreateUnitWithSkin(p, FourCC("nft2"), -13632.0, -5824.0, 270.000, FourCC("nft2"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01B"), -13696.0, -4224.0, 270.000, FourCC("n01B"))
    u = BlzCreateUnitWithSkin(p, FourCC("n007"), -18944.0, -3264.0, 270.000, FourCC("n007"))
    u = BlzCreateUnitWithSkin(p, FourCC("h00G"), -17408.0, -3840.0, 270.000, FourCC("h00G"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01S"), -19136.0, -4736.0, 270.000, FourCC("n01S"))
    u = BlzCreateUnitWithSkin(p, FourCC("n007"), -13504.0, -2368.0, 270.000, FourCC("n007"))
    u = BlzCreateUnitWithSkin(p, FourCC("n004"), -17056.0, -5376.0, 270.000, FourCC("n004"))
    u = BlzCreateUnitWithSkin(p, FourCC("h024"), -13888.0, -6336.0, 270.000, FourCC("h024"))
    u = BlzCreateUnitWithSkin(p, FourCC("nft2"), -18496.0, -5312.0, 270.000, FourCC("nft2"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01M"), -15488.0, -2176.0, 270.000, FourCC("n01M"))
    u = BlzCreateUnitWithSkin(p, FourCC("h024"), -13888.0, -2048.0, 270.000, FourCC("h024"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01D"), -16064.0, -3456.0, 270.000, FourCC("n01D"))
    u = BlzCreateUnitWithSkin(p, FourCC("n007"), -13504.0, -6080.0, 270.000, FourCC("n007"))
    u = BlzCreateUnitWithSkin(p, FourCC("h024"), -18368.0, -4224.0, 270.000, FourCC("h024"))
    SetUnitState(u, UNIT_STATE_MANA, 1000)
    u = BlzCreateUnitWithSkin(p, FourCC("n00S"), -18432.0, -5952.0, 270.000, FourCC("n00S"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01H"), -16512.0, -3136.0, 270.000, FourCC("n01H"))
    u = BlzCreateUnitWithSkin(p, FourCC("n019"), -17216.0, -4224.0, 270.000, FourCC("n019"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00T"), -17920.0, -2368.0, 270.000, FourCC("n00T"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01I"), -19328.0, -4224.0, 270.000, FourCC("n01I"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01Q"), -15104.0, -6528.0, 270.000, FourCC("n01Q"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01K"), -16768.0, -3584.0, 270.000, FourCC("n01K"))
    u = BlzCreateUnitWithSkin(p, FourCC("h024"), -18560.0, -3392.0, 270.000, FourCC("h024"))
    SetUnitState(u, UNIT_STATE_MANA, 1000)
    u = BlzCreateUnitWithSkin(p, FourCC("n01T"), -12800.0, -5248.0, 270.000, FourCC("n01T"))
    u = BlzCreateUnitWithSkin(p, FourCC("n01O"), -16384.0, -6464.0, 270.000, FourCC("n01O"))
end

function CreateBuildingsForPlayer23()
    local p = Player(23)
    local u
    local unitID
    local t
    local life
    u = BlzCreateUnitWithSkin(p, FourCC("negt"), 1344.0, -10368.0, 270.000, FourCC("negt"))
    u = BlzCreateUnitWithSkin(p, FourCC("nefm"), 1120.0, -9248.0, 270.000, FourCC("nefm"))
    u = BlzCreateUnitWithSkin(p, FourCC("negt"), 1728.0, -9472.0, 270.000, FourCC("negt"))
    u = BlzCreateUnitWithSkin(p, FourCC("nmg0"), -12768.0, -13088.0, 270.000, FourCC("nmg0"))
    u = BlzCreateUnitWithSkin(p, FourCC("nmh1"), -10976.0, -12000.0, 270.000, FourCC("nmh1"))
    u = BlzCreateUnitWithSkin(p, FourCC("negt"), 1408.0, -9856.0, 270.000, FourCC("negt"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngob"), -2944.0, -11136.0, 270.000, FourCC("ngob"))
    u = BlzCreateUnitWithSkin(p, FourCC("negt"), 2688.0, -10112.0, 270.000, FourCC("negt"))
    u = BlzCreateUnitWithSkin(p, FourCC("nef0"), 1824.0, -10016.0, 270.000, FourCC("nef0"))
    u = BlzCreateUnitWithSkin(p, FourCC("negt"), 2240.0, -9344.0, 270.000, FourCC("negt"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00G"), -3936.0, -10976.0, 270.000, FourCC("n00G"))
    u = BlzCreateUnitWithSkin(p, FourCC("nef0"), 288.0, -10720.0, 270.000, FourCC("nef0"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngob"), -4224.0, -11264.0, 270.000, FourCC("ngob"))
    u = BlzCreateUnitWithSkin(p, FourCC("negt"), 2048.0, -10048.0, 270.000, FourCC("negt"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00Z"), -11680.0, -11488.0, 270.000, FourCC("n00Z"))
    u = BlzCreateUnitWithSkin(p, FourCC("ntt1"), 1024.0, 192.0, 270.000, FourCC("ntt1"))
    u = BlzCreateUnitWithSkin(p, FourCC("nef4"), 1504.0, -9312.0, 270.000, FourCC("nef4"))
    u = BlzCreateUnitWithSkin(p, FourCC("nefm"), 672.0, -10592.0, 270.000, FourCC("nefm"))
    u = BlzCreateUnitWithSkin(p, FourCC("nntt"), -10560.0, -9984.0, 270.000, FourCC("nntt"))
    u = BlzCreateUnitWithSkin(p, FourCC("ndch"), 832.0, 1088.0, 270.000, FourCC("ndch"))
    u = BlzCreateUnitWithSkin(p, FourCC("ntx2"), 448.0, 1536.0, 270.000, FourCC("ntx2"))
    u = BlzCreateUnitWithSkin(p, FourCC("negt"), 1920.0, -10816.0, 270.000, FourCC("negt"))
    u = BlzCreateUnitWithSkin(p, FourCC("nmg0"), -13216.0, -12512.0, 270.000, FourCC("nmg0"))
    u = BlzCreateUnitWithSkin(p, FourCC("nntg"), -11456.0, -9472.0, 270.000, FourCC("nntg"))
    u = BlzCreateUnitWithSkin(p, FourCC("nef4"), 1824.0, -10528.0, 270.000, FourCC("nef4"))
    u = BlzCreateUnitWithSkin(p, FourCC("nmg0"), -12192.0, -12448.0, 270.000, FourCC("nmg0"))
    u = BlzCreateUnitWithSkin(p, FourCC("nef6"), 800.0, -10976.0, 270.000, FourCC("nef6"))
    u = BlzCreateUnitWithSkin(p, FourCC("nef3"), 1504.0, -9632.0, 270.000, FourCC("nef3"))
    u = BlzCreateUnitWithSkin(p, FourCC("nntg"), -11328.0, -10304.0, 270.000, FourCC("nntg"))
    u = BlzCreateUnitWithSkin(p, FourCC("nef0"), 544.0, -11168.0, 270.000, FourCC("nef0"))
    u = BlzCreateUnitWithSkin(p, FourCC("nef4"), -32.0, -9952.0, 270.000, FourCC("nef4"))
    u = BlzCreateUnitWithSkin(p, FourCC("nmg0"), -13408.0, -13152.0, 270.000, FourCC("nmg0"))
    u = BlzCreateUnitWithSkin(p, FourCC("nefm"), -160.0, -10208.0, 270.000, FourCC("nefm"))
    u = BlzCreateUnitWithSkin(p, FourCC("nheb"), 2336.0, -10528.0, 270.000, FourCC("nheb"))
    u = BlzCreateUnitWithSkin(p, FourCC("nmg1"), -11424.0, -11872.0, 270.000, FourCC("nmg1"))
    u = BlzCreateUnitWithSkin(p, FourCC("nmg1"), -12320.0, -11808.0, 270.000, FourCC("nmg1"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00E"), -3616.0, -10976.0, 270.000, FourCC("n00E"))
    u = BlzCreateUnitWithSkin(p, FourCC("ngob"), -4672.0, -10816.0, 270.000, FourCC("ngob"))
    u = BlzCreateUnitWithSkin(p, FourCC("nef4"), 608.0, -9760.0, 270.000, FourCC("nef4"))
    u = BlzCreateUnitWithSkin(p, FourCC("h00X"), -9088.0, -4224.0, 270.000, FourCC("h00X"))
    u = BlzCreateUnitWithSkin(p, FourCC("eshy"), -3552.0, -12768.0, 270.000, FourCC("eshy"))
    u = BlzCreateUnitWithSkin(p, FourCC("n012"), -5024.0, -11104.0, 270.000, FourCC("n012"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncnt"), 3936.0, 3680.0, 270.000, FourCC("ncnt"))
    u = BlzCreateUnitWithSkin(p, FourCC("nef1"), 2272.0, -9632.0, 270.000, FourCC("nef1"))
    u = BlzCreateUnitWithSkin(p, FourCC("e003"), 2688.0, -6976.0, 270.000, FourCC("e003"))
    u = BlzCreateUnitWithSkin(p, FourCC("nefm"), 2272.0, -10080.0, 270.000, FourCC("nefm"))
    u = BlzCreateUnitWithSkin(p, FourCC("nef4"), -160.0, -10464.0, 270.000, FourCC("nef4"))
    u = BlzCreateUnitWithSkin(p, FourCC("n001"), -9344.0, -832.0, 270.000, FourCC("n001"))
    SetUnitColor(u, ConvertPlayerColor(9))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb5"), -8224.0, -2400.0, 270.000, FourCC("ncb5"))
    u = BlzCreateUnitWithSkin(p, FourCC("h01B"), -8512.0, -1600.0, 270.000, FourCC("h01B"))
    u = BlzCreateUnitWithSkin(p, FourCC("h01Q"), -9536.0, -2176.0, 270.000, FourCC("h01Q"))
    u = BlzCreateUnitWithSkin(p, FourCC("ndh0"), 2048.0, 1792.0, 270.000, FourCC("ndh0"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00M"), -9472.0, -1152.0, 270.000, FourCC("n00M"))
    SetUnitState(u, UNIT_STATE_MANA, 260)
    u = BlzCreateUnitWithSkin(p, FourCC("o004"), -9664.0, -1216.0, 270.000, FourCC("o004"))
    u = BlzCreateUnitWithSkin(p, FourCC("nntg"), -9984.0, -9920.0, 270.000, FourCC("nntg"))
    u = BlzCreateUnitWithSkin(p, FourCC("h01B"), -9088.0, -2688.0, 270.000, FourCC("h01B"))
    u = BlzCreateUnitWithSkin(p, FourCC("n012"), -4448.0, -12384.0, 270.000, FourCC("n012"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00M"), -10368.0, -1216.0, 270.000, FourCC("n00M"))
    SetUnitState(u, UNIT_STATE_MANA, 260)
    u = BlzCreateUnitWithSkin(p, FourCC("o004"), -9088.0, -384.0, 270.000, FourCC("o004"))
    u = BlzCreateUnitWithSkin(p, FourCC("nefm"), 352.0, -10080.0, 270.000, FourCC("nefm"))
    u = BlzCreateUnitWithSkin(p, FourCC("h01D"), -9536.0, -2432.0, 270.000, FourCC("h01D"))
    u = BlzCreateUnitWithSkin(p, FourCC("o004"), -8768.0, -1024.0, 270.000, FourCC("o004"))
    gg_unit_h00E_0081 = BlzCreateUnitWithSkin(p, FourCC("h00E"), -5120.0, -4736.0, 270.000, FourCC("h00E"))
    u = BlzCreateUnitWithSkin(p, FourCC("o004"), -9984.0, -896.0, 270.000, FourCC("o004"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00R"), -7968.0, -5120.0, 270.000, FourCC("n00R"))
    u = BlzCreateUnitWithSkin(p, FourCC("nmh0"), -11360.0, -12512.0, 270.000, FourCC("nmh0"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00O"), -8864.0, -3360.0, 270.000, FourCC("n00O"))
    u = BlzCreateUnitWithSkin(p, FourCC("h01B"), -9792.0, -2048.0, 270.000, FourCC("h01B"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00M"), -8704.0, -512.0, 270.000, FourCC("n00M"))
    u = BlzCreateUnitWithSkin(p, FourCC("hlum"), -9056.0, -2080.0, 270.000, FourCC("hlum"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00M"), -9472.0, -448.0, 270.000, FourCC("n00M"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00R"), -8672.0, -3904.0, 270.000, FourCC("n00R"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00R"), -8480.0, -3904.0, 270.000, FourCC("n00R"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00M"), -9152.0, -1280.0, 270.000, FourCC("n00M"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncbb"), -8160.0, -1696.0, 270.000, FourCC("ncbb"))
    u = BlzCreateUnitWithSkin(p, FourCC("h01B"), -8576.0, -2240.0, 270.000, FourCC("h01B"))
    u = BlzCreateUnitWithSkin(p, FourCC("hhou"), -9792.0, -2304.0, 270.000, FourCC("hhou"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00M"), -10176.0, -640.0, 270.000, FourCC("n00M"))
    SetUnitState(u, UNIT_STATE_MANA, 260)
    u = BlzCreateUnitWithSkin(p, FourCC("h01B"), -8384.0, -704.0, 270.000, FourCC("h01B"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00M"), -9728.0, -512.0, 270.000, FourCC("n00M"))
    u = BlzCreateUnitWithSkin(p, FourCC("h01B"), -8128.0, -576.0, 270.000, FourCC("h01B"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00M"), -8832.0, -832.0, 270.000, FourCC("n00M"))
    u = BlzCreateUnitWithSkin(p, FourCC("n011"), -4576.0, -13152.0, 270.000, FourCC("n011"))
    u = BlzCreateUnitWithSkin(p, FourCC("h004"), -8576.0, -4416.0, 270.000, FourCC("h004"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00M"), -10112.0, -1600.0, 270.000, FourCC("n00M"))
    u = BlzCreateUnitWithSkin(p, FourCC("n012"), -4640.0, -11296.0, 270.000, FourCC("n012"))
    u = BlzCreateUnitWithSkin(p, FourCC("ntt1"), 256.0, 2240.0, 270.000, FourCC("ntt1"))
    u = BlzCreateUnitWithSkin(p, FourCC("nnsg"), -9600.0, -9984.0, 270.000, FourCC("nnsg"))
    u = BlzCreateUnitWithSkin(p, FourCC("nnad"), -11040.0, -9632.0, 270.000, FourCC("nnad"))
    u = BlzCreateUnitWithSkin(p, FourCC("nntg"), -11072.0, -9152.0, 270.000, FourCC("nntg"))
    u = BlzCreateUnitWithSkin(p, FourCC("nntg"), -10304.0, -9344.0, 270.000, FourCC("nntg"))
    u = BlzCreateUnitWithSkin(p, FourCC("nntg"), -10752.0, -10560.0, 270.000, FourCC("nntg"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00R"), -7968.0, -5504.0, 270.000, FourCC("n00R"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00R"), -7136.0, -5056.0, 270.000, FourCC("n00R"))
    u = BlzCreateUnitWithSkin(p, FourCC("nmh0"), -10912.0, -11552.0, 270.000, FourCC("nmh0"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00O"), -9120.0, -5344.0, 270.000, FourCC("n00O"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00R"), -8288.0, -3904.0, 270.000, FourCC("n00R"))
    u = BlzCreateUnitWithSkin(p, FourCC("h00X"), -7104.0, -3520.0, 270.000, FourCC("h00X"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00R"), -7136.0, -4864.0, 270.000, FourCC("n00R"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00P"), -7360.0, -5472.0, 270.000, FourCC("n00P"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00R"), -6880.0, -4096.0, 270.000, FourCC("n00R"))
    u = BlzCreateUnitWithSkin(p, FourCC("npgf"), 1440.0, 4384.0, 270.000, FourCC("npgf"))
    u = BlzCreateUnitWithSkin(p, FourCC("npgf"), 2976.0, 2464.0, 270.000, FourCC("npgf"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncnt"), 992.0, 2848.0, 270.000, FourCC("ncnt"))
    u = BlzCreateUnitWithSkin(p, FourCC("ndh1"), -384.0, 1856.0, 270.000, FourCC("ndh1"))
    u = BlzCreateUnitWithSkin(p, FourCC("ntt1"), 1920.0, 1472.0, 270.000, FourCC("ntt1"))
    u = BlzCreateUnitWithSkin(p, FourCC("o005"), 2368.0, 3648.0, 270.000, FourCC("o005"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00R"), -7968.0, -5312.0, 270.000, FourCC("n00R"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00R"), -7136.0, -4416.0, 270.000, FourCC("n00R"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00D"), -7904.0, -3680.0, 270.000, FourCC("n00D"))
    u = BlzCreateUnitWithSkin(p, FourCC("h00X"), -8832.0, -5440.0, 270.000, FourCC("h00X"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00D"), -7136.0, -5536.0, 270.000, FourCC("n00D"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00P"), -9280.0, -3360.0, 270.000, FourCC("n00P"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb3"), -608.0, -2016.0, 90.000, FourCC("ncb3"))
    u = BlzCreateUnitWithSkin(p, FourCC("h019"), -8512.0, -4992.0, 270.000, FourCC("h019"))
    u = BlzCreateUnitWithSkin(p, FourCC("h020"), -6272.0, -5056.0, 180.000, FourCC("h020"))
    u = BlzCreateUnitWithSkin(p, FourCC("hgtw"), -5056.0, -4032.0, 270.000, FourCC("hgtw"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00O"), -7904.0, -3488.0, 270.000, FourCC("n00O"))
    u = BlzCreateUnitWithSkin(p, FourCC("h00X"), -8320.0, -5440.0, 270.000, FourCC("h00X"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00R"), -7584.0, -5504.0, 270.000, FourCC("n00R"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -3168.0, -5600.0, 90.000, FourCC("ncb9"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -3360.0, -5600.0, 90.000, FourCC("ncb9"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -3552.0, -5600.0, 90.000, FourCC("ncb9"))
    u = BlzCreateUnitWithSkin(p, FourCC("ndh3"), 1280.0, 960.0, 270.000, FourCC("ndh3"))
    u = BlzCreateUnitWithSkin(p, FourCC("npgf"), 1888.0, 4384.0, 270.000, FourCC("npgf"))
    u = BlzCreateUnitWithSkin(p, FourCC("ndh1"), 1024.0, 1920.0, 270.000, FourCC("ndh1"))
    u = BlzCreateUnitWithSkin(p, FourCC("ndh4"), 128.0, 1536.0, 270.000, FourCC("ndh4"))
    u = BlzCreateUnitWithSkin(p, FourCC("ntt1"), 64.0, 1280.0, 270.000, FourCC("ntt1"))
    u = BlzCreateUnitWithSkin(p, FourCC("ndh0"), 1472.0, 1280.0, 270.000, FourCC("ndh0"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00R"), -7328.0, -4416.0, 270.000, FourCC("n00R"))
    u = BlzCreateUnitWithSkin(p, FourCC("h00X"), -9088.0, -4608.0, 270.000, FourCC("h00X"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -992.0, -1440.0, 90.000, FourCC("ncb9"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -928.0, -5600.0, 90.000, FourCC("ncb9"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00P"), -7616.0, -3872.0, 270.000, FourCC("n00P"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00R"), -7712.0, -3520.0, 270.000, FourCC("n00R"))
    u = BlzCreateUnitWithSkin(p, FourCC("hgtw"), -4800.0, -4288.0, 270.000, FourCC("hgtw"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00O"), -6944.0, -5600.0, 270.000, FourCC("n00O"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00O"), -7904.0, -3872.0, 270.000, FourCC("n00O"))
    u = BlzCreateUnitWithSkin(p, FourCC("o001"), 2688.0, 3008.0, 270.000, FourCC("o001"))
    u = BlzCreateUnitWithSkin(p, FourCC("h01S"), -7808.0, -4416.0, 270.000, FourCC("h01S"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00R"), -6880.0, -3904.0, 270.000, FourCC("n00R"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00P"), -8576.0, -3616.0, 270.000, FourCC("n00P"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00R"), -7520.0, -3520.0, 270.000, FourCC("n00R"))
    u = BlzCreateUnitWithSkin(p, FourCC("hgtw"), -4544.0, -4032.0, 270.000, FourCC("hgtw"))
    u = BlzCreateUnitWithSkin(p, FourCC("h00X"), -8384.0, -3392.0, 270.000, FourCC("h00X"))
    u = BlzCreateUnitWithSkin(p, FourCC("h00X"), -7744.0, -1600.0, 270.000, FourCC("h00X"))
    u = BlzCreateUnitWithSkin(p, FourCC("h00F"), -2554.0, -3507.7, 180.000, FourCC("h00F"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00R"), -9056.0, -3328.0, 270.000, FourCC("n00R"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -1120.0, -5600.0, 90.000, FourCC("ncb9"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00Q"), -7552.0, -4960.0, 270.000, FourCC("n00Q"))
    u = BlzCreateUnitWithSkin(p, FourCC("ntx2"), 1408.0, 1728.0, 270.000, FourCC("ntx2"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -2656.0, -1824.0, 90.000, FourCC("ncb9"))
    u = BlzCreateUnitWithSkin(p, FourCC("h004"), -5952.0, -3520.0, 270.000, FourCC("h004"))
    u = BlzCreateUnitWithSkin(p, FourCC("o000"), 896.0, 4160.0, 270.000, FourCC("o000"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -1440.0, -5600.0, 90.000, FourCC("ncb9"))
    u = BlzCreateUnitWithSkin(p, FourCC("nct1"), 1248.0, 2976.0, 270.000, FourCC("nct1"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -3168.0, -1440.0, 90.000, FourCC("ncb9"))
    u = BlzCreateUnitWithSkin(p, FourCC("h013"), -5952.0, -2624.0, 270.000, FourCC("h013"))
    u = BlzCreateUnitWithSkin(p, FourCC("o005"), 1472.0, 4736.0, 270.000, FourCC("o005"))
    u = BlzCreateUnitWithSkin(p, FourCC("ntt1"), 1664.0, 1088.0, 270.000, FourCC("ntt1"))
    u = BlzCreateUnitWithSkin(p, FourCC("ndh2"), 896.0, 1472.0, 270.000, FourCC("ndh2"))
    u = BlzCreateUnitWithSkin(p, FourCC("npgf"), 3232.0, 2592.0, 270.000, FourCC("npgf"))
    u = BlzCreateUnitWithSkin(p, FourCC("o000"), 768.0, 3584.0, 270.000, FourCC("o000"))
    u = BlzCreateUnitWithSkin(p, FourCC("ntt1"), 576.0, 1024.0, 270.000, FourCC("ntt1"))
    u = BlzCreateUnitWithSkin(p, FourCC("nct2"), 2464.0, 4448.0, 270.000, FourCC("nct2"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -1632.0, -5600.0, 90.000, FourCC("ncb9"))
    u = BlzCreateUnitWithSkin(p, FourCC("o005"), 1792.0, 3072.0, 270.000, FourCC("o005"))
    u = BlzCreateUnitWithSkin(p, FourCC("o003"), 1888.0, 3488.0, 270.000, FourCC("o003"))
    u = BlzCreateUnitWithSkin(p, FourCC("ndh0"), 128.0, 1920.0, 270.000, FourCC("ndh0"))
    u = BlzCreateUnitWithSkin(p, FourCC("ntt1"), -128.0, 1984.0, 270.000, FourCC("ntt1"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb3"), -608.0, -3232.0, 90.000, FourCC("ncb3"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -1824.0, -5600.0, 90.000, FourCC("ncb9"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -2976.0, -1440.0, 90.000, FourCC("ncb9"))
    u = BlzCreateUnitWithSkin(p, FourCC("nfrt"), -7040.0, -2816.0, 270.000, FourCC("nfrt"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -3360.0, -1440.0, 90.000, FourCC("ncb9"))
    u = BlzCreateUnitWithSkin(p, FourCC("h004"), -6336.0, -3904.0, 270.000, FourCC("h004"))
    u = BlzCreateUnitWithSkin(p, FourCC("h004"), -6336.0, -3520.0, 270.000, FourCC("h004"))
    u = BlzCreateUnitWithSkin(p, FourCC("hgtw"), -6464.0, -6208.0, 270.000, FourCC("hgtw"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb3"), -1056.0, -4512.0, 90.000, FourCC("ncb3"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb3"), -1056.0, -2528.0, 90.000, FourCC("ncb3"))
    u = BlzCreateUnitWithSkin(p, FourCC("hgtw"), -6848.0, -6208.0, 270.000, FourCC("hgtw"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -1504.0, -1824.0, 90.000, FourCC("ncb9"))
    life = GetUnitState(u, UNIT_STATE_LIFE)
    SetUnitState(u, UNIT_STATE_LIFE, 0.40 * life)
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -2848.0, -5152.0, 90.000, FourCC("ncb9"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -2464.0, -5152.0, 90.000, FourCC("ncb9"))
    life = GetUnitState(u, UNIT_STATE_LIFE)
    SetUnitState(u, UNIT_STATE_LIFE, 0.60 * life)
    u = BlzCreateUnitWithSkin(p, FourCC("h020"), -4800.0, -3584.0, 90.000, FourCC("h020"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb3"), -608.0, -4832.0, 90.000, FourCC("ncb3"))
    u = BlzCreateUnitWithSkin(p, FourCC("h00X"), -7744.0, -2432.0, 270.000, FourCC("h00X"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb3"), -608.0, -3808.0, 90.000, FourCC("ncb3"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb3"), -608.0, -1824.0, 90.000, FourCC("ncb3"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb3"), -608.0, -3040.0, 90.000, FourCC("ncb3"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb3"), -608.0, -2208.0, 90.000, FourCC("ncb3"))
    gg_unit_n00K_0477 = BlzCreateUnitWithSkin(p, FourCC("n00K"), -4800.0, -2816.0, 270.000, FourCC("n00K"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb3"), -1056.0, -4128.0, 90.000, FourCC("ncb3"))
    life = GetUnitState(u, UNIT_STATE_LIFE)
    SetUnitState(u, UNIT_STATE_LIFE, 0.30 * life)
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -2464.0, -1824.0, 90.000, FourCC("ncb9"))
    life = GetUnitState(u, UNIT_STATE_LIFE)
    SetUnitState(u, UNIT_STATE_LIFE, 0.50 * life)
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -1504.0, -5152.0, 90.000, FourCC("ncb9"))
    life = GetUnitState(u, UNIT_STATE_LIFE)
    SetUnitState(u, UNIT_STATE_LIFE, 0.80 * life)
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -3552.0, -5152.0, 90.000, FourCC("ncb9"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -2656.0, -5152.0, 90.000, FourCC("ncb9"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb3"), -1056.0, -2720.0, 90.000, FourCC("ncb3"))
    life = GetUnitState(u, UNIT_STATE_LIFE)
    SetUnitState(u, UNIT_STATE_LIFE, 0.80 * life)
    u = BlzCreateUnitWithSkin(p, FourCC("ncb9"), -800.0, -1440.0, 90.000, FourCC("ncb9"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb3"), -608.0, -4000.0, 90.000, FourCC("ncb3"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb3"), -608.0, -5024.0, 90.000, FourCC("ncb3"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb3"), -1056.0, -2912.0, 90.000, FourCC("ncb3"))
    life = GetUnitState(u, UNIT_STATE_LIFE)
    SetUnitState(u, UNIT_STATE_LIFE, 0.60 * life)
    u = BlzCreateUnitWithSkin(p, FourCC("ncb3"), -608.0, -5216.0, 90.000, FourCC("ncb3"))
    u = BlzCreateUnitWithSkin(p, FourCC("ncb3"), -1056.0, -4320.0, 90.000, FourCC("ncb3"))
    u = BlzCreateUnitWithSkin(p, FourCC("hbar"), -7488.0, -1344.0, 270.000, FourCC("hbar"))
    u = BlzCreateUnitWithSkin(p, FourCC("hgtw"), -5568.0, -5056.0, 270.000, FourCC("hgtw"))
    u = BlzCreateUnitWithSkin(p, FourCC("hgtw"), -5824.0, -4800.0, 270.000, FourCC("hgtw"))
    u = BlzCreateUnitWithSkin(p, FourCC("hgtw"), -5824.0, -5312.0, 270.000, FourCC("hgtw"))
end

function CreateUnitsForPlayer23()
    local p = Player(23)
    local u
    local unitID
    local t
    local life
    u = BlzCreateUnitWithSkin(p, FourCC("h00H"), -15206.8, -1597.3, 143.535, FourCC("h00H"))
    u = BlzCreateUnitWithSkin(p, FourCC("nmcf"), -11432.5, -11489.4, 170.079, FourCC("nmcf"))
    u = BlzCreateUnitWithSkin(p, FourCC("h007"), -7369.3, -4959.1, 78.989, FourCC("h007"))
    u = BlzCreateUnitWithSkin(p, FourCC("o002"), 1961.5, 4097.3, 26.577, FourCC("o002"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00L"), -8813.6, -699.7, 222.029, FourCC("n00L"))
    u = BlzCreateUnitWithSkin(p, FourCC("nmcf"), -12046.7, -12154.6, 336.868, FourCC("nmcf"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00L"), -9700.2, -1471.7, 129.478, FourCC("n00L"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00L"), -8953.7, -1161.6, 318.745, FourCC("n00L"))
    u = BlzCreateUnitWithSkin(p, FourCC("n00L"), -9750.7, -728.3, 302.375, FourCC("n00L"))
    u = BlzCreateUnitWithSkin(p, FourCC("nmyr"), -10129.6, -9545.4, 171.656, FourCC("nmyr"))
    u = BlzCreateUnitWithSkin(p, FourCC("nmyr"), -11468.7, -10641.1, 330.589, FourCC("nmyr"))
    u = BlzCreateUnitWithSkin(p, FourCC("nmcf"), -10736.9, -12046.5, 85.482, FourCC("nmcf"))
    u = BlzCreateUnitWithSkin(p, FourCC("nmyr"), -10958.5, -9927.2, 263.120, FourCC("nmyr"))
    u = BlzCreateUnitWithSkin(p, FourCC("nmcf"), -11684.8, -11852.1, 171.936, FourCC("nmcf"))
    u = BlzCreateUnitWithSkin(p, FourCC("nmcf"), -11363.9, -12353.9, 234.834, FourCC("nmcf"))
    u = BlzCreateUnitWithSkin(p, FourCC("nmcf"), -11196.7, -11927.8, 2.906, FourCC("nmcf"))
    u = BlzCreateUnitWithSkin(p, FourCC("h007"), -8928.5, -3591.6, 257.137, FourCC("h007"))
    u = BlzCreateUnitWithSkin(p, FourCC("h007"), -7785.1, -5439.9, 103.731, FourCC("h007"))
    u = BlzCreateUnitWithSkin(p, FourCC("h007"), -8179.4, -3604.9, 131.911, FourCC("h007"))
    u = BlzCreateUnitWithSkin(p, FourCC("h007"), -7011.7, -3795.4, 92.184, FourCC("h007"))
    u = BlzCreateUnitWithSkin(p, FourCC("hpea"), -7827.8, -1797.0, 93.909, FourCC("hpea"))
    u = BlzCreateUnitWithSkin(p, FourCC("h007"), -8279.5, -5208.2, 247.480, FourCC("h007"))
    u = BlzCreateUnitWithSkin(p, FourCC("o002"), 2213.5, 3523.7, 316.207, FourCC("o002"))
    u = BlzCreateUnitWithSkin(p, FourCC("o002"), 1497.2, 3201.3, 30.982, FourCC("o002"))
end

function CreateNeutralPassiveBuildings()
    local p = Player(PLAYER_NEUTRAL_PASSIVE)
    local u
    local unitID
    local t
    local life
    u = BlzCreateUnitWithSkin(p, FourCC("o00C"), -8192.5, -4610.6, 90.000, FourCC("o00C"))
    u = BlzCreateUnitWithSkin(p, FourCC("o00C"), -8192.5, -4226.6, 90.000, FourCC("o00C"))
end

function CreatePlayerBuildings()
    CreateBuildingsForPlayer20()
    CreateBuildingsForPlayer23()
end

function CreatePlayerUnits()
    CreateUnitsForPlayer23()
end

function CreateAllUnits()
    CreateNeutralPassiveBuildings()
    CreatePlayerBuildings()
    CreatePlayerUnits()
end

function Trig_Level100_Func001001002001()
    return (GetOwningPlayer(GetFilterUnit()) == Player(0))
end

function Trig_Level100_Func001001002002()
    return (IsUnitType(GetFilterUnit(), UNIT_TYPE_HERO) == true)
end

function Trig_Level100_Func001001002()
    return GetBooleanAnd(Trig_Level100_Func001001002001(), Trig_Level100_Func001001002002())
end

function Trig_Level100_Func001A()
    SetHeroLevelBJ(GetEnumUnit(), 100, false)
end

function Trig_Level100_Actions()
    ForGroupBJ(GetUnitsInRectMatching(GetPlayableMapRect(), Condition(Trig_Level100_Func001001002)), Trig_Level100_Func001A)
end

function InitTrig_Level100()
    gg_trg_Level100 = CreateTrigger()
    TriggerRegisterPlayerChatEvent(gg_trg_Level100, Player(0), "-level100", true)
    TriggerAddAction(gg_trg_Level100, Trig_Level100_Actions)
end

function Trig_fogofwar_Actions()
    FogEnableOff()
    FogMaskEnableOff()
end

function InitTrig_fogofwar()
    gg_trg_fogofwar = CreateTrigger()
    TriggerRegisterPlayerChatEvent(gg_trg_fogofwar, Player(0), "-fogofwar", true)
    TriggerAddAction(gg_trg_fogofwar, Trig_fogofwar_Actions)
end

function Trig_testing_Conditions()
    if (not (IsTerrainPathableBJ(GetRectCenter(GetPlayableMapRect()), PATHING_TYPE_WALKABILITY) == true)) then
        return false
    end
    return true
end

function Trig_testing_Actions()
    UnitApplyTimedLifeBJ(60, FourCC("BTLF"), GetTriggerUnit())
    SetPlayerHandicapXPBJ(Player(0), GetPlayerHandicapXPBJ(Player(0)))
    SelectHeroSkill(GetTriggerUnit(), FourCC("AHbz"))
    SetUnitPositionLoc(GetTriggerUnit(), GetRectCenter(GetPlayableMapRect()))
    AdjustPlayerStateBJ(50, Player(0), PLAYER_STATE_RESOURCE_LUMBER)
    SetUnitPositionLoc(GetTriggerUnit(), GetRectCenter(GetPlayableMapRect()))
    ConditionalTriggerExecute(gg_trg_baseAndHeals)
    SelectUnitForPlayerSingle(GetTriggerUnit(), Player(0))
    SetUnitPositionLocFacingBJ(GetTriggerUnit(), GetRectCenter(GetPlayableMapRect()), 0.00)
    BlzEndUnitAbilityCooldown(GetEnumUnit(), FourCC("AHav"))
    SetCameraTargetControllerNoZForPlayer(Player(0), GetTriggerUnit(), 0, 0, false)
    UnitUseItemTarget(GetLastCreatedUnit(), GetItemOfTypeFromUnitBJ(GetEnumUnit(), FourCC("texp")), GetEnumUnit())
    BlzSetUnitBaseDamage(GetTriggerUnit(), 10, 0)
    UnitDamageTargetBJ(GetTriggerUnit(), GetTriggerUnit(), 500, ATTACK_TYPE_MELEE, DAMAGE_TYPE_MAGIC)
    SetUnitTimeScalePercent(GetEnumUnit(), 100)
    CreateNUnitsAtLoc(1, FourCC("hfoo"), Player(PLAYER_NEUTRAL_PASSIVE), GetRectCenter(GetPlayableMapRect()), bj_UNIT_FACING)
    SetSkyModel("Environment\\Sky\\BlizzardSky\\BlizzardSky.mdl")
    SetSkyModel("Environment\\Sky\\BlizzardSky\\BlizzardSky.mdl")
    DisableTrigger(GetTriggeringTrigger())
    SetPlayerTechResearchedSwap(FourCC("R005"), 0, Player(0))
    BlzSetUnitName(GetTriggerUnit(), "hie")
end

function InitTrig_testing()
    gg_trg_testing = CreateTrigger()
    DisableTrigger(gg_trg_testing)
    TriggerRegisterAnyUnitEventBJ(gg_trg_testing, EVENT_PLAYER_UNIT_ATTACKED)
    TriggerRegisterEnterRectSimple(gg_trg_testing, GetPlayableMapRect())
    TriggerAddCondition(gg_trg_testing, Condition(Trig_testing_Conditions))
    TriggerAddAction(gg_trg_testing, Trig_testing_Actions)
end

function Trig_FUNC_Calculate_Level_Factor_Func002Func001C()
    if (not (udg_CALC_LOOP > 1)) then
        return false
    end
    return true
end

function Trig_FUNC_Calculate_Level_Factor_Actions()
    udg_CALC_RESULT = udg_CALC_Base
    udg_CALC_LOOP = 1
    while (true) do
        if (udg_CALC_LOOP > udg_CALC_ITERATIONS) then break end
        if (Trig_FUNC_Calculate_Level_Factor_Func002Func001C()) then
            udg_CALC_RESULT = ((udg_CALC_RESULT * udg_CALC_Previous_Value) + (0.00 + ((udg_CALC_Level_Factor * I2R((udg_CALC_LOOP - 1))) + udg_CALC_Constant)))
        else
        end
        udg_CALC_LOOP = udg_CALC_LOOP + 1
    end
end

function InitTrig_FUNC_Calculate_Level_Factor()
    gg_trg_FUNC_Calculate_Level_Factor = CreateTrigger()
    TriggerAddAction(gg_trg_FUNC_Calculate_Level_Factor, Trig_FUNC_Calculate_Level_Factor_Actions)
end

function Trig_Paradox_INIT_Actions()
    InitHashtableBJ()
    udg_Paradox_HASH = GetLastCreatedHashtableBJ()
    udg_Paradox_INTERVAL = 0.20
    TriggerRegisterTimerEventPeriodic(gg_trg_Paradox_LOOP, udg_Paradox_INTERVAL)
end

function InitTrig_Paradox_INIT()
    gg_trg_Paradox_INIT = CreateTrigger()
    TriggerAddAction(gg_trg_Paradox_INIT, Trig_Paradox_INIT_Actions)
end

function Trig_Paradox_CAST_Conditions()
    if (not (GetSpellAbilityId() == FourCC("A04N"))) then
        return false
    end
    return true
end

function Trig_Paradox_CAST_Func028C()
    if (not (CountUnitsInGroup(udg_Paradox_GROUP) >= 1)) then
        return false
    end
    return true
end

function Trig_Paradox_CAST_Actions()
    udg_Spell_LOC_Cast = GetUnitLoc(GetSpellAbilityUnit())
    udg_Spell_Caster = GetSpellAbilityUnit()
    udg_Spell_Level = GetUnitAbilityLevelSwapped(FourCC("A04N"), GetSpellAbilityUnit())
    udg_CALC_Base = 9.00
    udg_CALC_Constant = 0.00
    udg_CALC_Level_Factor = 1.00
    udg_CALC_Previous_Value = 1.00
    udg_CALC_ITERATIONS = udg_Spell_Level
    ConditionalTriggerExecute(gg_trg_FUNC_Calculate_Level_Factor)
    udg_Spell_Duration = udg_CALC_RESULT
    GroupAddUnitSimple(GetSpellAbilityUnit(), udg_Paradox_GROUP)
    SaveRealBJ(0.00, 0, GetHandleIdBJ(GetSpellAbilityUnit()), udg_Paradox_HASH)
    SaveLocationHandleBJ(udg_Spell_LOC_Cast, 1, GetHandleIdBJ(GetSpellAbilityUnit()), udg_Paradox_HASH)
    SaveIntegerBJ(udg_Spell_Level, 3, GetHandleIdBJ(GetSpellAbilityUnit()), udg_Paradox_HASH)
    SaveRealBJ(udg_Spell_Duration, 4, GetHandleIdBJ(GetSpellAbilityUnit()), udg_Paradox_HASH)
    SaveUnitHandleBJ(GetLastCreatedUnit(), 2, GetHandleIdBJ(GetTriggerUnit()), udg_Paradox_HASH)
    UnitAddAbilityBJ(FourCC("S002"), GetLastCreatedUnit())
    SetUnitAbilityLevelSwapped(FourCC("S002"), GetLastCreatedUnit(), udg_Spell_Level)
    IssuePointOrderLocBJ(GetLastCreatedUnit(), "deathanddecay", udg_Spell_LOC_Cast)
    UnitApplyTimedLifeBJ(20.00, FourCC("BTLF"), GetLastCreatedUnit())
    if (Trig_Paradox_CAST_Func028C()) then
        EnableTrigger(gg_trg_Paradox_LOOP)
    else
    end
end

function InitTrig_Paradox_CAST()
    gg_trg_Paradox_CAST = CreateTrigger()
    TriggerRegisterAnyUnitEventBJ(gg_trg_Paradox_CAST, EVENT_PLAYER_UNIT_SPELL_EFFECT)
    TriggerAddCondition(gg_trg_Paradox_CAST, Condition(Trig_Paradox_CAST_Conditions))
    TriggerAddAction(gg_trg_Paradox_CAST, Trig_Paradox_CAST_Actions)
end

function Trig_Paradox_LOOP_Func001Func005Func003C()
    if (not (ModuloReal(udg_Spell_Counter, 1.00) == 1.00)) then
        return false
    end
    return true
end

function Trig_Paradox_LOOP_Func001Func005Func007C()
    if (not (CountUnitsInGroup(udg_Paradox_GROUP) == 0)) then
        return false
    end
    return true
end

function Trig_Paradox_LOOP_Func001Func005C()
    if (not (udg_Spell_Counter <= udg_Spell_Duration)) then
        return false
    end
    if (not (GetUnitCurrentOrder(GetEnumUnit()) == String2OrderIdBJ("tranquility"))) then
        return false
    end
    return true
end

function Trig_Paradox_LOOP_Func001A()
    udg_Spell_Counter = LoadRealBJ(0, GetHandleIdBJ(GetEnumUnit()), udg_Paradox_HASH)
    udg_Spell_LOC_Cast = LoadLocationHandleBJ(1, GetHandleIdBJ(GetEnumUnit()), udg_Paradox_HASH)
    udg_Spell_Level = LoadIntegerBJ(3, GetHandleIdBJ(GetEnumUnit()), udg_Paradox_HASH)
    udg_Spell_Duration = LoadRealBJ(4, GetHandleIdBJ(GetEnumUnit()), udg_Paradox_HASH)
    if (Trig_Paradox_LOOP_Func001Func005C()) then
        if (Trig_Paradox_LOOP_Func001Func005Func003C()) then
            UnitAddAbilityBJ(FourCC("A04O"), GetLastCreatedUnit())
            SetUnitAbilityLevelSwapped(FourCC("A04O"), GetLastCreatedUnit(), udg_Spell_Level)
            IssueImmediateOrderBJ(GetLastCreatedUnit(), "resurrection")
            UnitApplyTimedLifeBJ(2.00, FourCC("BTLF"), GetLastCreatedUnit())
        else
        end
        SaveRealBJ((udg_Spell_Counter + udg_Paradox_INTERVAL), 0, GetHandleIdBJ(GetEnumUnit()), udg_Paradox_HASH)
    else
        GroupRemoveUnitSimple(GetEnumUnit(), udg_Paradox_GROUP)
        FlushChildHashtableBJ(GetHandleIdBJ(GetEnumUnit()), udg_Paradox_HASH)
        if (Trig_Paradox_LOOP_Func001Func005Func007C()) then
            DisableTrigger(GetTriggeringTrigger())
        else
        end
    end
end

function Trig_Paradox_LOOP_Actions()
    ForGroupBJ(udg_Paradox_GROUP, Trig_Paradox_LOOP_Func001A)
end

function InitTrig_Paradox_LOOP()
    gg_trg_Paradox_LOOP = CreateTrigger()
    DisableTrigger(gg_trg_Paradox_LOOP)
    TriggerAddAction(gg_trg_Paradox_LOOP, Trig_Paradox_LOOP_Actions)
end

function Trig_Chrono_Atrophy_CAST_Conditions()
    if (not (GetSpellAbilityId() == FourCC("A04K"))) then
        return false
    end
    return true
end

function Trig_Chrono_Atrophy_CAST_Actions()
    udg_Spell_Caster = GetSpellAbilityUnit()
    udg_Spell_Level = GetUnitAbilityLevelSwapped(FourCC("A04K"), GetSpellAbilityUnit())
    udg_TEMP_Pos_Hero = GetUnitLoc(GetSpellAbilityUnit())
    udg_TEMP_Pos_Spell = GetSpellTargetLoc()
    udg_CALC_Base = 10.00
    udg_CALC_Constant = 0.00
    udg_CALC_Level_Factor = 1.00
    udg_CALC_Previous_Value = 1.00
    udg_CALC_ITERATIONS = udg_Spell_Level
    ConditionalTriggerExecute(gg_trg_FUNC_Calculate_Level_Factor)
    udg_Spell_Duration = udg_CALC_RESULT
    UnitAddAbilityBJ(FourCC("A04J"), GetLastCreatedUnit())
    SetUnitAbilityLevelSwapped(FourCC("A04J"), GetLastCreatedUnit(), udg_Spell_Level)
    UnitApplyTimedLifeBJ(30.00, FourCC("BTLF"), GetLastCreatedUnit())
    IssuePointOrderLocBJ(GetLastCreatedUnit(), "cloudoffog", udg_TEMP_Pos_Spell)
    UnitAddAbilityBJ(FourCC("A04M"), GetLastCreatedUnit())
    SetUnitAbilityLevelSwapped(FourCC("A04M"), GetLastCreatedUnit(), udg_Spell_Level)
    UnitApplyTimedLifeBJ(30.00, FourCC("BTLF"), GetLastCreatedUnit())
    IssuePointOrderLocBJ(GetLastCreatedUnit(), "cloudoffog", udg_TEMP_Pos_Spell)
        RemoveLocation ( udg_TEMP_Pos_Hero )
        RemoveLocation ( udg_TEMP_Pos_Spell )
end

function InitTrig_Chrono_Atrophy_CAST()
    gg_trg_Chrono_Atrophy_CAST = CreateTrigger()
    TriggerRegisterAnyUnitEventBJ(gg_trg_Chrono_Atrophy_CAST, EVENT_PLAYER_UNIT_SPELL_EFFECT)
    TriggerAddCondition(gg_trg_Chrono_Atrophy_CAST, Condition(Trig_Chrono_Atrophy_CAST_Conditions))
    TriggerAddAction(gg_trg_Chrono_Atrophy_CAST, Trig_Chrono_Atrophy_CAST_Actions)
end

function Trig_Time_Travel_INIT_Actions()
    InitHashtableBJ()
    udg_TimeTravel_HASH = GetLastCreatedHashtableBJ()
    udg_TimeTravel_INTERVAL = 0.50
    TriggerRegisterTimerEventPeriodic(gg_trg_Time_Travel_LOOP, udg_TimeTravel_INTERVAL)
end

function InitTrig_Time_Travel_INIT()
    gg_trg_Time_Travel_INIT = CreateTrigger()
    TriggerAddAction(gg_trg_Time_Travel_INIT, Trig_Time_Travel_INIT_Actions)
end

function Trig_Time_Travel_CAST_Conditions()
    if (not (GetSpellAbilityId() == FourCC("A04P"))) then
        return false
    end
    return true
end

function Trig_Time_Travel_CAST_Func018Func001Func002C()
    if (not (IsUnitType(GetEnumUnit(), UNIT_TYPE_HERO) == true)) then
        return false
    end
    return true
end

function Trig_Time_Travel_CAST_Func018Func001Func013C()
    if (not (IsUnitAlly(GetEnumUnit(), udg_Spell_Player) == true)) then
        return false
    end
    return true
end

function Trig_Time_Travel_CAST_Func018Func001C()
    if (not (IsUnitType(GetEnumUnit(), UNIT_TYPE_STRUCTURE) == false)) then
        return false
    end
    if (not (IsUnitAliveBJ(GetEnumUnit()) == true)) then
        return false
    end
    if (not (GetEnumUnit() ~= udg_Spell_Caster)) then
        return false
    end
    if (not (UnitHasBuffBJ(GetEnumUnit(), FourCC("B00E")) == false)) then
        return false
    end
    if (not (UnitHasBuffBJ(GetEnumUnit(), FourCC("B00D")) == false)) then
        return false
    end
    return true
end

function Trig_Time_Travel_CAST_Func018A()
    if (Trig_Time_Travel_CAST_Func018Func001C()) then
        GroupAddUnitSimple(GetEnumUnit(), udg_TimeTravel_GROUP)
        if (Trig_Time_Travel_CAST_Func018Func001Func002C()) then
            udg_Spell_Duration = 20.00
        else
            udg_Spell_Duration = 30.00
        end
        udg_Spell_Damage = (GetUnitStateSwap(UNIT_STATE_MAX_LIFE, GetEnumUnit()) * udg_TEMP_Real)
        udg_TEMP_Real_2 = GetUnitLifePercent(GetEnumUnit())
        SaveRealBJ(0.00, 0, GetHandleIdBJ(GetEnumUnit()), udg_TimeTravel_HASH)
        SaveRealBJ(udg_Spell_Damage, 2, GetHandleIdBJ(GetEnumUnit()), udg_TimeTravel_HASH)
        SaveIntegerBJ(udg_Spell_Level, 3, GetHandleIdBJ(GetEnumUnit()), udg_TimeTravel_HASH)
        SaveRealBJ(udg_Spell_Duration, 4, GetHandleIdBJ(GetEnumUnit()), udg_TimeTravel_HASH)
        SavePlayerHandleBJ(udg_Spell_Player, 9, GetHandleIdBJ(GetEnumUnit()), udg_TimeTravel_HASH)
        if (Trig_Time_Travel_CAST_Func018Func001Func013C()) then
            UnitAddAbilityBJ(FourCC("A04Q"), GetLastCreatedUnit())
            SetUnitAbilityLevelSwapped(FourCC("A04Q"), GetLastCreatedUnit(), udg_Spell_Level)
            BlzSetUnitMaxHP(GetEnumUnit(), (BlzGetUnitMaxHP(GetEnumUnit()) + R2I(udg_Spell_Damage)))
        else
            UnitAddAbilityBJ(FourCC("A04R"), GetLastCreatedUnit())
            SetUnitAbilityLevelSwapped(FourCC("A04R"), GetLastCreatedUnit(), udg_Spell_Level)
            BlzSetUnitMaxHP(GetEnumUnit(), (BlzGetUnitMaxHP(GetEnumUnit()) - R2I(udg_Spell_Damage)))
        end
        SetUnitLifePercentBJ(GetEnumUnit(), udg_TEMP_Real_2)
        IssueTargetOrderBJ(GetLastCreatedUnit(), "faeriefire", GetEnumUnit())
        UnitApplyTimedLifeBJ(1.00, FourCC("BTLF"), GetLastCreatedUnit())
    else
    end
end

function Trig_Time_Travel_CAST_Func023C()
    if (not (CountUnitsInGroup(udg_TimeTravel_GROUP) >= 1)) then
        return false
    end
    return true
end

function Trig_Time_Travel_CAST_Actions()
    udg_TEMP_Pos_Spell = GetSpellTargetLoc()
    udg_Spell_Caster = GetSpellAbilityUnit()
    udg_Spell_Player = GetOwningPlayer(udg_Spell_Caster)
    udg_Spell_Level = GetUnitAbilityLevelSwapped(FourCC("A04P"), udg_Spell_Caster)
    udg_CALC_Base = 0.10
    udg_CALC_Constant = 0.07
    udg_CALC_Level_Factor = 0.00
    udg_CALC_Previous_Value = 1.00
    udg_CALC_ITERATIONS = udg_Spell_Level
    ConditionalTriggerExecute(gg_trg_FUNC_Calculate_Level_Factor)
    udg_TEMP_Real = udg_CALC_RESULT
    udg_grp_TEMP_UnitGroup = GetUnitsInRangeOfLocAll(150.00, udg_TEMP_Pos_Spell)
    ForGroupBJ(udg_grp_TEMP_UnitGroup, Trig_Time_Travel_CAST_Func018A)
        RemoveLocation ( udg_TEMP_Pos_Spell )
        DestroyGroup ( udg_TEMP_UnitGroup )
    if (Trig_Time_Travel_CAST_Func023C()) then
        EnableTrigger(gg_trg_Time_Travel_LOOP)
    else
    end
end

function InitTrig_Time_Travel_CAST()
    gg_trg_Time_Travel_CAST = CreateTrigger()
    TriggerRegisterAnyUnitEventBJ(gg_trg_Time_Travel_CAST, EVENT_PLAYER_UNIT_SPELL_EFFECT)
    TriggerAddCondition(gg_trg_Time_Travel_CAST, Condition(Trig_Time_Travel_CAST_Conditions))
    TriggerAddAction(gg_trg_Time_Travel_CAST, Trig_Time_Travel_CAST_Actions)
end

function Trig_Time_Travel_LOOP_Func001Func004Func005C()
    if (UnitHasBuffBJ(GetEnumUnit(), FourCC("B00E")) == true) then
        return true
    end
    if (UnitHasBuffBJ(GetEnumUnit(), FourCC("B00D")) == true) then
        return true
    end
    return false
end

function Trig_Time_Travel_LOOP_Func001Func004Func007C()
    if (not (IsUnitAlly(GetEnumUnit(), udg_Spell_Player) == true)) then
        return false
    end
    return true
end

function Trig_Time_Travel_LOOP_Func001Func004C()
    if (not (udg_Spell_Counter <= udg_Spell_Duration)) then
        return false
    end
    if (not Trig_Time_Travel_LOOP_Func001Func004Func005C()) then
        return false
    end
    return true
end

function Trig_Time_Travel_LOOP_Func001A()
    udg_Spell_Counter = LoadRealBJ(0, GetHandleIdBJ(GetEnumUnit()), udg_TimeTravel_HASH)
    udg_Spell_Duration = LoadRealBJ(4, GetHandleIdBJ(GetEnumUnit()), udg_TimeTravel_HASH)
    if (Trig_Time_Travel_LOOP_Func001Func004C()) then
        SaveRealBJ((udg_Spell_Counter + udg_TimeTravel_INTERVAL), 0, GetHandleIdBJ(GetEnumUnit()), udg_TimeTravel_HASH)
    else
        udg_Spell_Player = LoadPlayerHandleBJ(9, GetHandleIdBJ(GetEnumUnit()), udg_TimeTravel_HASH)
        udg_Spell_Damage = LoadRealBJ(2, GetHandleIdBJ(GetEnumUnit()), udg_TimeTravel_HASH)
        if (Trig_Time_Travel_LOOP_Func001Func004Func007C()) then
            BlzSetUnitMaxHP(GetEnumUnit(), (BlzGetUnitMaxHP(GetEnumUnit()) - R2I(udg_Spell_Damage)))
        else
            BlzSetUnitMaxHP(GetEnumUnit(), (BlzGetUnitMaxHP(GetEnumUnit()) + R2I(udg_Spell_Damage)))
        end
        GroupRemoveUnitSimple(GetEnumUnit(), udg_TimeTravel_GROUP)
        FlushChildHashtableBJ(GetHandleIdBJ(GetEnumUnit()), udg_TimeTravel_HASH)
    end
end

function Trig_Time_Travel_LOOP_Func003C()
    if (not (CountUnitsInGroup(udg_TimeTravel_GROUP) == 0)) then
        return false
    end
    return true
end

function Trig_Time_Travel_LOOP_Actions()
    ForGroupBJ(udg_TimeTravel_GROUP, Trig_Time_Travel_LOOP_Func001A)
    if (Trig_Time_Travel_LOOP_Func003C()) then
        DisableTrigger(GetTriggeringTrigger())
    else
    end
end

function InitTrig_Time_Travel_LOOP()
    gg_trg_Time_Travel_LOOP = CreateTrigger()
    DisableTrigger(gg_trg_Time_Travel_LOOP)
    TriggerAddAction(gg_trg_Time_Travel_LOOP, Trig_Time_Travel_LOOP_Actions)
end

function Trig_Level_Up_Team_Func002C()
    if (not (IsUnitAlly(GetLevelingUnit(), ForcePickRandomPlayer(udg_force_allied)) == true)) then
        return false
    end
    return true
end

function Trig_Level_Up_Team_Func004002002001()
    return (IsUnitType(GetFilterUnit(), UNIT_TYPE_HERO) == true)
end

function Trig_Level_Up_Team_Func004002002002()
    return (IsUnitAlly(GetFilterUnit(), GetOwningPlayer(GetLevelingUnit())) == true)
end

function Trig_Level_Up_Team_Func004002002()
    return GetBooleanAnd(Trig_Level_Up_Team_Func004002002001(), Trig_Level_Up_Team_Func004002002002())
end

function Trig_Level_Up_Team_Func005Func001C()
    if (not (GetEnumUnit() ~= GetLevelingUnit())) then
        return false
    end
    if (not (IsUnitAliveBJ(GetEnumUnit()) == true)) then
        return false
    end
    return true
end

function Trig_Level_Up_Team_Func005A()
    if (Trig_Level_Up_Team_Func005Func001C()) then
        SetHeroLevelBJ(GetEnumUnit(), (GetHeroLevel(GetEnumUnit()) + 1), true)
    else
    end
end

function Trig_Level_Up_Team_Actions()
    DisableTrigger(GetTriggeringTrigger())
    if (Trig_Level_Up_Team_Func002C()) then
        udg_TEMP_Int2 = 1
    else
        udg_TEMP_Int2 = 2
    end
    udg_Hero_Levels[udg_TEMP_Int2] = GetHeroLevel(GetLevelingUnit())
    udg_grp_TEMP_UnitGroup = GetUnitsInRectMatching(GetPlayableMapRect(), Condition(Trig_Level_Up_Team_Func004002002))
    ForGroupBJ(udg_grp_TEMP_UnitGroup, Trig_Level_Up_Team_Func005A)
    EnableTrigger(GetTriggeringTrigger())
end

function InitTrig_Level_Up_Team()
    gg_trg_Level_Up_Team = CreateTrigger()
    TriggerRegisterAnyUnitEventBJ(gg_trg_Level_Up_Team, EVENT_PLAYER_HERO_LEVEL)
    TriggerAddAction(gg_trg_Level_Up_Team, Trig_Level_Up_Team_Actions)
end

function Trig_Revive_Hero_Conditions()
    if (not (IsUnitType(GetDyingUnit(), UNIT_TYPE_HERO) == true)) then
        return false
    end
    if (not (GetOwningPlayer(GetDyingUnit()) ~= Player(23))) then
        return false
    end
    if (not (GetOwningPlayer(GetDyingUnit()) ~= Player(22))) then
        return false
    end
    if (not (GetOwningPlayer(GetDyingUnit()) ~= Player(21))) then
        return false
    end
    if (not (GetOwningPlayer(GetDyingUnit()) ~= Player(20))) then
        return false
    end
    if (not (GetOwningPlayer(GetDyingUnit()) ~= Player(19))) then
        return false
    end
    if (not (GetOwningPlayer(GetDyingUnit()) ~= Player(18))) then
        return false
    end
    return true
end

function Trig_Revive_Hero_Func003Func003C()
    if (IsPlayerInForce(GetOwningPlayer(GetDyingUnit()), udg_force_allied) == true) then
        return true
    end
    if (IsPlayerInForce(GetOwningPlayer(GetDyingUnit()), udg_force_federation) == true) then
        return true
    end
    return false
end

function Trig_Revive_Hero_Func003C()
    if (not Trig_Revive_Hero_Func003Func003C()) then
        return false
    end
    return true
end

function Trig_Revive_Hero_Actions()
    DisplayTextToForce(GetPlayersAll(), ((GetPlayerName(GetOwningPlayer(GetKillingUnitBJ())) .. (" (" .. (GetUnitName(GetKillingUnitBJ()) .. ") "))) .. ("killed " .. (GetPlayerName(GetOwningPlayer(GetDyingUnit())) .. (" (" .. (GetUnitName(GetDyingUnit()) .. ")"))))))
    GroupAddUnitSimple(GetDyingUnit(), udg_grp_RevivableHeroes)
    if (Trig_Revive_Hero_Func003C()) then
        udg_TempReal = ((I2R(GetHeroLevel(GetDyingUnit())) * 3.00) + 70.00)
    else
        udg_TempReal = ((I2R(GetHeroLevel(GetDyingUnit())) * 1.50) + 8.00)
    end
    StartTimerBJ(udg_timer_Revive[GetConvertedPlayerId(GetOwningPlayer(GetDyingUnit()))], false, udg_TempReal)
    CreateTimerDialogBJ(GetLastCreatedTimerBJ(), GetPlayerName(GetOwningPlayer(GetDyingUnit())))
    udg_ReviveTimerWindows[GetConvertedPlayerId(GetOwningPlayer(GetDyingUnit()))] = GetLastCreatedTimerDialogBJ()
end

function InitTrig_Revive_Hero()
    gg_trg_Revive_Hero = CreateTrigger()
    TriggerRegisterAnyUnitEventBJ(gg_trg_Revive_Hero, EVENT_PLAYER_UNIT_DEATH)
    TriggerAddCondition(gg_trg_Revive_Hero, Condition(Trig_Revive_Hero_Conditions))
    TriggerAddAction(gg_trg_Revive_Hero, Trig_Revive_Hero_Actions)
end

function Trig_Revive_Hero_Timer_Func001Func001Func002Func001C()
    if (not (IsPlayerAlly(GetOwningPlayer(GetEnumUnit()), ForcePickRandomPlayer(udg_force_allied)) == true)) then
        return false
    end
    return true
end

function Trig_Revive_Hero_Timer_Func001Func001Func002Func003C()
    if (not (IsPlayerInForce(GetOwningPlayer(GetEnumUnit()), udg_force_allied) == true)) then
        return false
    end
    return true
end

function Trig_Revive_Hero_Timer_Func001Func001Func002Func004C()
    if (IsPlayerInForce(GetOwningPlayer(GetEnumUnit()), udg_force_allied) == true) then
        return true
    end
    if (IsPlayerInForce(GetOwningPlayer(GetEnumUnit()), udg_force_federation) == true) then
        return true
    end
    return false
end

function Trig_Revive_Hero_Timer_Func001Func001Func002C()
    if (not Trig_Revive_Hero_Timer_Func001Func001Func002Func004C()) then
        return false
    end
    return true
end

function Trig_Revive_Hero_Timer_Func001Func001C()
    if (not (TimerGetRemaining(udg_timer_Revive[GetConvertedPlayerId(GetOwningPlayer(GetEnumUnit()))]) < 1.00)) then
        return false
    end
    return true
end

function Trig_Revive_Hero_Timer_Func001A()
    if (Trig_Revive_Hero_Timer_Func001Func001C()) then
        DestroyTimerDialogBJ(udg_ReviveTimerWindows[GetConvertedPlayerId(GetOwningPlayer(GetEnumUnit()))])
        if (Trig_Revive_Hero_Timer_Func001Func001Func002C()) then
            if (Trig_Revive_Hero_Timer_Func001Func001Func002Func003C()) then
            else
            end
            ReviveHeroLoc(GetEnumUnit(), udg_TEMP_Pos_Hero, true)
            IssuePointOrderLocBJ(GetEnumUnit(), "attack", udg_TEMP_Pos2)
        else
            if (Trig_Revive_Hero_Timer_Func001Func001Func002Func001C()) then
            else
            end
            ReviveHeroLoc(GetEnumUnit(), udg_TEMP_Pos_Hero, true)
        end
        GroupRemoveUnitSimple(GetEnumUnit(), udg_grp_RevivableHeroes)
                RemoveLocation ( udg_TEMP_Pos_Hero )
                RemoveLocation ( udg_TEMP_Pos2 )
    else
    end
end

function Trig_Revive_Hero_Timer_Actions()
    ForGroupBJ(udg_grp_RevivableHeroes, Trig_Revive_Hero_Timer_Func001A)
end

function InitTrig_Revive_Hero_Timer()
    gg_trg_Revive_Hero_Timer = CreateTrigger()
    TriggerRegisterTimerExpireEventBJ(gg_trg_Revive_Hero_Timer, udg_timer_Revive[1])
    TriggerRegisterTimerExpireEventBJ(gg_trg_Revive_Hero_Timer, udg_timer_Revive[2])
    TriggerRegisterTimerExpireEventBJ(gg_trg_Revive_Hero_Timer, udg_timer_Revive[3])
    TriggerRegisterTimerExpireEventBJ(gg_trg_Revive_Hero_Timer, udg_timer_Revive[4])
    TriggerRegisterTimerExpireEventBJ(gg_trg_Revive_Hero_Timer, udg_timer_Revive[5])
    TriggerRegisterTimerExpireEventBJ(gg_trg_Revive_Hero_Timer, udg_timer_Revive[6])
    TriggerRegisterTimerExpireEventBJ(gg_trg_Revive_Hero_Timer, udg_timer_Revive[7])
    TriggerRegisterTimerExpireEventBJ(gg_trg_Revive_Hero_Timer, udg_timer_Revive[8])
    TriggerRegisterTimerExpireEventBJ(gg_trg_Revive_Hero_Timer, udg_timer_Revive[9])
    TriggerRegisterTimerExpireEventBJ(gg_trg_Revive_Hero_Timer, udg_timer_Revive[10])
    TriggerRegisterTimerExpireEventBJ(gg_trg_Revive_Hero_Timer, udg_timer_Revive[11])
    TriggerRegisterTimerExpireEventBJ(gg_trg_Revive_Hero_Timer, udg_timer_Revive[12])
    TriggerRegisterTimerExpireEventBJ(gg_trg_Revive_Hero_Timer, udg_timer_Revive[21])
    TriggerRegisterTimerExpireEventBJ(gg_trg_Revive_Hero_Timer, udg_timer_Revive[24])
    TriggerAddAction(gg_trg_Revive_Hero_Timer, Trig_Revive_Hero_Timer_Actions)
end

function Trig_End_Of_Game_Left_Actions()
    TriggerSleepAction(10.00)
    CustomVictoryBJ(Player(2), true, true)
    CustomVictoryBJ(Player(4), true, true)
    CustomVictoryBJ(Player(5), true, true)
    CustomDefeatBJ(Player(0), "TRIGSTR_356")
    CustomDefeatBJ(Player(1), "TRIGSTR_357")
    CustomDefeatBJ(Player(3), "TRIGSTR_358")
end

function InitTrig_End_Of_Game_Left()
    gg_trg_End_Of_Game_Left = CreateTrigger()
    TriggerRegisterAnyUnitEventBJ(gg_trg_End_Of_Game_Left, EVENT_PLAYER_UNIT_DEATH)
    TriggerAddAction(gg_trg_End_Of_Game_Left, Trig_End_Of_Game_Left_Actions)
end

function Trig_End_Of_Game_Right_Conditions()
    if (not (GetDyingUnit() == gg_unit_h00E_0081)) then
        return false
    end
    return true
end

function Trig_End_Of_Game_Right_Actions()
    TriggerSleepAction(10.00)
    CustomVictoryBJ(Player(1), true, true)
    CustomVictoryBJ(Player(3), true, true)
    CustomVictoryBJ(Player(0), true, true)
    CustomDefeatBJ(Player(1), "TRIGSTR_359")
    CustomDefeatBJ(Player(2), "TRIGSTR_360")
    CustomDefeatBJ(Player(5), "TRIGSTR_361")
end

function InitTrig_End_Of_Game_Right()
    gg_trg_End_Of_Game_Right = CreateTrigger()
    TriggerRegisterAnyUnitEventBJ(gg_trg_End_Of_Game_Right, EVENT_PLAYER_UNIT_DEATH)
    TriggerAddCondition(gg_trg_End_Of_Game_Right, Condition(Trig_End_Of_Game_Right_Conditions))
    TriggerAddAction(gg_trg_End_Of_Game_Right, Trig_End_Of_Game_Right_Actions)
end

function Trig_baseAndHeals_Actions()
    GroupAddUnitSimple(gg_unit_h00E_0081, udg_grp_UNIT_Bases[1])
    GroupAddUnitSimple(gg_unit_n00K_0477, udg_grp_UNIT_Bases[1])
    GroupAddGroup(udg_grp_UNIT_Bases[2], udg_grp_Bases_Teleport[1])
    GroupAddGroup(udg_grp_UNIT_Bases[1], udg_grp_Bases_Teleport[2])
    GroupAddUnitSimple(gg_unit_h00E_0081, udg_grp_Healing[2])
end

function InitTrig_baseAndHeals()
    gg_trg_baseAndHeals = CreateTrigger()
    TriggerAddAction(gg_trg_baseAndHeals, Trig_baseAndHeals_Actions)
end

function Trig_units_Actions()
end

function InitTrig_units()
    gg_trg_units = CreateTrigger()
    TriggerAddAction(gg_trg_units, Trig_units_Actions)
end

function InitCustomTriggers()
    InitTrig_Level100()
    InitTrig_fogofwar()
    InitTrig_testing()
    InitTrig_FUNC_Calculate_Level_Factor()
    InitTrig_Paradox_INIT()
    InitTrig_Paradox_CAST()
    InitTrig_Paradox_LOOP()
    InitTrig_Chrono_Atrophy_CAST()
    InitTrig_Time_Travel_INIT()
    InitTrig_Time_Travel_CAST()
    InitTrig_Time_Travel_LOOP()
    InitTrig_Level_Up_Team()
    InitTrig_Revive_Hero()
    InitTrig_Revive_Hero_Timer()
    InitTrig_End_Of_Game_Left()
    InitTrig_End_Of_Game_Right()
    InitTrig_baseAndHeals()
    InitTrig_units()
end

function RunInitializationTriggers()
    ConditionalTriggerExecute(gg_trg_Paradox_INIT)
    ConditionalTriggerExecute(gg_trg_Time_Travel_INIT)
end

function InitCustomPlayerSlots()
    SetPlayerStartLocation(Player(0), 0)
    ForcePlayerStartLocation(Player(0), 0)
    SetPlayerColor(Player(0), ConvertPlayerColor(0))
    SetPlayerRacePreference(Player(0), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(0), false)
    SetPlayerController(Player(0), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(1), 1)
    ForcePlayerStartLocation(Player(1), 1)
    SetPlayerColor(Player(1), ConvertPlayerColor(1))
    SetPlayerRacePreference(Player(1), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(1), false)
    SetPlayerController(Player(1), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(2), 2)
    ForcePlayerStartLocation(Player(2), 2)
    SetPlayerColor(Player(2), ConvertPlayerColor(2))
    SetPlayerRacePreference(Player(2), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(2), false)
    SetPlayerController(Player(2), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(3), 3)
    ForcePlayerStartLocation(Player(3), 3)
    SetPlayerColor(Player(3), ConvertPlayerColor(3))
    SetPlayerRacePreference(Player(3), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(3), false)
    SetPlayerController(Player(3), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(4), 4)
    ForcePlayerStartLocation(Player(4), 4)
    SetPlayerColor(Player(4), ConvertPlayerColor(4))
    SetPlayerRacePreference(Player(4), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(4), false)
    SetPlayerController(Player(4), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(5), 5)
    ForcePlayerStartLocation(Player(5), 5)
    SetPlayerColor(Player(5), ConvertPlayerColor(5))
    SetPlayerRacePreference(Player(5), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(5), false)
    SetPlayerController(Player(5), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(6), 6)
    ForcePlayerStartLocation(Player(6), 6)
    SetPlayerColor(Player(6), ConvertPlayerColor(6))
    SetPlayerRacePreference(Player(6), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(6), false)
    SetPlayerController(Player(6), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(7), 7)
    ForcePlayerStartLocation(Player(7), 7)
    SetPlayerColor(Player(7), ConvertPlayerColor(7))
    SetPlayerRacePreference(Player(7), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(7), false)
    SetPlayerController(Player(7), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(8), 8)
    ForcePlayerStartLocation(Player(8), 8)
    SetPlayerColor(Player(8), ConvertPlayerColor(8))
    SetPlayerRacePreference(Player(8), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(8), false)
    SetPlayerController(Player(8), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(9), 9)
    ForcePlayerStartLocation(Player(9), 9)
    SetPlayerColor(Player(9), ConvertPlayerColor(9))
    SetPlayerRacePreference(Player(9), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(9), false)
    SetPlayerController(Player(9), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(10), 10)
    ForcePlayerStartLocation(Player(10), 10)
    SetPlayerColor(Player(10), ConvertPlayerColor(10))
    SetPlayerRacePreference(Player(10), RACE_PREF_UNDEAD)
    SetPlayerRaceSelectable(Player(10), false)
    SetPlayerController(Player(10), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(11), 11)
    ForcePlayerStartLocation(Player(11), 11)
    SetPlayerColor(Player(11), ConvertPlayerColor(11))
    SetPlayerRacePreference(Player(11), RACE_PREF_NIGHTELF)
    SetPlayerRaceSelectable(Player(11), false)
    SetPlayerController(Player(11), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(18), 12)
    SetPlayerColor(Player(18), ConvertPlayerColor(18))
    SetPlayerRacePreference(Player(18), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(18), false)
    SetPlayerController(Player(18), MAP_CONTROL_COMPUTER)
    SetPlayerStartLocation(Player(19), 13)
    SetPlayerColor(Player(19), ConvertPlayerColor(19))
    SetPlayerRacePreference(Player(19), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(19), false)
    SetPlayerController(Player(19), MAP_CONTROL_COMPUTER)
    SetPlayerStartLocation(Player(20), 14)
    SetPlayerColor(Player(20), ConvertPlayerColor(20))
    SetPlayerRacePreference(Player(20), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(20), false)
    SetPlayerController(Player(20), MAP_CONTROL_COMPUTER)
    SetPlayerStartLocation(Player(21), 15)
    SetPlayerColor(Player(21), ConvertPlayerColor(21))
    SetPlayerRacePreference(Player(21), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(21), false)
    SetPlayerController(Player(21), MAP_CONTROL_COMPUTER)
    SetPlayerStartLocation(Player(22), 16)
    SetPlayerColor(Player(22), ConvertPlayerColor(22))
    SetPlayerRacePreference(Player(22), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(22), false)
    SetPlayerController(Player(22), MAP_CONTROL_COMPUTER)
    SetPlayerStartLocation(Player(23), 17)
    SetPlayerColor(Player(23), ConvertPlayerColor(23))
    SetPlayerRacePreference(Player(23), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(23), false)
    SetPlayerController(Player(23), MAP_CONTROL_COMPUTER)
end

function InitCustomTeams()
    SetPlayerTeam(Player(0), 0)
    SetPlayerState(Player(0), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(1), 0)
    SetPlayerState(Player(1), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(2), 0)
    SetPlayerState(Player(2), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(3), 0)
    SetPlayerState(Player(3), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(4), 0)
    SetPlayerState(Player(4), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(5), 0)
    SetPlayerState(Player(5), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(18), 0)
    SetPlayerState(Player(18), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(19), 0)
    SetPlayerState(Player(19), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(20), 0)
    SetPlayerState(Player(20), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerAllianceStateAllyBJ(Player(0), Player(1), true)
    SetPlayerAllianceStateAllyBJ(Player(0), Player(2), true)
    SetPlayerAllianceStateAllyBJ(Player(0), Player(3), true)
    SetPlayerAllianceStateAllyBJ(Player(0), Player(4), true)
    SetPlayerAllianceStateAllyBJ(Player(0), Player(5), true)
    SetPlayerAllianceStateAllyBJ(Player(0), Player(18), true)
    SetPlayerAllianceStateAllyBJ(Player(0), Player(19), true)
    SetPlayerAllianceStateAllyBJ(Player(0), Player(20), true)
    SetPlayerAllianceStateAllyBJ(Player(1), Player(0), true)
    SetPlayerAllianceStateAllyBJ(Player(1), Player(2), true)
    SetPlayerAllianceStateAllyBJ(Player(1), Player(3), true)
    SetPlayerAllianceStateAllyBJ(Player(1), Player(4), true)
    SetPlayerAllianceStateAllyBJ(Player(1), Player(5), true)
    SetPlayerAllianceStateAllyBJ(Player(1), Player(18), true)
    SetPlayerAllianceStateAllyBJ(Player(1), Player(19), true)
    SetPlayerAllianceStateAllyBJ(Player(1), Player(20), true)
    SetPlayerAllianceStateAllyBJ(Player(2), Player(0), true)
    SetPlayerAllianceStateAllyBJ(Player(2), Player(1), true)
    SetPlayerAllianceStateAllyBJ(Player(2), Player(3), true)
    SetPlayerAllianceStateAllyBJ(Player(2), Player(4), true)
    SetPlayerAllianceStateAllyBJ(Player(2), Player(5), true)
    SetPlayerAllianceStateAllyBJ(Player(2), Player(18), true)
    SetPlayerAllianceStateAllyBJ(Player(2), Player(19), true)
    SetPlayerAllianceStateAllyBJ(Player(2), Player(20), true)
    SetPlayerAllianceStateAllyBJ(Player(3), Player(0), true)
    SetPlayerAllianceStateAllyBJ(Player(3), Player(1), true)
    SetPlayerAllianceStateAllyBJ(Player(3), Player(2), true)
    SetPlayerAllianceStateAllyBJ(Player(3), Player(4), true)
    SetPlayerAllianceStateAllyBJ(Player(3), Player(5), true)
    SetPlayerAllianceStateAllyBJ(Player(3), Player(18), true)
    SetPlayerAllianceStateAllyBJ(Player(3), Player(19), true)
    SetPlayerAllianceStateAllyBJ(Player(3), Player(20), true)
    SetPlayerAllianceStateAllyBJ(Player(4), Player(0), true)
    SetPlayerAllianceStateAllyBJ(Player(4), Player(1), true)
    SetPlayerAllianceStateAllyBJ(Player(4), Player(2), true)
    SetPlayerAllianceStateAllyBJ(Player(4), Player(3), true)
    SetPlayerAllianceStateAllyBJ(Player(4), Player(5), true)
    SetPlayerAllianceStateAllyBJ(Player(4), Player(18), true)
    SetPlayerAllianceStateAllyBJ(Player(4), Player(19), true)
    SetPlayerAllianceStateAllyBJ(Player(4), Player(20), true)
    SetPlayerAllianceStateAllyBJ(Player(5), Player(0), true)
    SetPlayerAllianceStateAllyBJ(Player(5), Player(1), true)
    SetPlayerAllianceStateAllyBJ(Player(5), Player(2), true)
    SetPlayerAllianceStateAllyBJ(Player(5), Player(3), true)
    SetPlayerAllianceStateAllyBJ(Player(5), Player(4), true)
    SetPlayerAllianceStateAllyBJ(Player(5), Player(18), true)
    SetPlayerAllianceStateAllyBJ(Player(5), Player(19), true)
    SetPlayerAllianceStateAllyBJ(Player(5), Player(20), true)
    SetPlayerAllianceStateAllyBJ(Player(18), Player(0), true)
    SetPlayerAllianceStateAllyBJ(Player(18), Player(1), true)
    SetPlayerAllianceStateAllyBJ(Player(18), Player(2), true)
    SetPlayerAllianceStateAllyBJ(Player(18), Player(3), true)
    SetPlayerAllianceStateAllyBJ(Player(18), Player(4), true)
    SetPlayerAllianceStateAllyBJ(Player(18), Player(5), true)
    SetPlayerAllianceStateAllyBJ(Player(18), Player(19), true)
    SetPlayerAllianceStateAllyBJ(Player(18), Player(20), true)
    SetPlayerAllianceStateAllyBJ(Player(19), Player(0), true)
    SetPlayerAllianceStateAllyBJ(Player(19), Player(1), true)
    SetPlayerAllianceStateAllyBJ(Player(19), Player(2), true)
    SetPlayerAllianceStateAllyBJ(Player(19), Player(3), true)
    SetPlayerAllianceStateAllyBJ(Player(19), Player(4), true)
    SetPlayerAllianceStateAllyBJ(Player(19), Player(5), true)
    SetPlayerAllianceStateAllyBJ(Player(19), Player(18), true)
    SetPlayerAllianceStateAllyBJ(Player(19), Player(20), true)
    SetPlayerAllianceStateAllyBJ(Player(20), Player(0), true)
    SetPlayerAllianceStateAllyBJ(Player(20), Player(1), true)
    SetPlayerAllianceStateAllyBJ(Player(20), Player(2), true)
    SetPlayerAllianceStateAllyBJ(Player(20), Player(3), true)
    SetPlayerAllianceStateAllyBJ(Player(20), Player(4), true)
    SetPlayerAllianceStateAllyBJ(Player(20), Player(5), true)
    SetPlayerAllianceStateAllyBJ(Player(20), Player(18), true)
    SetPlayerAllianceStateAllyBJ(Player(20), Player(19), true)
    SetPlayerAllianceStateVisionBJ(Player(0), Player(1), true)
    SetPlayerAllianceStateVisionBJ(Player(0), Player(2), true)
    SetPlayerAllianceStateVisionBJ(Player(0), Player(3), true)
    SetPlayerAllianceStateVisionBJ(Player(0), Player(4), true)
    SetPlayerAllianceStateVisionBJ(Player(0), Player(5), true)
    SetPlayerAllianceStateVisionBJ(Player(0), Player(18), true)
    SetPlayerAllianceStateVisionBJ(Player(0), Player(19), true)
    SetPlayerAllianceStateVisionBJ(Player(0), Player(20), true)
    SetPlayerAllianceStateVisionBJ(Player(1), Player(0), true)
    SetPlayerAllianceStateVisionBJ(Player(1), Player(2), true)
    SetPlayerAllianceStateVisionBJ(Player(1), Player(3), true)
    SetPlayerAllianceStateVisionBJ(Player(1), Player(4), true)
    SetPlayerAllianceStateVisionBJ(Player(1), Player(5), true)
    SetPlayerAllianceStateVisionBJ(Player(1), Player(18), true)
    SetPlayerAllianceStateVisionBJ(Player(1), Player(19), true)
    SetPlayerAllianceStateVisionBJ(Player(1), Player(20), true)
    SetPlayerAllianceStateVisionBJ(Player(2), Player(0), true)
    SetPlayerAllianceStateVisionBJ(Player(2), Player(1), true)
    SetPlayerAllianceStateVisionBJ(Player(2), Player(3), true)
    SetPlayerAllianceStateVisionBJ(Player(2), Player(4), true)
    SetPlayerAllianceStateVisionBJ(Player(2), Player(5), true)
    SetPlayerAllianceStateVisionBJ(Player(2), Player(18), true)
    SetPlayerAllianceStateVisionBJ(Player(2), Player(19), true)
    SetPlayerAllianceStateVisionBJ(Player(2), Player(20), true)
    SetPlayerAllianceStateVisionBJ(Player(3), Player(0), true)
    SetPlayerAllianceStateVisionBJ(Player(3), Player(1), true)
    SetPlayerAllianceStateVisionBJ(Player(3), Player(2), true)
    SetPlayerAllianceStateVisionBJ(Player(3), Player(4), true)
    SetPlayerAllianceStateVisionBJ(Player(3), Player(5), true)
    SetPlayerAllianceStateVisionBJ(Player(3), Player(18), true)
    SetPlayerAllianceStateVisionBJ(Player(3), Player(19), true)
    SetPlayerAllianceStateVisionBJ(Player(3), Player(20), true)
    SetPlayerAllianceStateVisionBJ(Player(4), Player(0), true)
    SetPlayerAllianceStateVisionBJ(Player(4), Player(1), true)
    SetPlayerAllianceStateVisionBJ(Player(4), Player(2), true)
    SetPlayerAllianceStateVisionBJ(Player(4), Player(3), true)
    SetPlayerAllianceStateVisionBJ(Player(4), Player(5), true)
    SetPlayerAllianceStateVisionBJ(Player(4), Player(18), true)
    SetPlayerAllianceStateVisionBJ(Player(4), Player(19), true)
    SetPlayerAllianceStateVisionBJ(Player(4), Player(20), true)
    SetPlayerAllianceStateVisionBJ(Player(5), Player(0), true)
    SetPlayerAllianceStateVisionBJ(Player(5), Player(1), true)
    SetPlayerAllianceStateVisionBJ(Player(5), Player(2), true)
    SetPlayerAllianceStateVisionBJ(Player(5), Player(3), true)
    SetPlayerAllianceStateVisionBJ(Player(5), Player(4), true)
    SetPlayerAllianceStateVisionBJ(Player(5), Player(18), true)
    SetPlayerAllianceStateVisionBJ(Player(5), Player(19), true)
    SetPlayerAllianceStateVisionBJ(Player(5), Player(20), true)
    SetPlayerAllianceStateVisionBJ(Player(18), Player(0), true)
    SetPlayerAllianceStateVisionBJ(Player(18), Player(1), true)
    SetPlayerAllianceStateVisionBJ(Player(18), Player(2), true)
    SetPlayerAllianceStateVisionBJ(Player(18), Player(3), true)
    SetPlayerAllianceStateVisionBJ(Player(18), Player(4), true)
    SetPlayerAllianceStateVisionBJ(Player(18), Player(5), true)
    SetPlayerAllianceStateVisionBJ(Player(18), Player(19), true)
    SetPlayerAllianceStateVisionBJ(Player(18), Player(20), true)
    SetPlayerAllianceStateVisionBJ(Player(19), Player(0), true)
    SetPlayerAllianceStateVisionBJ(Player(19), Player(1), true)
    SetPlayerAllianceStateVisionBJ(Player(19), Player(2), true)
    SetPlayerAllianceStateVisionBJ(Player(19), Player(3), true)
    SetPlayerAllianceStateVisionBJ(Player(19), Player(4), true)
    SetPlayerAllianceStateVisionBJ(Player(19), Player(5), true)
    SetPlayerAllianceStateVisionBJ(Player(19), Player(18), true)
    SetPlayerAllianceStateVisionBJ(Player(19), Player(20), true)
    SetPlayerAllianceStateVisionBJ(Player(20), Player(0), true)
    SetPlayerAllianceStateVisionBJ(Player(20), Player(1), true)
    SetPlayerAllianceStateVisionBJ(Player(20), Player(2), true)
    SetPlayerAllianceStateVisionBJ(Player(20), Player(3), true)
    SetPlayerAllianceStateVisionBJ(Player(20), Player(4), true)
    SetPlayerAllianceStateVisionBJ(Player(20), Player(5), true)
    SetPlayerAllianceStateVisionBJ(Player(20), Player(18), true)
    SetPlayerAllianceStateVisionBJ(Player(20), Player(19), true)
    SetPlayerTeam(Player(6), 1)
    SetPlayerState(Player(6), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(7), 1)
    SetPlayerState(Player(7), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(8), 1)
    SetPlayerState(Player(8), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(9), 1)
    SetPlayerState(Player(9), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(10), 1)
    SetPlayerState(Player(10), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(11), 1)
    SetPlayerState(Player(11), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(21), 1)
    SetPlayerState(Player(21), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(22), 1)
    SetPlayerState(Player(22), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(23), 1)
    SetPlayerState(Player(23), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerAllianceStateAllyBJ(Player(6), Player(7), true)
    SetPlayerAllianceStateAllyBJ(Player(6), Player(8), true)
    SetPlayerAllianceStateAllyBJ(Player(6), Player(9), true)
    SetPlayerAllianceStateAllyBJ(Player(6), Player(10), true)
    SetPlayerAllianceStateAllyBJ(Player(6), Player(11), true)
    SetPlayerAllianceStateAllyBJ(Player(6), Player(21), true)
    SetPlayerAllianceStateAllyBJ(Player(6), Player(22), true)
    SetPlayerAllianceStateAllyBJ(Player(6), Player(23), true)
    SetPlayerAllianceStateAllyBJ(Player(7), Player(6), true)
    SetPlayerAllianceStateAllyBJ(Player(7), Player(8), true)
    SetPlayerAllianceStateAllyBJ(Player(7), Player(9), true)
    SetPlayerAllianceStateAllyBJ(Player(7), Player(10), true)
    SetPlayerAllianceStateAllyBJ(Player(7), Player(11), true)
    SetPlayerAllianceStateAllyBJ(Player(7), Player(21), true)
    SetPlayerAllianceStateAllyBJ(Player(7), Player(22), true)
    SetPlayerAllianceStateAllyBJ(Player(7), Player(23), true)
    SetPlayerAllianceStateAllyBJ(Player(8), Player(6), true)
    SetPlayerAllianceStateAllyBJ(Player(8), Player(7), true)
    SetPlayerAllianceStateAllyBJ(Player(8), Player(9), true)
    SetPlayerAllianceStateAllyBJ(Player(8), Player(10), true)
    SetPlayerAllianceStateAllyBJ(Player(8), Player(11), true)
    SetPlayerAllianceStateAllyBJ(Player(8), Player(21), true)
    SetPlayerAllianceStateAllyBJ(Player(8), Player(22), true)
    SetPlayerAllianceStateAllyBJ(Player(8), Player(23), true)
    SetPlayerAllianceStateAllyBJ(Player(9), Player(6), true)
    SetPlayerAllianceStateAllyBJ(Player(9), Player(7), true)
    SetPlayerAllianceStateAllyBJ(Player(9), Player(8), true)
    SetPlayerAllianceStateAllyBJ(Player(9), Player(10), true)
    SetPlayerAllianceStateAllyBJ(Player(9), Player(11), true)
    SetPlayerAllianceStateAllyBJ(Player(9), Player(21), true)
    SetPlayerAllianceStateAllyBJ(Player(9), Player(22), true)
    SetPlayerAllianceStateAllyBJ(Player(9), Player(23), true)
    SetPlayerAllianceStateAllyBJ(Player(10), Player(6), true)
    SetPlayerAllianceStateAllyBJ(Player(10), Player(7), true)
    SetPlayerAllianceStateAllyBJ(Player(10), Player(8), true)
    SetPlayerAllianceStateAllyBJ(Player(10), Player(9), true)
    SetPlayerAllianceStateAllyBJ(Player(10), Player(11), true)
    SetPlayerAllianceStateAllyBJ(Player(10), Player(21), true)
    SetPlayerAllianceStateAllyBJ(Player(10), Player(22), true)
    SetPlayerAllianceStateAllyBJ(Player(10), Player(23), true)
    SetPlayerAllianceStateAllyBJ(Player(11), Player(6), true)
    SetPlayerAllianceStateAllyBJ(Player(11), Player(7), true)
    SetPlayerAllianceStateAllyBJ(Player(11), Player(8), true)
    SetPlayerAllianceStateAllyBJ(Player(11), Player(9), true)
    SetPlayerAllianceStateAllyBJ(Player(11), Player(10), true)
    SetPlayerAllianceStateAllyBJ(Player(11), Player(21), true)
    SetPlayerAllianceStateAllyBJ(Player(11), Player(22), true)
    SetPlayerAllianceStateAllyBJ(Player(11), Player(23), true)
    SetPlayerAllianceStateAllyBJ(Player(21), Player(6), true)
    SetPlayerAllianceStateAllyBJ(Player(21), Player(7), true)
    SetPlayerAllianceStateAllyBJ(Player(21), Player(8), true)
    SetPlayerAllianceStateAllyBJ(Player(21), Player(9), true)
    SetPlayerAllianceStateAllyBJ(Player(21), Player(10), true)
    SetPlayerAllianceStateAllyBJ(Player(21), Player(11), true)
    SetPlayerAllianceStateAllyBJ(Player(21), Player(22), true)
    SetPlayerAllianceStateAllyBJ(Player(21), Player(23), true)
    SetPlayerAllianceStateAllyBJ(Player(22), Player(6), true)
    SetPlayerAllianceStateAllyBJ(Player(22), Player(7), true)
    SetPlayerAllianceStateAllyBJ(Player(22), Player(8), true)
    SetPlayerAllianceStateAllyBJ(Player(22), Player(9), true)
    SetPlayerAllianceStateAllyBJ(Player(22), Player(10), true)
    SetPlayerAllianceStateAllyBJ(Player(22), Player(11), true)
    SetPlayerAllianceStateAllyBJ(Player(22), Player(21), true)
    SetPlayerAllianceStateAllyBJ(Player(22), Player(23), true)
    SetPlayerAllianceStateAllyBJ(Player(23), Player(6), true)
    SetPlayerAllianceStateAllyBJ(Player(23), Player(7), true)
    SetPlayerAllianceStateAllyBJ(Player(23), Player(8), true)
    SetPlayerAllianceStateAllyBJ(Player(23), Player(9), true)
    SetPlayerAllianceStateAllyBJ(Player(23), Player(10), true)
    SetPlayerAllianceStateAllyBJ(Player(23), Player(11), true)
    SetPlayerAllianceStateAllyBJ(Player(23), Player(21), true)
    SetPlayerAllianceStateAllyBJ(Player(23), Player(22), true)
    SetPlayerAllianceStateVisionBJ(Player(6), Player(7), true)
    SetPlayerAllianceStateVisionBJ(Player(6), Player(8), true)
    SetPlayerAllianceStateVisionBJ(Player(6), Player(9), true)
    SetPlayerAllianceStateVisionBJ(Player(6), Player(10), true)
    SetPlayerAllianceStateVisionBJ(Player(6), Player(11), true)
    SetPlayerAllianceStateVisionBJ(Player(6), Player(21), true)
    SetPlayerAllianceStateVisionBJ(Player(6), Player(22), true)
    SetPlayerAllianceStateVisionBJ(Player(6), Player(23), true)
    SetPlayerAllianceStateVisionBJ(Player(7), Player(6), true)
    SetPlayerAllianceStateVisionBJ(Player(7), Player(8), true)
    SetPlayerAllianceStateVisionBJ(Player(7), Player(9), true)
    SetPlayerAllianceStateVisionBJ(Player(7), Player(10), true)
    SetPlayerAllianceStateVisionBJ(Player(7), Player(11), true)
    SetPlayerAllianceStateVisionBJ(Player(7), Player(21), true)
    SetPlayerAllianceStateVisionBJ(Player(7), Player(22), true)
    SetPlayerAllianceStateVisionBJ(Player(7), Player(23), true)
    SetPlayerAllianceStateVisionBJ(Player(8), Player(6), true)
    SetPlayerAllianceStateVisionBJ(Player(8), Player(7), true)
    SetPlayerAllianceStateVisionBJ(Player(8), Player(9), true)
    SetPlayerAllianceStateVisionBJ(Player(8), Player(10), true)
    SetPlayerAllianceStateVisionBJ(Player(8), Player(11), true)
    SetPlayerAllianceStateVisionBJ(Player(8), Player(21), true)
    SetPlayerAllianceStateVisionBJ(Player(8), Player(22), true)
    SetPlayerAllianceStateVisionBJ(Player(8), Player(23), true)
    SetPlayerAllianceStateVisionBJ(Player(9), Player(6), true)
    SetPlayerAllianceStateVisionBJ(Player(9), Player(7), true)
    SetPlayerAllianceStateVisionBJ(Player(9), Player(8), true)
    SetPlayerAllianceStateVisionBJ(Player(9), Player(10), true)
    SetPlayerAllianceStateVisionBJ(Player(9), Player(11), true)
    SetPlayerAllianceStateVisionBJ(Player(9), Player(21), true)
    SetPlayerAllianceStateVisionBJ(Player(9), Player(22), true)
    SetPlayerAllianceStateVisionBJ(Player(9), Player(23), true)
    SetPlayerAllianceStateVisionBJ(Player(10), Player(6), true)
    SetPlayerAllianceStateVisionBJ(Player(10), Player(7), true)
    SetPlayerAllianceStateVisionBJ(Player(10), Player(8), true)
    SetPlayerAllianceStateVisionBJ(Player(10), Player(9), true)
    SetPlayerAllianceStateVisionBJ(Player(10), Player(11), true)
    SetPlayerAllianceStateVisionBJ(Player(10), Player(21), true)
    SetPlayerAllianceStateVisionBJ(Player(10), Player(22), true)
    SetPlayerAllianceStateVisionBJ(Player(10), Player(23), true)
    SetPlayerAllianceStateVisionBJ(Player(11), Player(6), true)
    SetPlayerAllianceStateVisionBJ(Player(11), Player(7), true)
    SetPlayerAllianceStateVisionBJ(Player(11), Player(8), true)
    SetPlayerAllianceStateVisionBJ(Player(11), Player(9), true)
    SetPlayerAllianceStateVisionBJ(Player(11), Player(10), true)
    SetPlayerAllianceStateVisionBJ(Player(11), Player(21), true)
    SetPlayerAllianceStateVisionBJ(Player(11), Player(22), true)
    SetPlayerAllianceStateVisionBJ(Player(11), Player(23), true)
    SetPlayerAllianceStateVisionBJ(Player(21), Player(6), true)
    SetPlayerAllianceStateVisionBJ(Player(21), Player(7), true)
    SetPlayerAllianceStateVisionBJ(Player(21), Player(8), true)
    SetPlayerAllianceStateVisionBJ(Player(21), Player(9), true)
    SetPlayerAllianceStateVisionBJ(Player(21), Player(10), true)
    SetPlayerAllianceStateVisionBJ(Player(21), Player(11), true)
    SetPlayerAllianceStateVisionBJ(Player(21), Player(22), true)
    SetPlayerAllianceStateVisionBJ(Player(21), Player(23), true)
    SetPlayerAllianceStateVisionBJ(Player(22), Player(6), true)
    SetPlayerAllianceStateVisionBJ(Player(22), Player(7), true)
    SetPlayerAllianceStateVisionBJ(Player(22), Player(8), true)
    SetPlayerAllianceStateVisionBJ(Player(22), Player(9), true)
    SetPlayerAllianceStateVisionBJ(Player(22), Player(10), true)
    SetPlayerAllianceStateVisionBJ(Player(22), Player(11), true)
    SetPlayerAllianceStateVisionBJ(Player(22), Player(21), true)
    SetPlayerAllianceStateVisionBJ(Player(22), Player(23), true)
    SetPlayerAllianceStateVisionBJ(Player(23), Player(6), true)
    SetPlayerAllianceStateVisionBJ(Player(23), Player(7), true)
    SetPlayerAllianceStateVisionBJ(Player(23), Player(8), true)
    SetPlayerAllianceStateVisionBJ(Player(23), Player(9), true)
    SetPlayerAllianceStateVisionBJ(Player(23), Player(10), true)
    SetPlayerAllianceStateVisionBJ(Player(23), Player(11), true)
    SetPlayerAllianceStateVisionBJ(Player(23), Player(21), true)
    SetPlayerAllianceStateVisionBJ(Player(23), Player(22), true)
end

function InitAllyPriorities()
    SetStartLocPrioCount(0, 1)
    SetStartLocPrio(0, 0, 9, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(1, 3)
    SetStartLocPrio(1, 0, 0, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(1, 1, 6, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(1, 2, 9, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(2, 1)
    SetStartLocPrio(2, 0, 8, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(3, 3)
    SetStartLocPrio(3, 0, 4, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(3, 1, 5, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(3, 2, 7, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(4, 2)
    SetStartLocPrio(4, 0, 5, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(4, 1, 7, MAP_LOC_PRIO_LOW)
    SetStartLocPrioCount(5, 2)
    SetStartLocPrio(5, 0, 4, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(5, 1, 7, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(6, 7)
    SetStartLocPrio(6, 0, 0, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(6, 1, 1, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(6, 2, 5, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(6, 3, 7, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(6, 4, 9, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(6, 5, 10, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(6, 6, 11, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(7, 1)
    SetStartLocPrio(7, 0, 5, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(8, 3)
    SetStartLocPrio(8, 0, 0, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(8, 1, 1, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(8, 2, 2, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(9, 1)
    SetStartLocPrio(9, 0, 0, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(10, 2)
    SetStartLocPrio(10, 0, 5, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(10, 1, 11, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(11, 1)
    SetStartLocPrio(11, 0, 10, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(12, 2)
    SetStartLocPrio(12, 0, 5, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(12, 1, 17, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrioCount(12, 13)
    SetEnemyStartLocPrio(12, 0, 0, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(12, 1, 1, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(12, 2, 5, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(12, 3, 6, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(12, 4, 7, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(12, 5, 8, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(12, 6, 9, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(12, 7, 10, MAP_LOC_PRIO_HIGH)
    SetEnemyStartLocPrio(12, 8, 11, MAP_LOC_PRIO_HIGH)
    SetEnemyStartLocPrio(12, 9, 13, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(12, 10, 15, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(12, 11, 16, MAP_LOC_PRIO_LOW)
    SetStartLocPrioCount(13, 10)
    SetStartLocPrio(13, 0, 0, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(13, 1, 1, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(13, 2, 2, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(13, 3, 3, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(13, 4, 12, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(13, 5, 14, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(13, 6, 15, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(13, 7, 16, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(13, 8, 17, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrioCount(13, 8)
    SetEnemyStartLocPrio(13, 0, 6, MAP_LOC_PRIO_HIGH)
    SetEnemyStartLocPrio(13, 1, 7, MAP_LOC_PRIO_HIGH)
    SetEnemyStartLocPrio(13, 2, 8, MAP_LOC_PRIO_HIGH)
    SetEnemyStartLocPrio(13, 3, 9, MAP_LOC_PRIO_HIGH)
    SetEnemyStartLocPrio(13, 4, 12, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(13, 5, 14, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(13, 6, 16, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(13, 7, 17, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrioCount(14, 3)
    SetEnemyStartLocPrio(14, 0, 6, MAP_LOC_PRIO_HIGH)
    SetEnemyStartLocPrio(14, 1, 7, MAP_LOC_PRIO_HIGH)
    SetEnemyStartLocPrio(14, 2, 8, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(15, 4)
    SetStartLocPrio(15, 0, 2, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(15, 1, 12, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(15, 2, 17, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrioCount(15, 5)
    SetEnemyStartLocPrio(15, 0, 2, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(15, 1, 6, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(15, 2, 12, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(15, 3, 17, MAP_LOC_PRIO_LOW)
    SetStartLocPrioCount(16, 4)
    SetStartLocPrio(16, 0, 2, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(16, 1, 12, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(16, 2, 15, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(16, 3, 17, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrioCount(16, 4)
    SetEnemyStartLocPrio(16, 0, 2, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(16, 1, 12, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(16, 2, 15, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(16, 3, 17, MAP_LOC_PRIO_LOW)
    SetStartLocPrioCount(17, 7)
    SetStartLocPrio(17, 0, 2, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(17, 1, 6, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(17, 2, 7, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(17, 3, 8, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(17, 4, 12, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(17, 5, 15, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrioCount(17, 4)
    SetEnemyStartLocPrio(17, 0, 2, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(17, 1, 12, MAP_LOC_PRIO_LOW)
    SetEnemyStartLocPrio(17, 2, 15, MAP_LOC_PRIO_LOW)
end

function main()
    SetCameraBounds(-19712.0 + GetCameraMargin(CAMERA_MARGIN_LEFT), -14208.0 + GetCameraMargin(CAMERA_MARGIN_BOTTOM), 6144.0 - GetCameraMargin(CAMERA_MARGIN_RIGHT), 4992.0 - GetCameraMargin(CAMERA_MARGIN_TOP), -19712.0 + GetCameraMargin(CAMERA_MARGIN_LEFT), 4992.0 - GetCameraMargin(CAMERA_MARGIN_TOP), 6144.0 - GetCameraMargin(CAMERA_MARGIN_RIGHT), -14208.0 + GetCameraMargin(CAMERA_MARGIN_BOTTOM))
    SetDayNightModels("Environment\\DNC\\DNCLordaeron\\DNCLordaeronTerrain\\DNCLordaeronTerrain.mdl", "Environment\\DNC\\DNCLordaeron\\DNCLordaeronUnit\\DNCLordaeronUnit.mdl")
    SetTerrainFogEx(0, 1400.0, 6000.0, 0.650, 0.373, 0.471, 0.588)
    NewSoundEnvironment("Default")
    SetAmbientDaySound("CityScapeDay")
    SetAmbientNightSound("CityScapeNight")
    SetMapMusic("Music", true, 0)
    InitSounds()
    CreateAllUnits()
    InitBlizzard()
    InitGlobals()
    InitCustomTriggers()
    RunInitializationTriggers()
end

function config()
    SetMapName("TRIGSTR_003")
    SetMapDescription("TRIGSTR_005")
    SetPlayers(18)
    SetTeams(18)
    SetGamePlacement(MAP_PLACEMENT_TEAMS_TOGETHER)
    DefineStartLocation(0, -3264.0, -7424.0)
    DefineStartLocation(1, -5248.0, -11392.0)
    DefineStartLocation(2, 6400.0, -11840.0)
    DefineStartLocation(3, -12992.0, 640.0)
    DefineStartLocation(4, -14400.0, -1472.0)
    DefineStartLocation(5, -13568.0, -2752.0)
    DefineStartLocation(6, -8448.0, -7168.0)
    DefineStartLocation(7, -12416.0, -2240.0)
    DefineStartLocation(8, 1344.0, -14336.0)
    DefineStartLocation(9, -3008.0, -6464.0)
    DefineStartLocation(10, -13632.0, -4800.0)
    DefineStartLocation(11, -14528.0, -5952.0)
    DefineStartLocation(12, 4672.0, -12224.0)
    DefineStartLocation(13, -9088.0, -10688.0)
    DefineStartLocation(14, -12672.0, -1728.0)
    DefineStartLocation(15, -9024.0, -6912.0)
    DefineStartLocation(16, 4032.0, -9024.0)
    DefineStartLocation(17, -11456.0, -5824.0)
    InitCustomPlayerSlots()
    InitCustomTeams()
    InitAllyPriorities()
end

