// import { Ability } from 'app/classes'
// import { AbilityType } from 'app/classes/abilityType/abilityType'
// import { TargetType } from "app/classes/abilityType/TargetType"
// import { EffectType } from "app/classes/abilityType/EffectType"
// import { Forces } from 'lib/w3ts/handles/Forces'
// import { AbilityFour, Order, Unit, Group, Timer, Players } from 'lib/w3ts/index'

// export class AttackAbility extends AbilityType {
// 	constructor () {
// 		super({
// 			four: AbilityFour.TactitionAttack,
// 			orderId: Order.Fingerofdeath,
// 			effectType: EffectType.Casts,
// 			targetType: TargetType.Specific,
// 			permanent: true,
// 			starting: true,
// 			addEffect: true
// 		})
// 	}

// 	// Attack

// 	public override getAbility = (): void => {
// 		const eventUnit = Unit.fromEvent()
// 		const targetUnit = Unit.fromSpellTarget()
// 		const ability = Ability.fromHandle(eventUnit, this)
// 		const g = new Group()
// 		const pickedUnits = new Group()
// 		const endTimer = new Timer()

// 		// Get Variable Info
// 		const unitCount = math.floor(ability.heroDuration)
// 		const aoe = ability.areaOfEffect
// 		const level = ability.level
// 		const duration = ability.normalDuration

// 		g.enumUnitsInRange(eventUnit, aoe)

// 		let unitsPicked = 0

// 		let u = g.first
// 		while (u != null && unitsPicked < unitCount) {
// 			if (u.isAlive() &&
// 				(u.inForce(Forces.Computers) || u.owner === eventUnit.owner) &&
// 				u.isAlly(eventUnit) &&
// 				!u.isHero &&
// 				!u.isIllusion &&
// 				!u.isStructure &&
// 				u.level <= 9 &&
// 				u.moveSpeed > 0) {
// 				pickedUnits.addUnit(u)

// 				u.custom.set('attackOriginalOwner', u.owner.id)
// 				u.custom.set('attackOrigDestX', u.destX)
// 				u.custom.set('attackOrigDestY', u.destY)

// 				u.addAbility(AbilityFour.AttackSpellBook)
// 				u.setAbilityLevel(AbilityFour.AttackDamage, level)
// 				u.setAbilityLevel(AbilityFour.AttackFocus, level)
// 				u.setAbilityLevel(AbilityFour.AttackRage, level)
// 				u.setAbilityLevel(AbilityFour.AttackLoyalty, level)
// 				u.setOwner(eventUnit.owner, false)
// 				u.issueTargetOrder(Order.Attack, targetUnit)
// 				unitsPicked += 1
// 			}

// 			g.removeUnit(u)
// 			u = g.first
// 		}
// 		g.destroy()

// 		endTimer.start(duration, false, () => {
// 			pickedUnits.for(() => {
// 				const u = Unit.fromEnum()

// 				u.removeAbility(AbilityFour.AttackSpellBook)

// 				u.setOwner(Players[u.custom.get('attackOriginalOwner') as number], false)
// 				const x = u.custom.get('attackOrigDestX') as number
// 				const y = u.custom.get('attackOrigDestY') as number
// 				u.issueOrderAt(Order.Attack, x, y)

// 				// Clean up Custom Data
// 				u.custom.delete('attackOriginalOwner')
// 				u.custom.delete('attackOrigDestX')
// 				u.custom.delete('attackOrigDestY')
// 			})

// 			// Clean Up Handles
// 			pickedUnits.destroy()
// 			endTimer.destroy()
// 		})
// 	}
// }
