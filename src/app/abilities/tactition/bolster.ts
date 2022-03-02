// import { Ability } from 'app/classes'
// import { AbilityType } from 'app/classes/abilityType/abilityType'
// import { TargetType } from "app/classes/abilityType/TargetType"
// import { EffectType } from "app/classes/abilityType/EffectType"
// import { Logger } from 'app/log'
// import { Pathing } from 'app/systems/pathing'
// import { Forces } from 'lib/w3ts/handles/Forces'
// import { AbilityFour, Order, Unit, Group, Effect, AbilityModel, AttachPoint, BuffFour } from 'lib/w3ts/index'

// export class BolsterAbility extends AbilityType {
// 	constructor () {
// 		super({
// 			four: AbilityFour.Bolster,
// 			orderId: Order.Tranquility,
// 			effectType: EffectType.Casts,
// 			targetType: TargetType.SupportAround,
// 			permanent: true,
// 			addEffect: true
// 		})
// 	}

// 	public override getAbility = (): void => {
// 		try {
// 			const eventUnit = Unit.fromEvent()
// 			const ability = Ability.fromHandle(eventUnit, this)

// 			const maxUnits = ability.normalDuration
// 			const maxCombinedLevel = ability.heroDuration
// 			const unitDuration = ability.castRange
// 			const areaOfEffect = ability.areaOfEffect

// 			const unitTypes: number[] = []

// 			const g = new Group()
// 			g.enumUnitsInRange(eventUnit, areaOfEffect)

// 			g.firstLoop((u) => {
// 				if (u.isAlly(eventUnit) &&
// 					(u.inForce(Forces.Computers) || u.owner === eventUnit.owner) &&
// 					!u.isHero &&
// 					!u.isIllusion &&
// 					!u.isStructure &&
// 					!u.invulnerable &&
// 					u.moveSpeed > 0 &&
// 					u.isAlive() &&
// 					u.level < 9 &&
// 					unitTypes.indexOf(u.typeId) === -1) {
// 					unitTypes.push(u.typeId)
// 				}
// 			})
// 			g.destroy()

// 			let currentSummonLevel = 0
// 			let currentSummonAmount = 0
// 			while (currentSummonAmount < maxUnits && currentSummonLevel < maxCombinedLevel) {
// 				const pos = eventUnit.polarProjection(math.random(80, areaOfEffect), math.random(0, 359))
// 				const u = new Unit(eventUnit.owner, unitTypes[GetRandomInt(0, unitTypes.length - 1)], pos, eventUnit.facing)
// 				new Effect(AbilityModel.charmTarget, u, AttachPoint.overhead).destroy()
// 				u.applyTimedLife(BuffFour.TimedLifeGeneric, unitDuration)

// 				Pathing.newOrders(u)
// 				currentSummonLevel += u.level
// 				currentSummonAmount += 1
// 			}
// 		} catch (error) {
// 			Logger.Error('Bolster', error)
// 		}
// 	}
// }
