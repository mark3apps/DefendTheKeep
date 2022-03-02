import { UnitType } from 'app/classes/unitType/UnitType'
import { Banner } from '../../banner/banner'

export interface IAspectOfFireEvent {
	summonUnitType: UnitType; banners: Banner[]; eventInterval?: number; eventTime?: number
}
