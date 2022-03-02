/** @format */

import { UnitAbility } from "app/classes"
import { Position } from "app/classes/position"
import { Unit, Group, Effect, AbilityModel, Order } from "lib/w3ts/index"
import { IUnitAbilityParam } from "app/classes/unitAbility/interfaces/IUnitAbilityParam"
import { Logger } from "app/log"

export class Switch extends UnitAbility {
  pickRange = 300
  augments = 0

  constructor(ability: IUnitAbilityParam) {
    super(ability)
    this.updateTooltips()
  }

  override updateTooltip(): void {
    this.tooltip = `Switch - [|cffffcc00${this.augments} Augments|r]`
  }

  override updateExtendedTooltip(): void {
    this.extendedTooltip = `The Shifter switches positions with a nearby friendly shade within |cff00ffff${math.floor(
      this.castRange
    )}|r of the Shift Master.  If no shade exists, this spell is cancelled.

|cff00ffff${math.floor(this.cooldown)}|r second cooldown.`
  }

  override onEffect = (): void => {
    try {
      const spellTargetPos = Position.fromSpellTarget()

      const g = new Group()
      g.enumUnitsInRange(spellTargetPos, this.pickRange, () => {
        const filter = Unit.fromFilter()
        return filter.isIllusion && filter.owner === this.unit.owner
      })

      const targetUnit = g.getClosestUnit(spellTargetPos)
      g.destroy()

      if (targetUnit == null || targetUnit.distanceTo(this.unit) > this.castRange) {
        this.unit.issueOrder(Order.Stop)
        this.unit.mana += this.manaCost
        this.resetCooldown()
        return
      }

      targetUnit.setPathing(false)
      this.unit.setPathing(false)

      const targetStart = targetUnit.coordinate
      const eventStart = this.unit.coordinate

      new Effect(AbilityModel.feralspirittarget, targetStart.x, targetStart.y).destroy()
      new Effect(AbilityModel.feralspirittarget, eventStart.x, eventStart.y).destroy()

      this.unit.coordinate = targetStart
      targetUnit.coordinate = eventStart

      targetUnit.setPathing(true)
      this.unit.setPathing(true)
    } catch (error) {
      Logger.Error("Switch.onEffect", error)
    }
  }

  static override fromHandle(ability: IUnitAbilityParam) {
    return this.getObject(ability) as Switch
  }
}
