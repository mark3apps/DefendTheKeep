import { DestructibleFour } from 'lib/w3ts/index'
import { IAspectsDepend } from './IAspectsDepend'
import { Aspect } from '../../systems/aspect/aspect'

export class Aspects {
	protected static instance?: Aspects

	static getInstance (depend: IAspectsDepend) {
		if (!Aspects.instance) Aspects.instance = new Aspects(depend)
		return Aspects.instance
	}

	constructor (depend: IAspectsDepend) {
		const locs = depend.locs
		const forces = depend.forces
		const units = depend.units
		const rects = depend.rects

		// Aspect of the Tides
		new Aspect(depend, {
			respawnTime: 80,
			unit: units.nmsc_0644,
			dependentUnit: units.nntt_0135,
			force: forces.Alliance,
			dest: locs.top.federation,
			gateRegion: rects.Murloc_Gate_Left,
			gateTypeId: DestructibleFour.MassiveRuinedGateVertical
		})
		new Aspect(depend, {
			respawnTime: 80,
			unit: units.nmsc_0450,
			dependentUnit: units.nntt_0132,
			force: forces.Federation,
			dest: locs.bottom.alliance,
			gateRegion: rects.Murloc_Gate_Right,
			gateTypeId: DestructibleFour.MassiveRuinedGateVertical
		})

		// Aspect of the Earth
		new Aspect(depend, {
			respawnTime: 80,
			unit: units.n01A_0569,
			dependentUnit: units.h006_0074,
			force: forces.Alliance,
			dest: locs.sCityFront.federation,
			gateRegion: rects.Rock_Gate_Left,
			gateTypeId: DestructibleFour.IcyGate
		})
		new Aspect(depend, {
			respawnTime: 80,
			unit: units.n01A_0399,
			dependentUnit: units.h006_0055,
			force: forces.Federation,
			dest: locs.sCityFront.alliance,
			gateRegion: rects.Rock_Gate_Right,
			gateTypeId: DestructibleFour.IcyGate
		})

		// Aspect of the Storm
		new Aspect(depend, {
			respawnTime: 80,
			unit: units.nelb_0697,
			dependentUnit: units.h003_0015,
			force: forces.Alliance,
			dest: locs.bottom.federation
		})
		new Aspect(depend, {
			respawnTime: 80,
			unit: units.nelb_0194,
			dependentUnit: units.h003_0007,
			force: forces.Federation,
			dest: locs.top.alliance
		})

		// Aspect of the Forest
		new Aspect(depend, {
			respawnTime: 80,
			unit: units.n00N_0939,
			dependentUnit: units.nheb_0109,
			force: forces.Alliance,
			dest: locs.top.federation,
			gateRegion: rects.Aspect_of_Forest_Left_Gate,
			gateTypeId: DestructibleFour.ElvenGate
		})
		new Aspect(depend, {
			respawnTime: 80,
			unit: units.n00N_0769,
			dependentUnit: units.nheb_0036,
			force: forces.Federation,
			dest: locs.bottom.alliance,
			gateRegion: rects.Aspect_of_Forest_Right_Gate,
			gateTypeId: DestructibleFour.ElvenGate
		})

		// Aspect of Death
		new Aspect(depend, {
			respawnTime: 80,
			unit: units.uabo_0493,
			dependentUnit: units.n00K_0802,
			force: forces.Alliance,
			dest: locs.middle.federation
		})
		new Aspect(depend, {
			respawnTime: 80,
			unit: units.uabo_0263,
			dependentUnit: units.n00K_0477,
			force: forces.Federation,
			dest: locs.middle.alliance
		})
	}
}
