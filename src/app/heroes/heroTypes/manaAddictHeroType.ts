/** @format */

import { Hero } from "app/classes"
import { AbilityType } from "app/classes/abilityType/abilityType"
import { TargetType } from "app/classes/abilityType/enums/TargetType"
import { EffectType } from "app/classes/abilityType/enums/EffectType"
import { HeroAttribute } from "app/systems/heroAttribute/heroAttribute"
import { ShiftMasterSkillTree } from "app/define/hero/shiftmaster/shiftMasterSkillTree"
import { Strategy } from "lib/resources/strategy"
import { HeroType } from "app/classes/heroType/heroType"
import { AbilityFour, Order, BuffFour } from "lib/w3ts/index"

export class ManaAddictHeroType extends HeroType {
	// constructor () {
	// 	super('H00R', 'Mana Addict')
	// 	this.talentTrees = (u: Hero) => {
	// 		const skill = new DruidBalanceTree(u)
	// 		const guard = new DruidBalanceTree(u)
	// 		const armor = new DruidBalanceTree(u)
	// 		u.skillTree.SetTree(skill)
	// 		u.guardTree.SetTree(skill)
	// 		u.armorTree.SetTree(skill)
	// 	}
	// 	// Attributes
	// 	this.addHeroAttribute(HeroAttribute.intelligence)
	// 	this.addHeroAttribute(HeroAttribute.ranged)
	// 	this.addHeroAttribute(HeroAttribute.mage)
	// 	// Items
	// 	// AI Setup
	// 	this.lifeFactor = 1
	// 	this.manaFactor = 0.75
	// 	this.lifeHighPercent = 85
	// 	this.lifeLowPercent = 25
	// 	this.lifeLowNumber = 300
	// 	this.highDamageSingle = 3
	// 	this.highDamageAverage = 18
	// 	this.powerBase = 700
	// 	this.powerLevel = 220
	// 	this.unitClumpCheck = true
	// 	this.unitClumpRange = 100
	// 	this.intelRange = 1000
	// 	this.intelCloseRange = 400
	// 	this.traitAgressive = 20
	// 	this.traitDefensive = 60
	// 	this.traitSupport = 80
	// 	this.traitAssassinate = 0
	// 	this.addStrategy(Strategy.Agressive)
	// 	this.addStrategy(Strategy.Neutral)
	// 	this.addStrategy(Strategy.Defensive)
	// 	// Abilities
	// 	// Mana Shield
	// 	this.addHeroAbilityType(new AbilityType({
	// 		four: AbilityFour.ManaShield,
	// 		orderId: Order.Manashieldon,
	// 		orderIdOff: Order.Manashieldoff,
	// 		buffFour: BuffFour.ManaShield,
	// 		type: EffectType.Instant,
	// 		target: TargetType.SupportSelf,
	// 		permanent: true,
	// 		starting: true
	// 	}))
	// 	// Mana Bomb
	// 	this.addHeroAbilityType(new AbilityType({
	// 		four: AbilityFour.ManaBomb,
	// 		orderId: Order.Flamestrike,
	// 		type: EffectType.Instant,
	// 		target: TargetType.DamageArea,
	// 		permanent: true,
	// 		starting: false
	// 	}))
	// 	// Mana Explosion
	// 	this.addHeroAbilityType(new AbilityType({
	// 		four: AbilityFour.ManaExplosion,
	// 		orderId: Order.Thunderclap,
	// 		type: EffectType.Instant,
	// 		target: TargetType.CrippleAround,
	// 		permanent: true,
	// 		starting: true
	// 	}))
	// 	// Soul Bind
	// 	this.addHeroAbilityType(new AbilityMark())
	// 	// Mana Storm
	// 	this.addHeroAbilityType(new AbilityManaStorm())
	// }
}
