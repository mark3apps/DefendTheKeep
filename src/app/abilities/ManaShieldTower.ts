import { UnitAbility } from 'app/classes'
import { IUnitAbilityParam } from 'app/classes/unitAbility/interfaces/IUnitAbilityParam'
import { IAbilityCast } from 'app/classes/abilityCast/interfaces/IAbilityCast'

export class ManaShieldTower extends UnitAbility {
	override onEffect (cast: IAbilityCast): void {
		if (this.isCastable() && !this.hasBuff()) this.castImmediate()
	}

	static override fromHandle (ability: IUnitAbilityParam) {
		return this.getObject(ability) as ManaShieldTower
	}
}
