/** @format */

import { UnitType } from "app/classes"
import { IDeathSpawn } from "app/classes/IDeathSpawn"
import { IDeathSpawnDepend } from "app/classes/IDeathSpawnDepend"
import { Logger } from "app/log"
import { Unit, MapPlayer, AbilityFour, Timer, Effect } from "lib/w3ts"

export class DeathSpawn {
  protected static instance?: DeathSpawn

  static getInstance(depend: IDeathSpawnDepend) {
    if (!DeathSpawn.instance) DeathSpawn.instance = new DeathSpawn(depend)
    return DeathSpawn.instance
  }

  // Dependencies
  pathing

  id: { [id: string]: IDeathSpawn[] } = {}

  constructor(depend: IDeathSpawnDepend) {
    // Dependencies
    this.pathing = depend.pathing
    const triggers = depend.triggers
    const unitTypes = depend.unitTypes

    this.add(unitTypes.Knight, { amount: 1, unitId: unitTypes.Captain1 })
    this.add(unitTypes.WaterElemental2, { amount: 1, unitId: unitTypes.WaterElemental1 })
    this.add(unitTypes.WaterElemental3, { amount: 1, unitId: unitTypes.WaterElemental2 })
    this.add(unitTypes.SeigeGolem, { amount: 2, unitId: unitTypes.WarGolem })
    this.add(unitTypes.WarGolem, { amount: 2, unitId: unitTypes.BattleGolem })
    this.add(unitTypes.HippogryphRider, { amount: 1, unitId: unitTypes.NightElfRanger, chance: 0.6 })

    this.add(unitTypes.SeigeEngine, { amount: 1, unitId: unitTypes.Gyrocopter })
    this.add(unitTypes.SeigeEngine, { amount: 1, unitId: unitTypes.SeigeEngineDamaged })
    this.add(unitTypes.SeigeEngineDamaged, { amount: 1, unitId: unitTypes.Gyrocopter })

    this.add(unitTypes.NerubianZiggurat, { amount: 7, unitId: unitTypes.SkeletonWarrior, chance: 0.7 })
    this.add(unitTypes.NerubianZiggurat, { amount: 5, unitId: unitTypes.SkeletonArcher, chance: 0.7 })

    this.add(unitTypes.MercTent, { amount: 5, unitId: unitTypes.Bandit, chance: 0.4 })
    this.add(unitTypes.MercTent, { amount: 3, unitId: unitTypes.BanditSpearman, chance: 0.5 })
    this.add(unitTypes.MercTent, { amount: 2, unitId: unitTypes.Assassin, chance: 0.25 })

    this.add(unitTypes.WildhammerCottage, { amount: 2, unitId: unitTypes.DwarfClansman, chance: 0.3 })
    this.add(unitTypes.WildhammerCottage, { amount: 2, unitId: unitTypes.DwarfAxethrower, chance: 0.3 })
    this.add(unitTypes.WildhammerCottage, { amount: 1, unitId: unitTypes.DwarfElite, chance: 0.2 })
    this.add(unitTypes.WildhammerFarm, { amount: 2, unitId: unitTypes.DwarfClansman, chance: 0.2 })
    this.add(unitTypes.WildhammerFarm, { amount: 2, unitId: unitTypes.DwarfAxethrower, chance: 0.2 })
    this.add(unitTypes.WildhammerFarm, { amount: 1, unitId: unitTypes.DwarfElite, chance: 0.3 })
    this.add(unitTypes.WildhammerFarmLarge, { amount: 2, unitId: unitTypes.DwarfClansman, chance: 0.3 })
    this.add(unitTypes.WildhammerFarmLarge, { amount: 2, unitId: unitTypes.DwarfAxethrower, chance: 0.3 })
    this.add(unitTypes.WildhammerFarmLarge, { amount: 1, unitId: unitTypes.DwarfElite, chance: 0.3 })

    this.add(unitTypes.GryphonRider, { amount: 1, unitId: unitTypes.DwarfAxethrower })

    this.add(unitTypes.CityBuilding03, { amount: 1, unitId: unitTypes.VillagerMale1, chance: 0.1 })
    this.add(unitTypes.CityBuilding03, { amount: 1, unitId: unitTypes.VillagerMale2, chance: 0.1 })
    this.add(unitTypes.CityBuilding03, { amount: 2, unitId: unitTypes.VillagerFemale1, chance: 0.1 })
    this.add(unitTypes.CityBuilding03, { amount: 1, unitId: unitTypes.VillagerChild1, chance: 0.1 })
    this.add(unitTypes.CityBuilding03, { amount: 1, unitId: unitTypes.VillagerChild2, chance: 0.1 })

    this.add(unitTypes.CityBuilding09, { amount: 1, unitId: unitTypes.VillagerMale1, chance: 0.1 })
    this.add(unitTypes.CityBuilding09, { amount: 1, unitId: unitTypes.VillagerMale2, chance: 0.1 })
    this.add(unitTypes.CityBuilding09, { amount: 2, unitId: unitTypes.VillagerFemale1, chance: 0.1 })
    this.add(unitTypes.CityBuilding09, { amount: 1, unitId: unitTypes.VillagerChild1, chance: 0.1 })
    this.add(unitTypes.CityBuilding09, { amount: 1, unitId: unitTypes.VillagerChild2, chance: 0.1 })

    this.add(unitTypes.HumanFrigate, { amount: 2, unitId: unitTypes.Arbalist, chance: 0.4 })
    this.add(unitTypes.HumanFrigate, { amount: 3, unitId: unitTypes.NavyMarine, chance: 0.5 })
    this.add(unitTypes.HumanBattleship, { amount: 1, unitId: unitTypes.Arbalist, chance: 0.5 })
    this.add(unitTypes.HumanBattleship, { amount: 4, unitId: unitTypes.NavyMarine, chance: 0.5 })

    this.add(unitTypes.NightElfFrigate, { amount: 2, unitId: unitTypes.NightElfRanger, chance: 0.6 })
    this.add(unitTypes.NightElfFrigate, { amount: 2, unitId: unitTypes.NightElfSentry, chance: 0.7 })
    this.add(unitTypes.NightElfBattleship, { amount: 2, unitId: unitTypes.NightElfRanger, chance: 0.7 })
    this.add(unitTypes.NightElfBattleship, { amount: 1, unitId: unitTypes.NightElfEliteRanger, chance: 0.6 })
    this.add(unitTypes.NightElfBattleship, { amount: 3, unitId: unitTypes.NightElfSentry, chance: 0.8 })

    // Add Death Spawn trigger to Unit Dieing Trigger
    triggers.UnitDies.addAction(() => {
      try {
        const unit = Unit.fromEvent()

        if (this.id[unit.typeId] != null) {
          for (let i = 0; i < this.id[unit.typeId].length; i++) {
            const element = this.id[unit.typeId][i]
            this.spawn(unit, element)
          }
        }
      } catch (error) {
        Logger.Error("Death Spawn", error)
      }
    })

    // Set Buildings to Randomly Stay behind
    triggers.UnitDying.addAction(() => {
      const unit = Unit.fromEvent()

      // if (UnitType.leaveCorpse.has(unit.typeId)) {
      // 	if ((math.random()) < 0.4) {
      // 		BlzSetEventDamage(0)
      // 		const origColor = unit.color
      // 		unit.owner = MapPlayer.fromIndex(PLAYER_NEUTRAL_PASSIVE)
      // 		unit.color = origColor
      // 		unit.invulnerable = true
      // 		unit.addAbility(FourCC(AbilityFour.Locust))
      // 		unit.setAnimation('death')

      // 		const time = new Timer()
      // 		const loop = new Timer()
      // 		time.start(1, true, () => {
      // 			unit.lifePercent += 20
      // 		})
      // 		loop.start(5, false, () => {
      // 			time.destroy()
      // 			loop.destroy()
      // 		})
      // 	}
      // }
    })
  }

  spawn(unit: Unit, deathSpawn: IDeathSpawn): void {
    try {
      for (let i = 0; i < deathSpawn.amount; i++) {
        if ((deathSpawn.chance as number) >= math.random() && unit.isTerrainPathable(PATHING_TYPE_WALKABILITY)) {
          const u = new Unit({ owner: unit.owner, type: deathSpawn.unitId, coor: unit.coordinate, facing: unit.facing })

          // if ()
          this.pathing.newOrders(u)

          if (deathSpawn.effectPath != null) {
            new Effect(deathSpawn.effectPath, unit, deathSpawn.effectAttach as string).destroy()
          }
        }
      }
    } catch (error) {
      Logger.Error("Death Spawn", error)
    }
  }

  add(unitId: UnitType, deathSpawn: IDeathSpawn): void {
    if (deathSpawn.chance === undefined) deathSpawn.chance = 1

    if (this.id[unitId.id] === null) {
      this.id[unitId.id] = [deathSpawn]
    } else {
      this.id[unitId.id].push(deathSpawn)
    }
  }
}
