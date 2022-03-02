/** @format */

import { UnitType } from "app/classes"
import { Coordinate } from "app/classes/Coordinate"
import { Logger } from "app/log"
import { Order, BuffFour, Unit, Timer, Group, Rectangle } from "lib/w3ts"
import { IPathingDepend } from "./IPathingDepend"

export const OrderIdIgnore = [
  Order.Move,
  Order.Rejuvenation,
  Order.WaterElemental,
  Order.FingerOfDeath,
  Order.HolyBolt,
  Order.SpiritLink,
  Order.RaiseDead,
  Order.CarrionScarabs,
  Order.BreathOfFire,
  Order.ForkedLightning,
  Order.Parasite,
  Order.CarrionSwarm,
  Order.Thunderbolt,
  Order.SpiritWolf,
  Order.SummonGrizzly,
  Order.WateryMinion,
  Order.HealingWave,
  Order.Roar,
  Order.Inferno,
  Order.CreepThunderbolt,
  Order.Cripple,
  Order.Recharge,
  Order.Replenish,
  Order.SummonFactory,
  Order.ChainLightning,
  Order.Polymorph,
  Order.Shockwave,
  Order.Dispel,
  Order.InnerFire,
  Order.FireBolt,
  Order.ClusterRockets,
  Order.CreepThunderclap,
  Order.DarkPortal,
  Order.BreathOfFire,
  Order.BearForm,
]

export const BuffIdIgnore = [BuffFour.AttackUnit]

export const OrderIdIgnoreWithDelay = [Order.RainOfFire, Order.Tranquility, Order.Stunned]

export class Pathing {
  protected static instance?: Pathing

  static getInstance(depend: IPathingDepend) {
    if (!Pathing.instance) Pathing.instance = new Pathing(depend)
    return Pathing.instance
  }

  static getInstanceNoCreate() {
    return Pathing.instance
  }

  // Dependencies
  locs
  forces
  regions

  constructor(depend: IPathingDepend) {
    const triggers = depend.triggers
    const unitTypes = depend.unitTypes
    this.locs = depend.locs
    this.forces = depend.forces
    this.regions = depend.regions

    // Turn off Elder Ent Movement Pathing
    triggers.unitCreated.addAction(() => {
      const eventUnit = Unit.fromEvent()
      if (eventUnit.typeId === unitTypes.AncientOfWar.id) {
        eventUnit.setPathing(false)
      }
    })

    // Units Ordered
    triggers.unitOrdered.addAction(() => {
      try {
        const eventOrder = GetIssuedOrderId()
        const eventUnit = Unit.fromOrdered()

        if (UnitType.order.get(eventUnit.typeId) === true) {
          if (OrderIdIgnore.indexOf(eventOrder) !== -1 && !eventUnit.hasBuff(BuffIdIgnore[0])) {
            const timer = new Timer()
            timer.start(1, false, () => {
              eventUnit.issueLastOrder()
            })
          } else if (OrderIdIgnoreWithDelay.indexOf(eventOrder) !== -1) {
            const timer = new Timer()
            timer.start(10, false, () => {
              eventUnit.issueLastOrder()
            })
          }
        }
      } catch (error) {
        Logger.Error("unitOrdered", error)
      }
    })

    // Unit is Summoned
    triggers.unitSummoned.addAction(() => {
      try {
        const eventUnit = Unit.fromEvent()

        if (eventUnit.inForce(this.forces.Computers)) {
          if (UnitType.replaceOnSummon.has(eventUnit.typeId)) {
            this.newOrders(eventUnit.replace(eventUnit.type as UnitType))
          } else {
            this.newOrders(eventUnit)
          }
        }
      } catch (error) {
        Logger.Error("unitSummoned", error)
      }
    })

    // Unit is Spawned from Campsite
    triggers.unitCreated.addAction(() => {
      const eventUnit = Unit.fromEvent()

      try {
        if (UnitType.factorySummon.has(eventUnit.typeId)) {
          if (eventUnit.inForce(this.forces.Computers)) {
            this.newOrders(eventUnit)
          }
        }
      } catch (error) {
        Logger.Error("unitCreated", error)
      }
    })

    triggers.mapStart.addAction(() => {
      const allUnits = new Group()
      allUnits.enumUnitsInRect(Rectangle.getWorldBounds())

      let unit = allUnits.first
      while (unit != null) {
        if (unit.inForce(this.forces.Computers) && UnitType.order.has(unit.typeId)) {
          this.newOrders(unit)
        }

        allUnits.removeUnit(unit)
        unit = allUnits.first
      }
      allUnits.destroy()
    })
  }

  // Namespace Functions
  newOrders(unit: Unit) {
    try {
      let dest: Coordinate | undefined

      if (unit.inRegion(this.regions.BigTop)) {
        Logger.Verbose("top", unit.name)
        if (unit.inForce(this.forces.AllianceAll)) {
          dest = this.locs.top.federation.randomCoordinate
        } else if (unit.inForce(this.forces.FederationAll)) {
          dest = this.locs.top.alliance.randomCoordinate
        }
      } else if (unit.inRegion(this.regions.BigMiddle)) {
        Logger.Verbose("middle", unit.name)
        if (unit.inForce(this.forces.AllianceAll)) {
          dest = this.locs.middle.federation.randomCoordinate
        } else if (unit.inForce(this.forces.FederationAll)) {
          dest = this.locs.middle.alliance.randomCoordinate
        }
      } else {
        Logger.Verbose("bottom", unit.name)
        if (unit.inForce(this.forces.AllianceAll)) {
          dest = this.locs.bottom.federation.randomCoordinate
        } else if (unit.inForce(this.forces.FederationAll)) {
          dest = this.locs.bottom.alliance.randomCoordinate
        }
      }

      // If
      if (dest) unit.issueCoordinateOrder(Order.Attack, dest)
    } catch (error) {
      Logger.Error("newOrders", error)
    }
  }
}
