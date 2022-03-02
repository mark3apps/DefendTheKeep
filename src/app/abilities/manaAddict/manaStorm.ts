// import { Ability } from 'app/classes'
// import { AbilityType } from 'app/classes/abilityType/abilityType'
// import { TargetType } from "app/classes/abilityType/TargetType"
// import { EffectType } from "app/classes/abilityType/EffectType"
// import { Logger } from 'app/log'
// import { UnitType } from 'app/classes/unitType'
// import { AbilityFour, Order, Unit, Effect, CustomModel, Group, BuffFour } from 'lib/w3ts/index'

// export class AbilityManaStorm extends AbilityType {
// 	constructor () {
// 		super({
// 			four: AbilityFour.ManaStorm,
// 			effectType: EffectType.Casts,
// 			orderId: Order.Starfall,
// 			targetType: TargetType.DamageAround,
// 			permanent: true,
// 			ult: true,
// 			addEffect: true
// 		})
// 	}

// 	public override getAbility = (): void => {
// 		try {
// 			const eventUnit = Unit.fromEvent()
// 			const ability = Ability.fromHandle(eventUnit, this)

// 			// Ability Defined Values
// 			const areaOfEffect = ability.areaOfEffect
// 			const duration = ability.getLevelField(ABILITY_RLF_FOLLOW_THROUGH_TIME) as number
// 			const bolts = ability.castRange
// 			const manaCostPerBolt = ability.normalDuration
// 			const damage = ability.heroDuration

// 			// Static Values
// 			const tick = 0.15
// 			const dummyId = UnitType.DummyManaStorm

// 			// Get the total Ticks
// 			const durationTick = duration / tick

// 			// Set up Visuals
// 			const sfxHero = new Effect(CustomModel.manaStorm, eventUnit.x, eventUnit.y)
// 			sfxHero.scale = 0.75

// 			// Temp Vars
// 			let pickedAmount: number

// 			for (let i = 0; i < durationTick; i++) {
// 				// Log.Information("Working")

// 				const g = new Group()
// 				g.enumUnitsInRange(eventUnit, areaOfEffect, () => {
// 					const u = Unit.fromFilter()
// 					return u.isEnemy(eventUnit) &&
// 						u.isAlive() &&
// 						!u.isMagicImmune &&
// 						!u.isStructure &&
// 						u.moveSpeed !== 0
// 				})

// 				if (g.size > 0) {
// 					g.size < bolts ? pickedAmount = g.size : pickedAmount = bolts

// 					// Pick the amount of Units and Attack
// 					for (let i = 0; i < pickedAmount; i++) {
// 						const u = g.getRandomUnit()
// 						g.removeUnit(u)

// 						const dummy = new Unit(eventUnit.owner, dummyId, eventUnit.coordinate, eventUnit.angleTo(u))
// 						dummy.weapon1Base = damage - 1
// 						dummy.issueTargetOrder(Order.Attack, u)
// 						dummy.applyTimedLife(BuffFour.TimedLifeGeneric, 1.5)
// 						dummy.setAbilityLevel(AbilityFour.ManaStormFeedback, ability.level)
// 						eventUnit.mana -= manaCostPerBolt
// 					}
// 				}
// 				g.destroy()

// 				// Stop casting if unit is no longer channelling
// 				if (!ability.isCasting()) {
// 					sfxHero.destroy()
// 					break
// 				}

// 				PolledWait(tick)
// 			}
// 		} catch (error) {
// 			Logger.Error('Mana Storm', error)
// 		}
// 	}
// }
