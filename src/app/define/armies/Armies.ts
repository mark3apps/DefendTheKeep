import { Army } from '../../systems/army/army'
import { IArmiesDepend } from "./interfaces/IArmiesDepend"

export class Armies {
	private static instance?: Armies

	static getInstance (depend: IArmiesDepend) {
		if (!Armies.instance) Armies.instance = new Armies(depend)
		return Armies.instance
	}

	Alliance
	Federation

	constructor (depend: IArmiesDepend) {
		const units = depend.units
		const forces = depend.forces

		this.Alliance = new Army()
		this.Federation = new Army()

		this.Alliance.force = forces.Alliance
		this.Alliance.enemy = this.Federation
		this.Alliance.captial = units.h00E_0033
		this.Federation.force = forces.Federation
		this.Federation.enemy = this.Alliance
		this.Federation.captial = units.h00E_0081
	}
}
