import { Timer } from 'lib/w3ts/index'
import { AspectOfFireEvent } from './AspectOfFireEvent'
import { IAspectOfFireEvent } from './interfaces/IAspectOfFireEvent'
import { IAspectOfFireEventDepend } from './interfaces/IAspectOfFireEventDepend'

export class Events {
	private static instance: Events

	static getInstance (depend: IAspectOfFireEventDepend) {
		if (!Events.instance) Events.instance = new Events(depend)
		return Events.instance
	}

	time

	// Dependencies
	depend
	banners

	constructor (depend: IAspectOfFireEventDepend) {
		this.depend = depend
		this.banners = depend.banners

		this.time = new Timer()
	}

	start () {
		this.time.start(60, false, () => {
			const event: IAspectOfFireEvent = {
				summonUnitType: this.depend.unitTypes.AspectOfFire,
				banners: [this.banners.center1, this.banners.center2, this.banners.center3, this.banners.center4],
				eventInterval: 220,
				eventTime: 50
			}
			new AspectOfFireEvent(this.depend, event)
			this.time.destroy()
		})
	}
}
