/** @format */

import { SpawnValues } from "lib/resources/spawnCheck"
import { SpawnUnit, SpawnUnitDefined } from "lib/resources/spawnUnit"
import { Unit, Order } from "lib/w3ts/index"
import { Base } from "../base/base"
import { Faction } from "../faction/faction"

export class Spawn {
  private _faction: Faction
  private units: SpawnUnitDefined[]
  public name: string

  constructor(name: string, faction: Faction) {
    this.name = name
    this.units = []
    this._faction = faction
  }

  //
  // Instance Methods
  //

  public set faction(value: Faction) {
    this._faction = value
  }

  public get faction(): Faction {
    return this._faction
  }

  public addUnit(sUnit: SpawnUnit): void {
    if (sUnit.start === undefined) {
      sUnit.start = 1
    }
    if (sUnit.end === undefined) {
      sUnit.end = 12
    }
    if (sUnit.amount === undefined) {
      sUnit.amount = 1
    }

    const sUnitDefined = sUnit as SpawnUnitDefined
    this.units.push(sUnitDefined)
  }

  public unitInWave(check: SpawnValues): boolean {
    const sUnit = this.units[check.unit]
    return sUnit.waves.indexOf(check.wave) > -1
  }

  public unitInLevel(check: SpawnValues): boolean {
    const sUnit = this.units[check.unit]
    return sUnit.start <= check.level && sUnit.end >= check.level
  }

  public unitReady(check: SpawnValues): boolean {
    const sUnit = this.units[check.unit]
    return sUnit.start <= check.level && sUnit.end >= check.level && sUnit.waves.indexOf(check.wave) > -1
  }

  public get countOfUnits(): number {
    return this.units.length
  }

  public spawnUnits(check: SpawnValues): void {
    for (let i = 0; i < this.units.length; i++) {
      check.unit = i
      this.spawnUnit(check)
    }
  }

  public spawnUnit(check: SpawnValues): void {
    const unitElement = this.units[check.unit]

    if (this.unitReady(check)) {
      for (let b = 0; b < 2; b++) {
        const baseElement: Base = b === 0 ? this.faction.alliance : this.faction.federation

        if (baseElement.isAlive()) {
          for (let index = 0; index < unitElement.amount; index++) {
            const start = baseElement.randomStartPosition()
            const dest = baseElement.randomEndPosition()
            const p = baseElement.army.randomPlayer
            const unitType = unitElement.unitType

            const u = new Unit({ owner: p, type: unitType, coor: start })
            u.issueCoordinateOrder(Order.Attack, dest)
          }
        }
      }
    }
  }
}
