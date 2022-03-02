import { UnitAbility } from 'app/classes'
import { IUnitAbilityParam } from 'app/classes/unitAbility/interfaces/IUnitAbilityParam'
import { AbilityField } from 'lib/resources/fields'

export class BonusMoveSpeed extends UnitAbility {
	get movementSpeed () {
		return this.getLevelField(AbilityField.MOVEMENT_SPEED_BONUS) as number
	}

	set movementSpeed (value) {
		this.setLevelField(AbilityField.MOVEMENT_SPEED_BONUS, value)
		this.incLevel()
		this.decLevel()
	}

	static override fromHandle (ability: IUnitAbilityParam) {
		return this.getObject(ability) as BonusMoveSpeed
	}
}
