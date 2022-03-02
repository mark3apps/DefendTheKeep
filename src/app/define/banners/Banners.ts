import { Banner } from '../../systems/banner/banner'
import { IBannersDepend } from './IBannersDepend'

export class Banners {
	private static instance?: Banners

	static getInstance (depend: IBannersDepend) {
		if (!Banners.instance) Banners.instance = new Banners(depend)
		return Banners.instance
	}

	center1: Banner
	center2: Banner
	center3: Banner
	center4: Banner

	constructor (depend: IBannersDepend) {
		const units = depend.units

		this.center1 = new Banner(depend, { unit: units.o00C_1005 })
		this.center2 = new Banner(depend, { unit: units.o00C_1008 })
		this.center3 = new Banner(depend, { unit: units.o00C_1009 })
		this.center4 = new Banner(depend, { unit: units.o00C_1011 })

		// Main Gate
		new Banner(depend, { unit: units.o00C_1018, range: 400, tick: 2, maxPower: 200 })
		new Banner(depend, { unit: units.o00C_1019, range: 400, tick: 2, maxPower: 200 })
		new Banner(depend, { unit: units.o00C_1020, range: 400, tick: 2, maxPower: 200 })
		new Banner(depend, { unit: units.o00C_1021, range: 400, tick: 2, maxPower: 200 })
	}
}
