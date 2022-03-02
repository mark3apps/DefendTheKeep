import { Unit } from 'lib/w3ts/index'
import { Army } from '../army/army'
import { Loc } from '../loc/loc'
import { IBase } from './IBase'

export class Base {
	army: Army
	baseUnit: Unit
	startLoc: Loc
	endLoc: Loc
	importance: number
	dangerUpdate: boolean
	teleport: boolean
	healing: boolean

	constructor (base: IBase) {
		this.army = base.army
		this.baseUnit = base.base
		this.startLoc = base.start
		this.endLoc = base.end
		this.importance = base.importance
		this.dangerUpdate = base.update
		this.teleport = base.teleport
		this.healing = base.healing
	}

	public isAlive (): boolean {
		return this.baseUnit.isAlive()
	}

	public randomStartPosition () {
		return this.startLoc.rect.randomPosition
	}

	public randomEndPosition () {
		return this.endLoc.rect.randomPosition
	}
}
