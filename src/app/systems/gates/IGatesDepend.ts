import { UnitTypes } from 'app/define/UnitTypes'
import { ITriggers } from 'app/define/triggers/interfaces/ITriggers'

export interface IGatesDepend {
	triggers: ITriggers,
	unitTypes: UnitTypes
}
