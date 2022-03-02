import { UnitAbility } from 'app/classes'
import { AbilityTypes } from 'app/define/abilityTypes/abilityTypes'
import { Logger } from 'app/log'
import { Trigger, Unit, Anim, Effect, AbilityModel, Timer, DoodadModel, PlayerPassive } from 'lib/w3ts'
import { Event } from './event'
import { IAspectOfFireEvent } from './interfaces/IAspectOfFireEvent'
import { IAspectOfFireEventDepend } from './interfaces/IAspectOfFireEventDepend'

export class AspectOfFireEvent extends Event {
	inferno: Trigger
	wisp?: Unit

	// Dependencies
	units
	rects
	forces
	unitTypes

	constructor (depend: IAspectOfFireEventDepend, aspectOfFireEvent: IAspectOfFireEvent) {
		super(depend, {
			summonUnitType: aspectOfFireEvent.summonUnitType,
			banners: aspectOfFireEvent.banners,
			spawnPos: depend.rects.EventCenter.centerPosition,
			eventInterval: aspectOfFireEvent.eventInterval,
			eventTime: aspectOfFireEvent.eventTime
		})

		// Dependencies
		this.units = depend.units
		this.rects = depend.rects
		this.forces = depend.forces
		this.unitTypes = depend.unitTypes

		this.inferno = new Trigger()
		this.inferno.enabled = false
		this.inferno.registerTimerEvent(30, true)
		this.inferno.addAction(() => { this.infernoAbility() })
	}

	public infernoAbility (): void {
		const abilityTypes = AbilityTypes.getInstance()

		if (this.eventUnit) {
			const count = math.floor(math.random(2, 4))

			for (let i = 0; i < count; i++) {
				const u = new Unit({ owner: this.eventUnit.owner, type: this.unitTypes.Dummy, coor: this.eventUnit.coordinate })
				u.addAbility(abilityTypes.AspectInferno)
				u.applyTimedLifeGeneric(2)

				const ua = new UnitAbility({ unit: u, abilType: abilityTypes.AspectInferno })
				ua.cast(u.getRandomPosAround(500))
			}
		}
	}

	public override onEventInit (): void {
		this.units.h002_0699.setAnimation(Anim.EyeOfSargeras.death)
	}

	public override onEventStart (): void {
		this.units.h002_0699.setAnimation(Anim.EyeOfSargeras.stand)
		this.wisp = new Unit({ owner: PlayerPassive, type: this.unitTypes.DummyCenterEvent, coor: this.spawnPos })
		this.wisp.flyHeight = 50
		this.wisp.applyTimedLifeGeneric(this.eventDuration + 4)
		Logger.Information('Event Started')
	}

	public override onEventLoop (): void {
		if (this.wisp) {
			if (this.allianceScore > this.federationScore) {
				this.wisp.owner = this.forces.Alliance.getRandomPlayer()
			} else {
				this.wisp.owner = this.forces.Federation.getRandomPlayer()
			}
		}
	}

	public override onEventEnd (): void {
		try {
			const regions = [
				[this.rects.EventTL1, this.rects.EventTR1, this.rects.EventBL1, this.rects.EventBR1],
				[this.rects.EventTL2, this.rects.EventTR2, this.rects.EventBL2, this.rects.EventBR2],
				[this.rects.EventTL3, this.rects.EventTR3, this.rects.EventBL3, this.rects.EventBR3]
			]

			const startEffect1 = new Effect(AbilityModel.flameStrikeTarget, this.rects.EventCenter.centerX, this.rects.EventCenter.centerY)

			let count = 0
			const loopTimer = new Timer()
			const endTimer = new Timer()
			loopTimer.start(0.75, true, () => {
				const regionCycle = regions[count]
				for (let i = 0; i < regionCycle.length; i++) {
					const region = regionCycle[i]

					const fire = new Effect(DoodadModel.fireTrapUp, region.centerX, region.centerY)
					const fireTime = new Timer()
					fireTime.start(1.5, false, () => {
						fire.destroy()
						fireTime.destroy()
					})
				}
				count += 1
				if (count >= 3) {
					loopTimer.destroy()
				}
			})

			endTimer.start(4, false, () => {
				this.units.h002_0699.show = false
				new Effect(AbilityModel.doomDeath, this.rects.EventCenter.centerX, this.rects.EventCenter.centerY).destroy()

				startEffect1.destroy()

				this.createUnit()
				this.inferno.enabled = true
				this.infernoAbility()

				loopTimer.destroy()
				endTimer.destroy()
			})
		} catch (error) {
			Logger.Error('Event', error)
		}
	}

	public override onEventUnitDeath (): void {
		this.inferno.enabled = false
		this.units.h002_0699.show = true
		this.units.h002_0699.setAnimation(Anim.EyeOfSargeras.death)
	}
}
