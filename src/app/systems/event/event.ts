import { Coordinate } from 'app/classes/Coordinate'
import { UnitType } from 'app/classes/unitType/UnitType'
import { Timer, Unit, Trigger, Order, PlayerHostile } from 'lib/w3ts/index'
import { Banner } from '../banner/banner'
import { Side } from "../banner/Side"
import { IEvent } from './interfaces/IEvent'
import { IEventDepend } from './interfaces/IEventDepend'

export class Event {
	banners: Banner[] = []
	summonUnitType: UnitType
	eventInterval: number
	eventDuration: number
	timer: Timer
	count = 0
	eventUnit?: Unit
	spawnPos: Coordinate

	// Dependencies
	locs
	forces
	unitTypes

	allianceScore = 0
	federationScore = 0

	eventDeath: Trigger

	constructor (depend: IEventDepend, event: IEvent) {
		// Dependencies
		this.locs = depend.locs
		this.forces = depend.forces
		this.unitTypes = depend.unitTypes

		this.banners = event.banners
		this.summonUnitType = event.summonUnitType
		this.eventInterval = event.eventInterval ?? 240
		this.eventDuration = event.eventTime ?? 30
		this.spawnPos = event.spawnPos

		this.timer = new Timer()
		this.timer.start(this.eventInterval, false, () => { this._onEventStart() })

		this.eventDeath = new Trigger()
		this.eventDeath.addAction(() => { this._onEventUnitDeath() })
		this.onEventInit()
	}

	public onEventInit (): void {
		//
	}

	private _onEventStart (): void {
		const sightUnitAlliance = new Unit({ owner: this.forces.Alliance.getRandomPlayer(), type: this.unitTypes.DummySeer, coor: this.spawnPos })
		sightUnitAlliance.applyTimedLifeGeneric(this.eventDuration)

		const sightUnitFederation = new Unit({ owner: this.forces.Federation.getRandomPlayer(), type: this.unitTypes.DummySeer, coor: this.spawnPos })
		sightUnitFederation.applyTimedLifeGeneric(this.eventDuration)

		this.onEventStart()

		this.count = 0
		this.timer.start(1, true, () => { this._onEventLoop() })
	}

	public onEventStart (): void {
		//
	}

	private _onEventLoop (): void {
		for (let i = 0; i < this.banners.length; i++) {
			const banner = this.banners[i]

			if (banner.currentWinner === Side.Alliance) {
				this.allianceScore += banner.currentPower
			} else if (banner.currentWinner === Side.Federation) {
				this.federationScore += banner.currentPower
			}
		}

		this.onEventLoop()

		this.count += 1
		if (this.count >= this.eventDuration) {
			this.onEventEnd()
			this.timer.pause()
		}
	}

	public onEventLoop (): void {
		//
	}

	public onEventEnd (): void {
		//
	}

	public createUnit (): void {
		if (this.allianceScore > this.federationScore) {
			this.eventUnit = new Unit({ owner: this.forces.Alliance.getRandomPlayer(), type: this.summonUnitType, coor: this.spawnPos })
			this.eventUnit.issueOrderAt(Order.Attack, this.locs.middle.federation.randomX, this.locs.middle.federation.randomY)
		} else if (this.allianceScore < this.federationScore) {
			this.eventUnit = new Unit({ owner: this.forces.Federation.getRandomPlayer(), type: this.summonUnitType, coor: this.spawnPos })
			this.eventUnit.issueOrderAt(Order.Attack, this.locs.middle.alliance.randomX, this.locs.middle.alliance.randomY)
		} else {
			this.eventUnit = new Unit({ owner: PlayerHostile, type: this.summonUnitType, coor: this.spawnPos })
		}

		this.eventUnit.setPathing(false)
		this.eventDeath.registerUnitEvent(this.eventUnit, EVENT_UNIT_DEATH)
	}

	private _onEventUnitDeath (): void {
		this.allianceScore = 0
		this.federationScore = 0
		this.timer.start(this.eventInterval, false, () => { this._onEventStart() })
		this.onEventUnitDeath()
	}

	public onEventUnitDeath (): void {
		//
	}
}
