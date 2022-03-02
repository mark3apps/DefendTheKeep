import { UnitAbility } from 'app/classes'
import { IUnitAbilityParam } from 'app/classes/unitAbility/interfaces/IUnitAbilityParam'
import { IAbilityCast } from 'app/classes/abilityCast/interfaces/IAbilityCast'
import { AbilityFour } from 'lib/w3ts'

export class FelGrunt extends UnitAbility {
	override onEffect (cast: IAbilityCast): void {
		this.unit.addAbility(AbilityFour.FelGruntTransformed)
	}

	static override fromHandle (ability: IUnitAbilityParam) {
		return this.getObject(ability) as FelGrunt
	}
}

export class FelOgre extends UnitAbility {
	override onEffect (cast: IAbilityCast): void {
		this.unit.addAbility(AbilityFour.FelOgreTransformed)
	}

	static override fromHandle (ability: IUnitAbilityParam) {
		return this.getObject(ability) as FelOgre
	}
}

export class FelWarlord extends UnitAbility {
	override onEffect (cast: IAbilityCast): void {
		if (this.unit.kills >= 4) this.unit.addAbility(AbilityFour.FelWarlordTransformed)
	}

	static override fromHandle (ability: IUnitAbilityParam) {
		return this.getObject(ability) as FelWarlord
	}
}

export class FelWarlock extends UnitAbility {
	override onEffect (cast: IAbilityCast): void {
		if (this.unit.kills >= 2) this.unit.addAbility(AbilityFour.FelWarlockTransformed)
	}

	static override fromHandle (ability: IUnitAbilityParam) {
		return this.getObject(ability) as FelWarlock
	}
}
