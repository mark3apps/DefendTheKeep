import { UnitType } from 'app/classes/unitType/UnitType'
import { PlayerPassive, Unit } from 'lib/w3ts/index'

export class Load {
	static units (): void {
		for (let i = 0; i < UnitType.preloader.length; i++) {
			const element = UnitType.preloader[i]

			new Unit({ owner: PlayerPassive, type: element, coor: { x: 0, y: 0 } }).destroy()
		}
	}
}
