import { UnitType } from 'app/classes'

export interface SpawnUnit {
	unitType: UnitType,
	amount?: number,
	waves: number[],
	start?: number,
	end?: number
}

export interface SpawnUnitDefined {
	unitType: UnitType,
	amount: number,
	waves: number[],
	start: number,
	end: number
}
