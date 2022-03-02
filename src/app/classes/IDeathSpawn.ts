import { UnitType } from 'app/classes'
import { Attach, AttachMod, AttachSpecial } from 'lib/w3ts'

export interface IDeathSpawn {
	amount: number
	unitId: UnitType
	chance?: number
	animation?: string
	effectPath?: string
	effectAttach?: Attach
	effectAttachMod?: AttachMod
	effectAttachSpecial?: AttachSpecial
}
