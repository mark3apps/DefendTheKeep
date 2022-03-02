import { UnitAbility } from 'app/classes'
import { IUnitAbilityParam } from 'app/classes/unitAbility/interfaces/IUnitAbilityParam'
import { AbilityField } from 'lib/resources/fields'

export class BonusDamage extends UnitAbility {
	get damage () {
		return this.getLevelField(AbilityField.ATTACK_BONUS) as number
	}

	set damage (value) {
		this.setLevelField(AbilityField.ATTACK_BONUS, value)
		this.incLevel()
		this.decLevel()
	}

	static override fromHandle (ability: IUnitAbilityParam) {
		return this.getObject(ability) as BonusDamage
	}
}
