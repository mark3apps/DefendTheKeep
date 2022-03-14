/** @format */

import { MapPlayer, Group, Unit } from "lib/w3ts"
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
}
