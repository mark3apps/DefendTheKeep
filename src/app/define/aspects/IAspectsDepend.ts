import { Forces } from 'app/define/forces/Forces'
import { Rectangles } from 'app/define/rectangles'
import { Units } from 'app/define/units'
import { Locs } from '../../systems/loc/Locs'

export interface IAspectsDepend {
	locs: Locs,
	units: Units,
	forces: Forces,
	rects: Rectangles
}
