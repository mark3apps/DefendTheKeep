/** @format */

import { UnitAbility } from "app/classes"
import { IUnitAbilityParam } from "app/classes/unitAbility/interfaces/IUnitAbilityParam"
import { AbilityField } from "lib/resources/fields"

export class BonusLifeRegeneration extends UnitAbility {
	get lifeRegeneration() {
		return this.getLevelField(
			AbilityField.AMOUNT_OF_HIT_POINTS_REGENERATED
		) as number
	}

	set lifeRegeneration(value) {
		this.setLevelField(AbilityField.AMOUNT_OF_HIT_POINTS_REGENERATED, value)
		this.incLevel()
		this.decLevel()
	}

	static override fromHandle(ability: IUnitAbilityParam) {
		return this.getObject(ability) as BonusLifeRegeneration
	}
}
