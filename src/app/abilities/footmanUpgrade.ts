/** @format */

import { UnitAbility } from "app/classes"
import { IUnitAbilityParam } from "app/classes/unitAbility/interfaces/IUnitAbilityParam"
import { IAbilityCast } from "app/classes/abilityCast/interfaces/IAbilityCast"
import { Order, Effect, AbilityModel, Attach } from "lib/w3ts"

export class FootmanUpgrade extends UnitAbility {
  override onEffect(cast: IAbilityCast): void {
    if (this.unit.manaPercent === 100) {
      this.unit.issueOrder(Order.BearForm)
      this.unit.lifePercent += 25
      new Effect(AbilityModel.spiritWalkerChange, this.unit, Attach.chest).destroy()
    }
  }

  static override fromHandle(ability: IUnitAbilityParam) {
    return this.getObject(ability) as FootmanUpgrade
  }
}
