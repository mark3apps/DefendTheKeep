import { UnitType } from 'app/classes'
import { Position } from 'app/classes/position'
import { Logger } from 'app/log'
import { Unit, Rectangle, Force, Trigger, Timer, Effect, AbilityModel, Destructable, Order } from 'lib/w3ts/index'
import { Loc } from '../loc/loc'
import { IAspect } from './IAspect'
import { IAspectDepend } from './IAspectDepend'

export class Aspect {
	readonly origAspect!: Unit
	readonly aspectType: UnitType
	readonly gateRegion?: Rectangle
	readonly gateTypeId?: number
	readonly dependent!: Unit
	readonly force!: Force
	private deathPos?: Position
	private deathFacing?: number

	aspect?: Unit
	respawnTime: number
	dest: Loc

	aspectDies = new Trigger()
	dependentDies = new Trigger()

	respawnTimer = new Timer()

	// Dependencies
	forces

	constructor (depend: IAspectDepend, aspect: IAspect) {
		this.forces = depend.forces

		if (aspect.gateRegion && aspect.gateTypeId) {
			this.gateRegion = aspect.gateRegion
			this.gateTypeId = FourCC(aspect.gateTypeId)
		}

		this.origAspect = aspect.unit
		this.aspectType = this.origAspect.type as UnitType
		this.dependent = aspect.dependentUnit
		this.force = aspect.force
		this.respawnTime = aspect.respawnTime
		this.dest = aspect.dest

		this.aspectDies.registerUnitEvent(this.origAspect, EVENT_UNIT_DEATH)
		this.aspectDies.addAction(() => { this.onDeath() })
		this.dependentDies.registerUnitEvent(this.dependent, EVENT_UNIT_DEATH)
		this.dependentDies.addAction(() => { this.onDependentDeath() })
	}

	public onDeath (): void {
		try {
			if (this.dependent.isAlive()) {
				const u = Unit.fromDying()
				new Effect(AbilityModel.deathPactTarget, u.x, u.y).destroy()

				if (u === this.origAspect) {
					this.deathPos = new Position(this.origAspect.coordinate)
					this.deathFacing = this.origAspect.facing

					// Open the Gate
					if (this.gateRegion != null) {
						this.gateRegion.enumDestructables(() => { return Destructable.fromFilter().typeId === this.gateTypeId }, () => {
							Destructable.fromEnum().openGate()
						})
					}

					this.forces.Humans.displayTimedText(10, `BEWARE!  ${this.dependent.owner.name} has bested the ${u.name}!  It will now enter the fray allied to them!`)
					this.deathPos.pingMinimap(10, true, 255)

					// Initial Timer
					this.respawnTimer.start(3, false, () => {
						new Effect(AbilityModel.darkPortalTarget, this.deathPos as Position, {}).destroy()
						this.aspect = new Unit({ owner: this.force.getRandomPlayer(), type: this.aspectType, coor: this.deathPos as Position, facing: this.deathFacing ?? 0 })
						this.aspect.issueOrderAt(Order.Attack, this.dest.randomX, this.dest.randomY)
						this.aspectDies.registerUnitEvent(this.aspect, EVENT_UNIT_DEATH)
					})
				} else {
					this.respawnTimer.start(this.respawnTime, false, () => {
						new Effect(AbilityModel.darkPortalTarget, this.deathPos as Position, {}).destroy()
						this.aspect = new Unit({ owner: this.force.getRandomPlayer(), type: this.aspectType, coor: this.deathPos as Position, facing: this.deathFacing ?? 0 })
						this.aspect.issueOrderAt(Order.Attack, this.dest.randomX, this.dest.randomY)
						this.aspectDies.registerUnitEvent(this.aspect, EVENT_UNIT_DEATH)
					})
				}
			}
		} catch (error) {
			Logger.Error('Aspect', error)
		}
	}

	public onDependentDeath (): void {
		this.aspectDies.destroy()
		this.respawnTimer.destroy()
	}
}
