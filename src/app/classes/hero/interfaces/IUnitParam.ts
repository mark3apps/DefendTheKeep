import { MapPlayer } from 'lib/w3ts'
import { UnitType } from '../..'
import { Coordinate } from "../../Coordinate"

export type IUnitParam = {
	owner: MapPlayer
	type: UnitType
	coor: Coordinate
	facing?: number
	evade?: number
	critical?: number
	criticalMultiplier?: number
	lifesteal?: number
	spellDamage?: number
	spellResistance?: number
	shield?: number
}
