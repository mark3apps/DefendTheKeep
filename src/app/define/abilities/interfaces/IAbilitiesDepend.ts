import { IAbilityDepend } from 'app/classes/ability/interfaces/IAbilityDepend'
import { AbilityTypes } from 'app/define/abilityTypes/abilityTypes'

export interface IAbilitiesDepend extends IAbilityDepend {
	abilityTypes: AbilityTypes
}
