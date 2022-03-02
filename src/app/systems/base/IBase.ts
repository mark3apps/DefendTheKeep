import { Unit } from 'lib/w3ts/index'
import { Army } from '../army/army'
import { Loc } from '../loc/loc'

export interface IBase {
	base: Unit
	army: Army
	start: Loc
	end: Loc
	importance: number
	update: boolean
	teleport: boolean
	healing: boolean
}
