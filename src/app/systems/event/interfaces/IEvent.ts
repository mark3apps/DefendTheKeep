import { Coordinate } from 'app/classes/Coordinate'
import { UnitType } from 'app/classes/unitType/UnitType'
import { Banner } from '../../banner/banner'

export interface IEvent {
	summonUnitType: UnitType
	banners: Banner[]
	spawnPos: Coordinate
	eventInterval?: number
	eventTime?: number
}
