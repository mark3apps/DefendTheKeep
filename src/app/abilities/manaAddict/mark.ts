// import { Ability } from 'app/classes'
// import { AbilityType } from 'app/classes/abilityType/abilityType'
// import { TargetType } from "app/classes/abilityType/TargetType"
// import { EffectType } from "app/classes/abilityType/EffectType"
// import { Logger } from 'app/log'
// import { Position } from 'app/classes/position'
// import { UnitType } from 'app/classes/unitType'
// import { AbilityFour, Order, BuffFour, Unit, Group, Timer, Effect, AbilityModel, AttachPoint } from 'lib/w3ts/index'

// export class AbilityMark extends AbilityType {
// 	constructor () {
// 		super({
// 			four: AbilityFour.Mark,
// 			orderId: Order.Clusterrockets,
// 			buffFour: BuffFour.ManaAddictSoulBind,
// 			effectType: EffectType.Casts,
// 			targetType: TargetType.ModifyArea,
// 			permanent: true,
// 			starting: true,
// 			addEffect: true,
// 			addBuffDeath: true
// 		})
// 	}

// 	public override getAbility = (): void => {
// 		Logger.Information('Working')

// 		try {
// 			const eventUnit = Unit.fromEvent()
// 			const ability = Ability.fromHandle(eventUnit, this)

// 			const targetPos = Position.fromSpellTarget()

// 			const areaOfEffect = ability.areaOfEffect
// 			const manaGiven = ability.heroDuration

// 			const g = new Group()
// 			g.enumUnitsInRange(targetPos, areaOfEffect, () => {
// 				const u = Unit.fromFilter()

// 				return u.isAlive() &&
// 					!u.isStructure &&
// 					!u.isHero &&
// 					u.isEnemy(eventUnit) &&
// 					!u.isMagicImmune &&
// 					u.moveSpeed !== 0 &&
// 					!u.hasBuff(this.buffId as number)
// 			})

// 			g.firstLoop((u) => {
// 				u.custom.set('markManaGiven', manaGiven)
// 				u.custom.set('markCaster', eventUnit)
// 			})
// 			g.destroy()
// 		} catch (error) {
// 			Logger.Error('Mark', error)
// 		}
// 	}

// 	public override onBuffDeath = (): void => {
// 		Logger.Information('Working')
// 		try {
// 			const eventUnit = Unit.fromEvent()

// 			const manaGiven = eventUnit.custom.get('markManaGiven') as number
// 			const caster = eventUnit.custom.get('markCaster') as Unit

// 			const u = new Unit(caster.owner, UnitType.DummyMarkForDeath, eventUnit.coordinate, eventUnit.facing)

// 			u.issueTargetOrder(Order.Attack, caster)

// 			const timer = new Timer()

// 			timer.start(1, true, () => {
// 				if (u.distanceTo(caster) < 150) {
// 					u.kill()
// 					caster.mana += manaGiven
// 					new Effect(AbilityModel.charmTarget, caster, AttachPoint.chest).destroy()
// 					timer.destroy()
// 				} else {
// 					u.issueTargetOrder(Order.Attack, caster)
// 				}
// 			})
// 		} catch (error) {
// 			Logger.Error('Mark Buff Death', error)
// 		}
// 	}
// }
