/** @format */

import { Hero } from "app/classes"
import { Logger } from "app/log"
import { MapPlayer, Group, Unit, Players, Mask, Timer } from "lib/w3ts"
import { Sky } from "lib/w3ts/globals/sky"
import { Sounds } from "lib/w3ts/globals/sounds"
import { ICinematicDepend } from "./ICinematicDepend"

export class Cinematic {
  protected static instance: Cinematic

  static getInstance(depend: ICinematicDepend) {
    if (!Cinematic.instance) Cinematic.instance = new Cinematic(depend)
    return Cinematic.instance
  }

  // Dependencies
  camSetups
  forces
  unitTypes

  constructor(depend: ICinematicDepend) {
    this.camSetups = depend.camSetups
    this.forces = depend.forces
    this.unitTypes = depend.unitTypes
  }

  // On Init
  onInit(): void {
    this.forces.Alliance.for(() => {
      MapPlayer.fromEnum().color = PLAYER_COLOR_RED
      const g = new Group()
      g.enumUnitsOfPlayer(MapPlayer.fromEnum(), () => {
        Unit.fromFilter().color = PLAYER_COLOR_RED
        return false
      })
      g.destroy()
    })

    this.forces.Federation.for(() => {
      MapPlayer.fromEnum().color = PLAYER_COLOR_BLUE
      const g = new Group()
      g.enumUnitsOfPlayer(MapPlayer.fromEnum(), () => {
        Unit.fromFilter().color = PLAYER_COLOR_BLUE
        return false
      })
      g.destroy()
    })
  }

  setupCustomUI() {}

  setupCineCamera(): void {
    SetSkyModel(Sky.blizzard)
    FogEnableOff()

    CinematicFilterGenericBJ(0.0, BLEND_MODE_BLEND, Mask.black, 0.0, 0.0, 0.0, 0.0, 0, 0, 0, 0)
    CinematicFadeBJ(bj_CINEFADETYPE_FADEIN, 3.0, Mask.black, 0, 0, 0, 0)

    const startCams = [
      this.camSetups.intro01,
      this.camSetups.intro02,
      this.camSetups.intro03,
      this.camSetups.intro04,
      this.camSetups.intro05,
      this.camSetups.intro06,
      this.camSetups.intro07,
      this.camSetups.intro08,
      this.camSetups.intro09,
      this.camSetups.intro10,
      this.camSetups.intro11,
      this.camSetups.intro12,
      this.camSetups.intro13,
      this.camSetups.intro14,
    ]

    for (let i = 0; i < 11; i++) {
      const startCamera = startCams[GetRandomInt(0, startCams.length - 1)]

      Players[i].applyCamera(true, startCamera, 0)

      const unit = new Unit({ owner: Players[19], type: this.unitTypes.DummyCameraLock, coor: startCamera.position })
      unit.applyTimedLifeGeneric(30)

      Players[i].setTargetControllerCamera(unit, 0, 0, false)
    }

    this.setupCustomUI()
  }

  setupGameCamera = (): void => {
    const camLeftStart = this.camSetups.baseLeftPanStart
    const camLeftEnd = this.camSetups.baseLeftStart
    const camRightStart = this.camSetups.baseRightPanStart
    const camRightEnd = this.camSetups.baseRightStart

    this.forces.AlliancePlayers.for(() => {
      MapPlayer.fromEnum().applyCamera(true, camLeftStart, 0)
      MapPlayer.fromEnum().applyCamera(true, camLeftEnd, 2)
    })

    this.forces.FederationPlayers.for(() => {
      MapPlayer.fromEnum().applyCamera(true, camRightStart, 0)
      MapPlayer.fromEnum().applyCamera(true, camRightEnd, 2)
    })

    FogEnableOn()
  }

  startHeroSelector = (): void => {
    HeroSelector.show(true)
    HeroSelector.enableBan(false)
    HeroSelector.enablePick(true)

    const countdown = new Timer()
    let timeLeft = 10

    // Loop Countdown
    countdown.start(1, true, () => {
      try {
        timeLeft -= 1

        HeroSelector.setTitleText(GetLocalizedString("DEFAULTTIMERDIALOGTEXT") + ": " + timeLeft)

        if (timeLeft < 6 && timeLeft > 0) {
          PlaySound(Sounds.battleNetTick)
        }

        if (timeLeft <= 0) {
          PlaySound(Sounds.warning)

          this.forces.Humans.for(() => {
            if (!Hero.PickedPlayers.hasPlayer(MapPlayer.fromEnum())) {
              Logger.Information("Picked", MapPlayer.fromEnum().name)
              HeroSelector.forcePick(GetEnumPlayer())
            }
          })

          for (let i = 0; i < Hero.all.length; i++) {
            const hero = Hero.all[i]
            hero.show = true
          }

          countdown.pause()
          countdown.destroy()
          HeroSelector.destroy()

          this.setupGameCamera()
        }
      } catch (error) {
        Logger.Error("Hero Selector:", error)
      }
    })
  }
}
