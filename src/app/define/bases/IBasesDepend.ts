import { Locs } from '../../systems/loc/Locs'
import { Armies } from 'app/define/armies/Armies'
import { Units } from 'app/define/units'

export interface IBasesDepend {
	locs: Locs
	armies: Armies
	units: Units
}
