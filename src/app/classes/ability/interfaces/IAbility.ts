import { AbilityType, Hero, UnitAbility } from 'app/classes'
import { Unit } from 'lib/w3ts'

export interface IAbility {
	abilType: AbilityType,
	onEffectCast: () => void,
	getUnitAbility: (unit: Unit) => unknown,
	TriggerUnit: () => Unit | Hero
	UnitAbilityFromCast: UnitAbility
}
