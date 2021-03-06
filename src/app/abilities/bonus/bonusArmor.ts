import { UnitAbility } from 'app/classes'
import { IUnitAbilityParam } from 'app/classes/unitAbility/interfaces/IUnitAbilityParam'
import { AbilityField } from 'lib/resources/fields'

export class BonusArmor extends UnitAbility {
	get armor () {
		return this.getLevelField(AbilityField.DEFENSE_BONUS_IDEF) as number
	}

	set armor (value) {
		this.setLevelField(AbilityField.DEFENSE_BONUS_IDEF, value)
		this.incLevel()
		this.decLevel()
	}

	static override fromHandle (ability: IUnitAbilityParam) {
		return this.getObject(ability) as BonusArmor
	}
}
