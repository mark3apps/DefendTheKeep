/** @format */

import { Hero } from "app/classes"
import { HeroAbility } from "app/classes/heroAbility/HeroAbility"
import { ItemType } from "app/classes/itemType"
import { UnitType } from "app/classes/unitType/UnitType"
import { HeroAttribute } from "app/systems/heroAttribute/heroAttribute"
import { Strategy } from "lib/resources/strategy"
import { Unit } from "../../../lib/w3ts/handles/unit"
import { IHeroTypeParam } from "./IHeroTypeParam"

export class HeroType extends UnitType {
	static get(unitId: number) {
		const unitType = this.map.get(unitId)
		return unitType ? (unitType as HeroType) : undefined
	}

	readonly name!: string

	public heroAttributes: HeroAttribute[] = []
	public ultHeroAbility?: HeroAbility
	public heroAbilities: HeroAbility[] = []

	public items: ItemType[] = []

	// AI Globals
	public lifeFactor = 1
	public manaFactor = 0.02
	public lifeHighPercent = 0.85
	public lifeLowPercent = 0.2
	public lifeLowNumber = 400
	public highDamageSingle = 0.17
	public highDamageAverage = 0.25
	public powerBase = 500
	public powerLevel = 200
	public unitClumpCheck = true
	public unitClumpRange = 100
	public intelRange = 1100
	public intelCloseRange = 500
	public talentTrees = (hero: Hero): void => {}
	public onDeath = (u: Unit) => {}

	public traitAggressive = 50
	public traitDefensive = 50
	public traitSupport = 0
	public traitAssassinate = 0

	public strategies: Strategy[] = []

	constructor(heroType: IHeroTypeParam) {
		super(heroType)

		this.name = heroType.name

		HeroType.map.set(this.id, this)
		HeroSelector.addUnit(this.four)
	}

	public addHeroAttribute(attribute: HeroAttribute): void {
		this.heroAttributes.push(attribute)
	}

	public addHeroAbility(heroAbility: HeroAbility): void {
		this.heroAbilities.push(heroAbility)

		if (heroAbility.ult) {
			this.ultHeroAbility = heroAbility
		}
	}

	public addItem(itemType: ItemType): void {
		this.items.push(itemType)
	}

	public addStrategy(strat: Strategy): void {
		this.strategies.push(strat)
	}
}
