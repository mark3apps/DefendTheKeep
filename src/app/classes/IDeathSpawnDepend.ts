import { Pathing } from 'app/systems'
import { ITriggers } from 'app/define/triggers/interfaces/ITriggers'
import { UnitTypes } from '../define/UnitTypes'

export interface IDeathSpawnDepend {
	triggers: ITriggers
	pathing: Pathing,
	unitTypes: UnitTypes
}
