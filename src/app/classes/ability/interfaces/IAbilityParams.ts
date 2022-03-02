import { AbilityType, Hero } from 'app/classes'
import { IUnitAbilityParam } from 'app/classes/unitAbility/interfaces/IUnitAbilityParam'
import { Unit } from 'lib/w3ts'

export interface IAbilityParams {
	unitAbility: (e: IUnitAbilityParam) => unknown
	TriggerUnit: () => Unit | Hero
	abilType: AbilityType
}
