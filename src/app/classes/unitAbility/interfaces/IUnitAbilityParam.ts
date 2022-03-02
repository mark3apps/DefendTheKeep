import { Hero } from 'app/classes'
import { Unit } from 'lib/w3ts/index'
import { AbilityType } from '../../abilityType/abilityType'

export interface IUnitAbilityParam {
	unit: Unit | Hero
	abilType: AbilityType
}
