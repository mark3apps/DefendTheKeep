import type { Forces } from 'app/define/forces/Forces'
import type { Units } from 'app/define/units'

export interface IArmiesDepend {
	units: Units,
	forces: Forces
}
