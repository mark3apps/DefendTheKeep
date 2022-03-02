/** @format */

import { Group, BuffFour, Unit, AbilityFour, Order } from "lib/w3ts"
import { UnitAbility } from "../classes"
import { IUnitAbilityParam } from "../classes/unitAbility/interfaces/IUnitAbilityParam"
import { IAbilityCast } from "../classes/abilityCast/interfaces/IAbilityCast"
import { UnitTypes } from "app/define/UnitTypes"

export class AspectOfDeathInfect extends UnitAbility {
  override onEffect(cast: IAbilityCast): void {
    const unitTypes = UnitTypes.getInstance()

    const unitCount = this.normalDuration

    const g = new Group()
    g.enumUnitsInRange(this.unit, 400)
    g.firstLoopCondition(
      (u) => {
        return u.isAlive() && u.isEnemy(this.unit) && !u.isHero && !u.isStructure && !u.isIllusion && !u.isMagicImmune && !u.hasBuff(BuffFour.Infected)
      },
      (u) => {
        const dummy = new Unit({ owner: this.unit.owner, type: unitTypes.Dummy, coor: this.unit.coordinate })
        dummy.addAbility(AbilityFour.InfectAspectDummy)
        dummy.issueTargetOrder(Order.Parasite, u)
        dummy.applyTimedLife(BuffFour.TimedLifeGeneric, 1)
      },
      unitCount
    )
    g.destroy()
  }

  static override fromHandle(ability: IUnitAbilityParam) {
    return this.getObject(ability) as AspectOfDeathInfect
  }
}
