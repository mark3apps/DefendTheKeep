import { AbilityModel, Effect, Group, Timer, Unit } from 'lib/w3ts/index'
import { IBanner } from './IBanner'
import { IBannerDepend } from './IBannerDepend'
import { Side } from './Side'

export class Banner {
	readonly unit: Unit
	readonly range: number
	readonly tick: number

	maxPower: number
	currentPower = 0
	currentWinner: Side
	timer: Timer
	scale = 0.8

	// Dependencies
	forces

	constructor (depend: IBannerDepend, banner: IBanner) {
		this.forces = depend.forces

		this.unit = banner.unit
		this.range = banner.range ?? 550
		this.tick = banner.tick ?? 2
		this.maxPower = banner.maxPower ?? 40
		this.currentWinner = Side.Neutral

		this.timer = new Timer()
		this.timer.start(this.tick, true, () => { this.onTick() })
	}

	public onTick (): void {
		const g = new Group()
		g.enumUnitsInRange(this.unit, this.range)

		let alliancePower = 0
		let federationPower = 0

		g.firstLoop((u) => {
			if (u.isAlive() && u !== this.unit && !u.isStructure) {
				if (u.inForce(this.forces.AllianceAll)) {
					u.isHero ? alliancePower += 4 : alliancePower += 1
				}

				if (u.inForce(this.forces.FederationAll)) {
					u.isHero ? federationPower += 4 : federationPower += 1
				}
			}
		})
		g.destroy()

		switch (this.currentWinner) {
			case Side.Alliance: {
				const newPower = alliancePower - federationPower
				this.currentPower += newPower > 0 ? newPower / 2 : newPower

				if (this.currentPower < 0) {
					this.currentPower *= -1
					this.unit.owner = this.forces.Federation.getRandomPlayer()
					this.currentWinner = Side.Federation
					new Effect(AbilityModel.tomeOfRetrainingCaster, this.unit.x, this.unit.y).destroy()
				}

				break
			}
			case Side.Federation: {
				this.currentPower += federationPower - alliancePower

				if (this.currentPower < 0) {
					this.currentPower *= -1
					this.unit.owner = this.forces.Alliance.getRandomPlayer()
					this.currentWinner = Side.Alliance
					new Effect(AbilityModel.tomeOfRetrainingCaster, this.unit.x, this.unit.y).destroy()
				}

				break
			}
			case Side.Neutral: {
				if (alliancePower > federationPower) {
					this.currentPower += alliancePower - federationPower
					this.unit.owner = this.forces.Alliance.getRandomPlayer()
					this.currentWinner = Side.Alliance
					new Effect(AbilityModel.tomeOfRetrainingCaster, this.unit.x, this.unit.y).destroy()
				} else if (alliancePower < federationPower) {
					this.currentPower += federationPower - alliancePower
					this.unit.owner = this.forces.Federation.getRandomPlayer()
					this.currentWinner = Side.Federation
					new Effect(AbilityModel.tomeOfRetrainingCaster, this.unit.x, this.unit.y).destroy()
				}
				break
			}
			default:
				break
		}

		if (this.currentPower > this.maxPower) {
			this.currentPower = this.maxPower
		}

		const newScale = 0.8 + ((this.currentPower / this.maxPower) * 0.35)

		if (newScale !== this.scale) {
			const speed = 0.6
			const tick = 0.01
			const tickSpeed = (newScale - this.scale) / (speed / tick)

			const time = new Timer()
			const timeStop = new Timer()
			time.start(0.01, true, () => {
				this.scale += tickSpeed
				this.unit.setScale(this.scale, 1, 1)
			})

			timeStop.start(speed, false, () => {
				this.scale = newScale
				this.unit.setScale(this.scale, 1, 1)
				time.destroy()
				timeStop.destroy()
			})
		}
	}
}
