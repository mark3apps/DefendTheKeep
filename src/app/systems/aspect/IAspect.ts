import { Force, DestructibleFour, Unit, Rectangle } from 'lib/w3ts/index'
import { Loc } from '../loc/loc'

export interface IAspect {
	respawnTime: number
	unit: Unit
	dependentUnit: Unit
	force: Force
	dest: Loc
	gateRegion?: Rectangle
	gateTypeId?: DestructibleFour
}
