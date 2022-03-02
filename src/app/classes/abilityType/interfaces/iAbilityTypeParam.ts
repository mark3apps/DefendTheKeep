import { AbilityFour, BuffFour } from 'lib/w3ts'
import { TargetType } from "../enums/TargetType"
import { EffectType } from "../enums/EffectType"

export interface IAbilityTypeParam {
	four: AbilityFour | string,
	buffFour?: BuffFour,
	effectType?: EffectType,
	targetType?: TargetType,
	orderId?: number,
	orderIdAutoOn?: number,
	orderIdAutoOff?: number,
	orderIdOff?: number,
}
