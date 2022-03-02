/** @format */

import { Hero } from "app/classes"
import { AbilityType } from "app/classes/abilityType/abilityType"
import { TargetType } from "app/classes/abilityType/enums/TargetType"
import { EffectType } from "app/classes/abilityType/enums/EffectType"
import { UnitType } from "app/classes/unitType/UnitType"
import { HeroAttribute } from "app/systems/heroAttribute/heroAttribute"
import { ShiftMasterSkillTree } from "app/define/hero/shiftmaster/shiftMasterSkillTree"
import { Strategy } from "lib/resources/strategy"
import { HeroType } from "app/classes/heroType/heroType"
import { AbilityFour, Order } from "lib/w3ts/index"

export class TacticianHeroType extends HeroType {
	// constructor () {
	// 	super('H009', 'Tactician')
	// 	this.talentTrees = (u: Hero) => {
	// 		const skill = new DruidBalanceTree(u)
	// 		const guard = new DruidBalanceTree(u)
	// 		const armor = new DruidBalanceTree(u)
	// 		u.skillTree.SetTree(skill)
	// 		u.guardTree.SetTree(guard)
	// 		u.armorTree.SetTree(armor)
	// 	}
	// 	this.defineAbilities()
	// 	this.defineAttributes()
	// 	this.defineItems()
	// 	this.defineAI()
	// }
	// public override defineAttributes (): void {
	// 	this.addHeroAttribute(HeroAttribute.strength)
	// 	this.addHeroAttribute(HeroAttribute.melee)
	// 	this.addHeroAttribute(HeroAttribute.brawler)
	// }
	// public override defineItems (): void {
	// 	// Empty
	// }
	// public override defineAI (): void {
	// 	this.lifeFactor = 1
	// 	this.manaFactor = 0.02
	// 	this.lifeHighPercent = 65
	// 	this.lifeLowPercent = 20
	// 	this.lifeLowNumber = 400
	// 	this.highDamageSingle = 17
	// 	this.highDamageAverage = 25
	// 	this.powerBase = 500
	// 	this.powerLevel = 200
	// 	this.unitClumpCheck = true
	// 	this.unitClumpRange = 100
	// 	this.intelRange = 1100
	// 	this.intelCloseRange = 500
	// 	this.traitAgressive = 60
	// 	this.traitDefensive = 30
	// 	this.traitSupport = 60
	// 	this.traitAssassinate = 0
	// 	this.addStrategy(Strategy.Agressive)
	// 	this.addStrategy(Strategy.Neutral)
	// 	this.addStrategy(Strategy.Defensive)
	// }
	// public override defineAbilities (): void {
	// 	// Standard Abilities
	// 	// Iron Defense
	// 	this.addHeroAbilityType(new AbilityType({
	// 		four: AbilityFour.IronDefense,
	// 		orderId: Order.Roar,
	// 		type: EffectType.Instant,
	// 		target: TargetType.SupportSelf,
	// 		permanent: true,
	// 		starting: true
	// 	}))
	// 	// Raise Banner
	// 	this.addHeroAbilityType(new AbilityType({
	// 		four: AbilityFour.RaiseBanner,
	// 		orderId: Order.Healingward,
	// 		type: EffectType.Instant,
	// 		target: TargetType.SupportArea,
	// 		permanent: true,
	// 		starting: true
	// 	}))
	// 	// Custom Abilities
	// 	this.addHeroAbilityType(new BolsterAbility())
	// 	this.addHeroAbilityType(new AttackAbility())
	// 	this.addHeroAbilityType(new InspireAbility())
	// 	new AbilityInspireDeath()
	// }
}
