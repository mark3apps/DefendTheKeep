/** @format */

import { UnitType, AbilityType, Hero } from "app/classes"
import { HeroAttribute } from "app/systems"
import { ShiftMasterSkillTree } from "app/define/hero/shiftmaster/shiftMasterSkillTree"
import { Strategy } from "lib/resources/strategy"
import { AbilityFour, Order } from "lib/w3ts"
import { HeroType } from "app/classes/heroType/heroType"
export class TimeMageHeroType extends HeroType {
	// constructor () {
	// 	super('H00J', 'TimeMage')
	// 	// Set up Talent Trees
	// 	this.talentTrees = (u: Hero) => {
	// 		const skill = new DruidBalanceTree(u)
	// 		const guard = new DruidBalanceTree(u)
	// 		const armor = new DruidBalanceTree(u)
	// 		u.skillTree.SetTree(skill)
	// 		u.guardTree.SetTree(guard)
	// 		u.armorTree.SetTree(armor)
	// 	}
	// 	// Attributes
	// 	this.addHeroAttribute(HeroAttribute.intelligence)
	// 	this.addHeroAttribute(HeroAttribute.ranged)
	// 	this.addHeroAttribute(HeroAttribute.healer)
	// 	// Items
	// 	// AI Setup
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
	// 	this.traitAgressive = 40
	// 	this.traitDefensive = 40
	// 	this.traitSupport = 80
	// 	this.traitAssassinate = 40
	// 	this.addStrategy(Strategy.Agressive)
	// 	this.addStrategy(Strategy.Neutral)
	// 	this.addStrategy(Strategy.Defensive)
	// 	// Abilities
	// 	// Chrono Atrophy
	// 	this.addHeroAbilityType(new AbilityType({
	// 		four: AbilityFour.ChronoAtrophy,
	// 		orderId: Order.Flamestrike,
	// 		type: EffectType.Instant,
	// 		target: TargetType.ModifyArea,
	// 		permanent: true,
	// 		starting: true,
	// 		ult: false
	// 	}))
	// 	// Decay
	// 	this.addHeroAbilityType(new AbilityType({
	// 		four: AbilityFour.Decay,
	// 		orderId: Order.Shadowstrike,
	// 		type: EffectType.Instant,
	// 		target: TargetType.ModifySingle,
	// 		permanent: true,
	// 		starting: true,
	// 		ult: false
	// 	}))
	// 	// Time Travel
	// 	this.addHeroAbilityType(new AbilityType({
	// 		four: AbilityFour.TimeTravel,
	// 		orderId: Order.Clusterrockets,
	// 		type: EffectType.Instant,
	// 		target: TargetType.ModifyArea,
	// 		permanent: true,
	// 		starting: false,
	// 		ult: false
	// 	}))
	// 	// Paradox
	// 	this.addHeroAbilityType(new AbilityType({
	// 		four: AbilityFour.Paradox,
	// 		orderId: Order.Tranquility,
	// 		type: EffectType.Channel,
	// 		target: TargetType.ModifyAround,
	// 		permanent: true,
	// 		starting: false,
	// 		ult: true
	// 	}))
	// }
}
