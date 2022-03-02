import { Spawn } from "app/systems/spawn/spawn"

export interface SpawnBases {
	bases: { [name: string]: Spawn },
	names: Array<string>
}
