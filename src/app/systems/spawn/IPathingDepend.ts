import { ITriggers } from 'app/define/triggers/interfaces/ITriggers'
import { Forces } from 'app/define/forces/Forces'
import { Regions } from 'app/define/regions'
import { Locs } from '../loc/Locs'
import { UnitTypes } from 'app/define/UnitTypes'

export interface IPathingDepend {
	triggers: ITriggers
	locs: Locs,
	forces: Forces,
	regions: Regions,
	unitTypes: UnitTypes
}
