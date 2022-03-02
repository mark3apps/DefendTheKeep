import { UnitTypes } from 'app/define/UnitTypes'
import { Forces } from 'app/define/forces/Forces'
import { Locs } from '../../loc/Locs'

export interface IEventDepend {
	locs: Locs,
	forces: Forces,
	unitTypes: UnitTypes
}
