/** @format */

import { Coordinate } from "app/classes/Coordinate"
import { FramePoint, Frames, FrameType } from "app/define/Frames"
import { Logger } from "app/log"
import { HintText, MessageColors } from "lib/resources/colors"
import { GameConstants } from "lib/resources/GameConstants"
import { File, Frame, Group, MapPlayer, Order, PlayerPassive, Players, Timer, Trigger, Unit } from "lib/w3ts"
import { IUIDepend } from "./IUIDepend"

export class UI {
  protected static instance: UI

  static getInstance(depend: IUIDepend) {
    if (!UI.instance) UI.instance = new UI(depend)
    return UI.instance
  }

  black: Frame
  banner1: Frame
  banner2: Frame
  banner2Cover: Frame
  banner3: Frame
  banner4: Frame

  iconStr: Frame
  iconAgi: Frame
  iconInt: Frame

  iconMoveSpeed: Frame
  textMoveSpeed: Frame
  iconAttackSpeed: Frame
  textAttackSpeed: Frame

  healthBar: Frame
  manaBar: Frame
  shieldBar: Frame
  statBarFullWidth = 0.123
  experienceBarFullWidth = 0.18

  buttonMenuBack: Frame
  buttonMenu: Frame
  experienceBar: Frame
  experienceBarBorder: Frame

  playerUnits: (Unit | null)[] = []

  nameFrame: Frame
  classFrame: Frame

  portraitBLY = 0.056
  portraitTRY = 0.117
  aspectRatio = 177 // Default Aspect Ratio

  portraitPoints: { left: number; right: number }[] = []

  private constructor(depend: IUIDepend) {
    const unitTypes = depend.unitTypes

    this.portraitPoints[160] = { left: 0.304, right: 0.358 }
    this.portraitPoints[177] = { left: 0.314, right: 0.362 }
    this.portraitPoints[238] = { left: 0.337, right: 0.373 }

    const xOff = 0.03
    const yOff = 0

    const screenRes = File.read("ATA_screenRes.txt")

    if (screenRes) {
      const matches = screenRes.split(",")

      if (matches) {
        const x = +matches[0]
        const y = +matches[1]
        this.aspectRatio = math.floor((x / y) * 100)
        if (!this.portraitPoints[this.aspectRatio]) this.aspectRatio = 1.77
      }
    } else {
      print(HintText("Tip:") + " If the UI isn't lining up correctly, use:\n" + '-screen [ScreenXRes]x[ScreenYRes]"\n' + 'For example: "-screen 1920x1080"')
    }

    BlzEnableUIAutoPosition(false)
    Frame.fromContext(Frames.consoleUIBackdrop).setSize(0.2, 0.0001)

    for (let i = 0; i < Players.length; i++) {
      this.playerUnits[i] = null
    }

    // Create Custom Frames

    // UI Backdrop
    this.banner1 = new Frame("unitBanner1", Frame.fromContext(Frames.consoleUIBackdrop), 1, 1, FrameType.backdrop, "")
    this.banner1.setTexture("bottomUi1.dds", 0, true).setAbsPoint(FRAMEPOINT_BOTTOMLEFT, 0.0, 0.0).setAbsPoint(FRAMEPOINT_TOPRIGHT, 0.2, 0.1939)

    this.black = new Frame("blackBg", Frame.fromContext(Frames.consoleUIBackdrop), 1, 1, FrameType.backdrop, "")
    this.black.setTexture("black.dds", 0, true).setAbsPoint(FRAMEPOINT_BOTTOMLEFT, 0.275, 0.045).setAbsPoint(FRAMEPOINT_TOPRIGHT, 0.35, 0.122)

    this.banner2 = new Frame("unitBanner2", Frame.fromContext(Frames.consoleUIBackdrop), 1, 1, FrameType.backdrop, "")
    this.banner2.setTexture("bottomUi2.dds", 0, true).setAbsPoint(FRAMEPOINT_BOTTOMLEFT, 0.2, 0.0).setAbsPoint(FRAMEPOINT_TOPRIGHT, 0.4, 0.1939)

    this.banner2Cover = new Frame("unitBanner2Cover", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI), 1, 1, FrameType.backdrop, "")
    this.banner2Cover.setTexture("bottomUi2Cover.dds", 0, true).setAbsPoint(FRAMEPOINT_BOTTOMLEFT, 0.2, 0.0).setAbsPoint(FRAMEPOINT_TOPRIGHT, 0.4, 0.1939)

    this.banner3 = new Frame("unitBanner3", Frame.fromContext(Frames.consoleUIBackdrop), 1, 1, FrameType.backdrop, "")
    this.banner3.setTexture("bottomUi3.dds", 0, true).setAbsPoint(FRAMEPOINT_BOTTOMLEFT, 0.4, 0.0).setAbsPoint(FRAMEPOINT_TOPRIGHT, 0.6, 0.1939)

    this.banner4 = new Frame("unitBanner4", Frame.fromContext(Frames.consoleUIBackdrop), 1, 1, FrameType.backdrop, "")
    this.banner4.setTexture("bottomUi4.dds", 0, true).setAbsPoint(FRAMEPOINT_BOTTOMLEFT, 0.6, 0.0).setAbsPoint(FRAMEPOINT_TOPRIGHT, 0.8, 0.1939)

    // Buttons
    this.buttonMenuBack = new Frame("buttonMenuBack", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI), 1, 1, FrameType.backdrop, "")
    this.buttonMenu = new Frame("buttonMenu", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI), 1, 1, FrameType.frame, "")
    this.buttonMenuBack.setTexture("btnMenu.dds", 0, true)

    // Hero Attribute Icons
    this.iconStr = new Frame("iconStr", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI), 1, 1, FrameType.backdrop, "")
    this.iconStr.setTexture("UI\\widgets\\console\\human\\infocard-heroattributes-str.dds", 0, true)

    this.iconAgi = new Frame("iconAgi", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI), 1, 1, FrameType.backdrop, "")
    this.iconAgi.setTexture("UI\\widgets\\console\\human\\infocard-heroattributes-agi.dds", 0, true)

    this.iconInt = new Frame("iconInt", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI), 1, 1, FrameType.backdrop, "")
    this.iconInt.setTexture("UI\\widgets\\console\\human\\infocard-heroattributes-int.dds", 0, true)

    this.iconAttackSpeed = new Frame("iconAttackSpeed", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI), 1, 1, FrameType.backdrop, "")
    this.iconAttackSpeed.setTexture("iconAttackSpeed.dds", 0, true).setVisible(true)

    this.iconMoveSpeed = new Frame("iconMoveSpeed", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI), 1, 1, FrameType.backdrop, "")
    this.iconMoveSpeed.setTexture("iconMoveSpeed.dds", 0, true).setVisible(true)

    this.textAttackSpeed = new Frame("textAttackSpeed", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI), 1, 1, FrameType.text, "")
    this.textMoveSpeed = new Frame("textMoveSpeed", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI), 1, 1, FrameType.text, "")

    // Health & Mana Bar
    this.healthBar = new Frame("healthBar", Frame.fromContext(Frames.consoleUIBackdrop), 1, 1, FrameType.backdrop, "")
    this.healthBar
      .setAlpha(100)
      .setTexture("healthBar.dds", 0, true)
      .setAbsPoint(FramePoint.TL, 0.334 + xOff, 0.115)
      .setSize(this.statBarFullWidth, 0.017)

    this.shieldBar = new Frame("shieldBar", Frame.fromContext(Frames.consoleUIBackdrop), 1, 1, FrameType.backdrop, "")
    this.shieldBar
      .setTexture("manaBar.dds", 0, true)
      .setAbsPoint(FramePoint.TL, 0.334 + xOff, 0.115)
      .setSize(this.statBarFullWidth, 0.002)

    this.manaBar = new Frame("manaBar", Frame.fromContext(Frames.consoleUIBackdrop), 1, 1, FrameType.backdrop, "")
    this.manaBar
      .setAlpha(100)
      .setTexture("manaBar.dds", 0, true)
      .setAbsPoint(FramePoint.TL, 0.334 + xOff, 0.097)
      .setSize(this.statBarFullWidth, 0.016)

    this.experienceBar = new Frame("experienceBar", Frame.fromContext(Frames.consoleUIBackdrop), 1, 1, FrameType.backdrop, "")
    this.experienceBar.setTexture("human-bigbar-fill.dds", 0, true)

    this.experienceBarBorder = new Frame("experienceBarBorder", Frame.fromContext(Frames.consoleUIBackdrop), 1, 1, FrameType.backdrop, "")
    this.experienceBarBorder.setTexture("human-xpbar-border.dds", 0, true)

    setFrames({
      frames: [this.experienceBar, this.experienceBarBorder],
      coor: { x: 0.268 + xOff, y: 0.1425 },
      width: this.experienceBarFullWidth,
      height: 0.016,
    })

    // Hidden Frames
    Frame.fromContext(Frames.InfoPanelIconHeroStrengthLabel).setText("")
    Frame.fromContext(Frames.InfoPanelIconHeroAgilityLabel).setText("")
    Frame.fromContext(Frames.InfoPanelIconHeroIntellectLabel).setText("")

    setFrames({
      frames: [
        Frame.fromContext(Frames.InventoryText),
        Frame.fromContext(Frames.SimpleInfoPanelIconAlly),
        Frame.fromOrigin(ORIGIN_FRAME_SYSTEM_BUTTON),
        Frame.fromContext(Frames.ResourceBarFrame),
        Frame.fromContext(Frames.InfoPanelIconHeroIcon),
      ],
      coor: { x: 1.5, y: 0.5 },
    })

    // Set Origin Frames

    // MiniMap
    Frame.fromOrigin(ORIGIN_FRAME_MINIMAP)
      .clearPoints()
      .setAbsPoint(FRAMEPOINT_BOTTOMLEFT, 0.089 + xOff, 0.009 + yOff)

    // Portrait
    Frame.fromOrigin(ORIGIN_FRAME_PORTRAIT)
      .setAbsPoint(FramePoint.BL, this.portraitPoints[this.aspectRatio].left, this.portraitBLY)
      .setAbsPoint(FramePoint.TR, this.portraitPoints[this.aspectRatio].right, this.portraitTRY)

    // Unit Buff Label
    Frame.fromOrigin(ORIGIN_FRAME_UNIT_PANEL_BUFF_BAR_LABEL).setText("")

    // Unit Buff Icons
    Frame.fromOrigin(ORIGIN_FRAME_UNIT_PANEL_BUFF_BAR)
      .clearPoints()
      .setAbsPoint(FramePoint.BL, 0.488 + xOff, 0.05 + yOff)

    // Menu Bars
    setFrames({
      frames: [
        Frame.fromOrigin(ORIGIN_FRAME_SYSTEM_BUTTON, 3),
        Frame.fromOrigin(ORIGIN_FRAME_SYSTEM_BUTTON, 2),
        Frame.fromOrigin(ORIGIN_FRAME_SYSTEM_BUTTON, 1),
        Frame.fromOrigin(ORIGIN_FRAME_SYSTEM_BUTTON, 0),
      ],
      coor: { x: 0.7 + xOff, y: 0 + yOff },
      coorInc: { x: 0, y: 0.018 },
      framePoint: FramePoint.BL,
    })

    // Minimap Icons
    setFrames({
      frames: [
        Frame.fromContext(Frames.MinimapSignalButton),
        Frame.fromContext(Frames.MiniMapTerrainButton),
        Frame.fromContext(Frames.MiniMapAllyButton),
        Frame.fromContext(Frames.MiniMapCreepButton),
        Frame.fromContext(Frames.ForamtionButton),
      ],
      coor: { x: 0.063 + xOff, y: 0.009 + yOff },
      coorInc: { x: 0, y: 0.0152 },
      framePoint: FramePoint.BL,
      scale: 0.65,
    })

    // Order Buttons
    setFrames({
      frames: [
        Frame.fromContext(Frames.CommandButton4),
        Frame.fromContext(Frames.CommandButton0),
        Frame.fromContext(Frames.CommandButton1),
        Frame.fromContext(Frames.CommandButton2),
        Frame.fromContext(Frames.CommandButton3),
      ],
      coor: { x: 0.513 + xOff, y: 0.162 + yOff },
      coorInc: { x: 0.0197, y: 0 },
      scale: 0.71,
    })

    // Items Buttons
    setFrames({
      frames: [
        Frame.fromContext(Frames.InventoryButton0),
        Frame.fromContext(Frames.InventoryButton1),
        Frame.fromContext(Frames.InventoryButton2),
        Frame.fromContext(Frames.InventoryButton3),
        Frame.fromContext(Frames.InventoryButton4),
        Frame.fromContext(Frames.InventoryButton5),
      ],
      coor: { x: 0.327 + xOff, y: 0.073 + yOff },
      coorInc: { x: 0.0235, y: 0 },
      scale: 0.58,
    })

    // Ability Buttons
    const abilities = setFrames({
      frames: [
        Frame.fromContext(Frames.CommandButton5),
        Frame.fromContext(Frames.CommandButton8),
        Frame.fromContext(Frames.CommandButton9),
        Frame.fromContext(Frames.CommandButton10),
      ],
      coor: { x: 0.252 + xOff, y: 0.045 + yOff },
      coorInc: { x: 0.0409, y: 0 },
    })

    // Ult Ability
    if (abilities.coor) {
      Frame.fromContext(Frames.CommandButton11)
        .clearPoints()
        .setAbsPoint(FRAMEPOINT_TOPLEFT, 0.43 + xOff, abilities.coor.y + yOff)
    }

    // Level Upgrade Effects
    setFrames({
      frames: [Frame.fromContext(Frames.CommandButton6), Frame.fromContext(Frames.CommandButton7)],
      coor: { x: 0.487 + xOff, y: 0.045 },
      coorInc: { x: 0.037, y: 0 },
      scale: 0.97,
    })

    // Resources
    setFrames({
      frames: [Frame.fromContext(Frames.ResourceBarGoldText), Frame.fromContext(Frames.ResourceBarLumberText)],
      coor: { x: 0.632 + xOff, y: 0.039 + yOff },
      coorInc: { x: 0, y: -0.019 },
      framePoint: FramePoint.TR,
    })

    // Experience / Name Bars
    const x = 0.358 + xOff
    const y = 0.156 + yOff
    Frame.fromContext(Frames.SimpleNameValue)
      .clearPoints()
      .setAbsPoint(FramePoint.T, x, y - 0.001)
    Frame.fromContext(Frames.SimpleClassValue)
      .clearPoints()
      .setAbsPoint(FramePoint.T, x, y - 0.018)
    Frame.fromContext(Frames.SimpleHeroLevelBar)
      .clearPoints()
      .setAbsPoint(FramePoint.T, 1.5, y + 0.1)

    //
    // Unit Detail Parent
    Frame.fromContext(Frames.SimpleInfoPanelUnitDetail, 0)
      .parent.clearPoints()
      .setAbsPoint(FramePoint.TL, 0.485 + xOff, 0.166 + yOff)
    //
    //

    // Destructible
    Frame.fromContext(Frames.SimpleDestructableNameValue)
      .clearPoints()
      .setAbsPoint(FramePoint.T, x, y - 0.001)
    Frame.fromContext(Frames.SimpleInfoPanelDestructableDetail)
      .clearPoints()
      .setAbsPoint(FramePoint.TL, 0.488 + xOff, 0.14 + yOff)

    // Item Info
    Frame.fromContext(Frames.SimpleItemNameValue)
      .clearPoints()
      .setAbsPoint(FramePoint.T, x, y - 0.001)
    Frame.fromContext(Frames.SimpleItemDescriptionValue)
      .clearPoints()
      .setAbsPoint(FramePoint.TL, 0.485 + xOff, 0.14 + yOff)
      .setWidth(0.15)

    // Attack 1
    Frame.fromContext(Frames.SimpleInfoPanelIconDamage, 0).setScale(0.8)
    Frame.fromContext(Frames.InfoPanelIconLabel, 0)
      .clearPoints()
      .setScale(2.5)
      .setPoint(FramePoint.TL, Frame.fromContext(Frames.SimpleInfoPanelIconDamage), FramePoint.TL, 0.012, -0.001)
    Frame.fromContext(Frames.InfoPanelIconValue, 0)
      .clearPoints()
      .setScale(2.8)
      .setPoint(FramePoint.TL, Frame.fromContext(Frames.SimpleInfoPanelIconDamage), FramePoint.TL, 0.011, -0.0045)

    // Attack 2
    Frame.fromContext(Frames.SimpleInfoPanelIconDamage, 1)
      .clearPoints()
      .setAbsPoint(FramePoint.TL, 0.485 + xOff, 0.094 + yOff)
      .setScale(0.8)
    Frame.fromContext(Frames.InfoPanelIconLabel, 1)
      .clearPoints()
      .setScale(2.5)
      .setPoint(FramePoint.TL, Frame.fromContext(Frames.SimpleInfoPanelIconDamage, 1), FramePoint.TL, 0.012, -0.001)
    Frame.fromContext(Frames.InfoPanelIconValue, 1)
      .clearPoints()
      .setScale(2.8)
      .setPoint(FramePoint.TL, Frame.fromContext(Frames.SimpleInfoPanelIconDamage, 1), FramePoint.TL, 0.011, -0.004)

    // Armor
    Frame.fromContext(Frames.SimpleInfoPanelIconArmor, 0).setScale(0.8)
    Frame.fromContext(Frames.InfoPanelIconLabel, 2)
      .clearPoints()
      .setScale(2.5)
      .setPoint(FramePoint.TL, Frame.fromContext(Frames.SimpleInfoPanelIconArmor), FramePoint.TL, 0.012, -0.001)
    Frame.fromContext(Frames.InfoPanelIconValue, 2)
      .clearPoints()
      .setScale(2.8)
      .setPoint(FramePoint.TL, Frame.fromContext(Frames.SimpleInfoPanelIconArmor), FramePoint.TL, 0.011, -0.004)

    // Menu Button Backdrops
    setFrames({
      frames: [this.buttonMenuBack],
      coor: { x: 0.647 + xOff, y: 0.068 + yOff },
      coorInc: { x: 0, y: -0.013 },
      width: 0.016,
      height: 0.016,
    })

    // Menu Buttons
    setFrames({
      frames: [this.buttonMenu],
      coor: { x: 0.647 + xOff, y: 0.068 + yOff },
      coorInc: { x: 0, y: -0.013 },
      width: 0.016,
      height: 0.016,
    })

    // Stat Icons & Text
    let statIcons = setFrames({
      frames: [this.iconStr, this.iconAgi, this.iconInt],
      coor: { x: 0.585 + xOff, y: 0.136 + yOff },
      coorInc: { x: 0, y: -0.013 },
      width: 0.011,
      height: 0.011,
    })
    statIcons.frames = [this.iconAttackSpeed, this.iconMoveSpeed]
    statIcons = setFrames(statIcons)

    if (statIcons.coor) {
      const statText = setFrames({
        frames: [
          Frame.fromContext(Frames.InfoPanelIconHeroStrengthValue),
          Frame.fromContext(Frames.InfoPanelIconHeroAgilityValue),
          Frame.fromContext(Frames.InfoPanelIconHeroIntellectValue),
        ],
        coor: { x: statIcons.coor.x + 0.015, y: 0.134 + yOff },
        coorInc: { x: 0, y: -0.013 },
      })
      statText.frames = [this.textAttackSpeed, this.textMoveSpeed]
      statText.scale = 0.85
      statText.text = "200"
      setFrames(statText)
    }

    // Group Selection
    setFrames({
      frames: [Frame.fromContext(Frames.SimpleInfoPanelUnitDetail, 0).parent.getChild(5)],
      scale: 0.8,
    })

    // Ally Stats
    setFrames({
      frames: [
        Frame.fromContext(Frames.InfoPanelIconAllyTitle),
        Frame.fromContext(Frames.InfoPanelIconAllyGoldIcon),
        Frame.fromContext(Frames.InfoPanelIconAllyWoodIcon),
        Frame.fromContext(Frames.InfoPanelIconAllyFoodIcon),
        Frame.fromContext(Frames.SimpleInfoPanelIconAlly),
      ],
      // coor: { x: 0.56 + xOff, y: 0.136 + yOff },
      coor: { x: 1.5 + xOff, y: 0.136 + yOff },
      coorInc: { x: 0, y: -0.013 },
    })

    setFrames({
      frames: [
        Frame.fromContext(Frames.InfoPanelIconAllyGoldValue),
        Frame.fromContext(Frames.InfoPanelIconAllyWoodValue),
        Frame.fromContext(Frames.InfoPanelIconAllyFoodValue),
        Frame.fromContext(Frames.InfoPanelIconAllyUpkeep),
      ],
      // coor: { x: 0.575 + xOff, y: 0.12 + yOff },
      coor: { x: 1.5 + xOff, y: 0.136 + yOff },
      coorInc: { x: 0, y: -0.013 },
    })

    // Looping Constants
    this.nameFrame = Frame.fromContext(Frames.SimpleNameValue)
    this.classFrame = Frame.fromContext(Frames.SimpleClassValue)

    // Loop Update
    const updateTimer = new Timer()
    updateTimer.start(0.08, true, () => {
      for (let i = 0; i < Players.length; i++) {
        const p = MapPlayer.fromIndex(i)
        if (MapPlayer.fromLocal() === p) {
          const g = new Group()
          g.enumUnitsSelected(p)
          const uNew = g.size === 1 ? g.first : undefined
          g.destroy()

          let changed = false
          if (uNew !== this.playerUnits[i]) {
            changed = true
            this.playerUnits[i] = uNew ?? null
          }

          const u = this.playerUnits[i]

          if (changed) {
            if (u === null) {
              this.healthBar.alpha = 0
              this.shieldBar.alpha = 0
              this.manaBar.alpha = 0
              this.iconMoveSpeed.alpha = 0
              this.iconAttackSpeed.alpha = 0
              this.textAttackSpeed.alpha = 0
              this.textMoveSpeed.alpha = 0
              this.iconStr.alpha = 0
              this.iconAgi.alpha = 0
              this.iconInt.alpha = 0
              this.experienceBar.alpha = 0
              this.experienceBarBorder.alpha = 0
            } else {
              // Overall Frames
              this.healthBar.alpha = 255
              this.shieldBar.alpha = 255
              this.manaBar.alpha = 255

              this.iconMoveSpeed.alpha = 255
              this.iconAttackSpeed.alpha = 255

              this.textAttackSpeed.alpha = 255
              this.textMoveSpeed.alpha = 255

              // Hero Stats
              if (u.isHero) {
                this.iconStr.alpha = 255
                this.iconAgi.alpha = 255
                this.iconInt.alpha = 255
                if (u.isAlly(p)) {
                  this.experienceBarBorder.alpha = 255
                  this.experienceBar.alpha = 255
                } else {
                  this.experienceBar.alpha = 0
                  this.experienceBarBorder.alpha = 0
                }
                this.nameFrame.setAbsPoint(FramePoint.T, 0.358 + xOff, 0.155 + yOff)
              } else {
                this.classFrame.text === " "
                  ? this.nameFrame.setAbsPoint(FramePoint.T, 0.358 + xOff, 0.145 + yOff)
                  : this.nameFrame.setAbsPoint(FramePoint.T, 0.358 + xOff, 0.155 + yOff)
                this.experienceBar.alpha = 0
                this.experienceBarBorder.alpha = 0
                this.iconStr.alpha = 0
                this.iconAgi.alpha = 0
                this.iconInt.alpha = 0
              }
            }
          }

          if (u !== null) {
            this.healthBar.width = (u.lifePercent / 100) * this.statBarFullWidth
            this.manaBar.width = u.mana > 0 ? (u.manaPercent / 100) * this.statBarFullWidth : 0.0001
            this.shieldBar.width = u.shield > 0 ? (u.shieldPercentage / 100) * this.statBarFullWidth : 0.0001

            if (u.moveSpeed === 0) {
              this.iconMoveSpeed.alpha = 0
              this.textMoveSpeed.text = ""
            } else {
              this.iconMoveSpeed.alpha = 255
              this.textMoveSpeed.text = `${math.floor(u.moveSpeed)}`
            }

            if (attackSpeed(u) === 0) {
              this.iconAttackSpeed.alpha = 0
              this.textAttackSpeed.text = ""
            } else {
              this.iconAttackSpeed.alpha = 255
              this.textAttackSpeed.text = `${attackSpeed(u)} sec`
            }

            this.experienceBar.width =
              u.xpPercent() > 0
                ? math.min(u.xpPercent(), 1) * this.experienceBarFullWidth
                : u.heroLevel === GameConstants.MaxHeroLevel
                ? this.experienceBarFullWidth
                : 0.00001
          }
        }
      }
    })

    const trig = new Trigger()
    trig.registerAnyUnitEvent(EVENT_PLAYER_UNIT_ISSUED_ORDER)
    trig.addAction(() => {
      if (Unit.fromEvent().typeId === unitTypes.UIDummy.id) {
        print("Order: " + GetIssuedOrderId())
      }
    })

    const g = new Group()

    // HP / Mana Text
    for (let i = 0; i < Players.length; i++) {
      if (Players[i].controller === MAP_CONTROL_USER && Players[i].slotState === PLAYER_SLOT_STATE_PLAYING) {
        const u = new Unit({ type: unitTypes.UIDummy, owner: Players[i], coor: { x: -14828, y: -4674 } })

        for (let j = 0; j < 5; j++) {
          u.addItemById("I00N")
        }

        u.issueOrder(Order.Useslot3)
        g.addUnit(u)

        if (MapPlayer.fromLocal() === Players[i]) u.select(true)
      }
    }

    const time = new Timer()
    time.start(0.2, false, () => {
      setFrames({
        frames: [Frame.fromOrigin(ORIGIN_FRAME_PORTRAIT_HP_TEXT), Frame.fromOrigin(ORIGIN_FRAME_PORTRAIT_MANA_TEXT)],
        coor: { x: 0.399 + xOff, y: 0.105 + yOff },
        coorInc: { x: 0, y: -0.017 },
        framePoint: FramePoint.C,
      })

      let u = g.first
      while (u !== null) {
        if (u) {
          g.removeUnit(u)
          u.destroy()
          u = g.first
        }
      }
      g.destroy()
    })

    const t = new Trigger()
    for (let index = 0; index < Players.length; index++) {
      const p = Players[index]
      t.registerPlayerChatEvent(p, "-screen", false)
    }
    t.addAction(() => {
      try {
        let x = 0
        let y = 0

        const p = MapPlayer.fromEvent()
        if (p === MapPlayer.fromLocal()) {
          const chat = GetEventPlayerChatString()
          const matches = chat.split(" ")[1].split("x")

          if (matches) {
            x = +matches[0]
            y = +matches[1]

            const newAspect = math.floor((x / y) * 100)
            if (this.portraitPoints[newAspect]) {
              this.aspectRatio = newAspect
              this.updatePortrait(p)
              const contents = `${x},${y}`
              File.write("ATA_screenRes.txt", contents)

              DisplayTimedTextToPlayer(p.handle, 0, 0, 8, HintText(`Resolution Updated to ${x}x${y}.`))
            } else {
              DisplayTimedTextToPlayer(p.handle, 0, 0, 8, `${MessageColors.TargetError}Resolution not supported.|r`)
            }
          }
        }
      } catch (error) {
        Logger.Error("Error", error)
      }
    })
  }

  updatePortrait(player: MapPlayer) {
    const portrait = Frame.fromOrigin(ORIGIN_FRAME_PORTRAIT)
    if (player === MapPlayer.fromLocal()) {
      portrait
        .setAbsPoint(FramePoint.BL, this.portraitPoints[this.aspectRatio].left, this.portraitBLY)
        .setAbsPoint(FramePoint.TR, this.portraitPoints[this.aspectRatio].right, this.portraitTRY)
    }
  }
}

interface IIterateFrames {
  framePoint?: framepointtype
  frames: Frame[]
  coor?: Coordinate
  coorInc?: Coordinate
  scale?: number
  scaleInc?: number
  width?: number
  widthInc?: number
  height?: number
  heightInc?: number
  text?: string
}

const setFrames = (iter: IIterateFrames) => {
  for (let index = 0; index < iter.frames.length; index++) {
    if (iter.coor) iter.frames[index].clearPoints().setAbsPoint(iter.framePoint ?? FramePoint.TL, iter.coor.x, iter.coor.y)

    if (iter.scale) iter.frames[index].setScale(iter.scale)
    if (iter.width) iter.frames[index].setWidth(iter.width)
    if (iter.height) iter.frames[index].setHeight(iter.height)
    if (iter.text) iter.frames[index].setText(iter.text)

    if (iter.coorInc && iter.coor) {
      iter.coor.x += iter.coorInc.x
      iter.coor.y += iter.coorInc.y
    }
  }

  return iter
}

const attackSpeedMin = (u: Unit) => {
  return u.weapon1Cooldown - u.weapon1Cooldown / 4
}

const attackSpeedBase = (u: Unit) => {
  if (u.isHero) {
    return u.weapon1Cooldown - math.min(u.agility * GameConstants.AgiAttackSpeedBonus, attackSpeedMin(u))
  } else {
    return u.weapon1Cooldown
  }
}

const attackSpeedBonus = (u: Unit) => {
  if (u.isHero) {
    return u.weapon1Cooldown - math.min(u.agilityWithBonus * GameConstants.AgiAttackSpeedBonus, attackSpeedMin(u)) - attackSpeedBase(u)
  } else {
    return 0
  }
}

const attackSpeed = (u: Unit) => {
  return attackSpeedBase(u) + attackSpeedBonus(u)
}
