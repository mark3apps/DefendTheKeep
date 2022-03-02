import type { Trigger } from 'lib/w3ts'

export interface ITriggers {
	UnitDies: Trigger
	UnitDying: Trigger
	unitOrdered: Trigger
	UnitAttacked: Trigger
	unitDamaged: Trigger
	unitCreated: Trigger
	unitEntersRegion: Trigger
	unitSummoned: Trigger
	unitTrained: Trigger
	UnitCasts: Trigger
	heroLevels: Trigger
	mapStart: Trigger
}
