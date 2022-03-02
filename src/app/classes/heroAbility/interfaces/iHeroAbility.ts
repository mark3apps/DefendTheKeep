import { AbilityType, Hero } from '../..'
import { IUnitAbilityParam } from '../../unitAbility/interfaces/IUnitAbilityParam'

export interface iHeroAbility {
	unitAbility: (e: IUnitAbilityParam) => unknown
	TriggerUnit: () => Hero
	abilType: AbilityType
	starting?: boolean
	ult?: boolean
	hidden?: boolean
}
