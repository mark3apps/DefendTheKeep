/** @format */

import { UnitAbility } from "app/classes"
import { AbilityTypes } from "app/define/abilityTypes/abilityTypes"
import { IUnitAbilityParam } from "app/classes/unitAbility/interfaces/IUnitAbilityParam"
import { IAbilityCast } from "app/classes/abilityCast/interfaces/IAbilityCast"
import { Pathing } from "app/systems/spawn/pathing"
import { AbilityField } from "lib/resources/fields"
import { Unit, Group, Timer, Effect, AbilityModel, Attach } from "lib/w3ts/index"
import { UnitTypes } from "app/define/UnitTypes"

export class Shadestorm extends UnitAbility {
	damage = 100
	maxShades = 2
	duration = 10
	augments = 0

	constructor(ability: IUnitAbilityParam) {
		super(ability)
		this.updateTooltips()
	}

	updateTooltip(): void {
		this.tooltip = `Shade Storm - [|cffffcc00${this.augments} Augments|r]`
	}

	updateExtendedTooltip(): void {
		this.extendedTooltip = `The Shift Master calls up to ${this.maxShades} of his nearby shades to go into a whirlwind, dealing damage to all nearby enemies.  After the whirlwind is over, the Shade disapears.

|cff00ffff${this.damage}|r Damage per second
|cff00ffff${this.duration}|r Second Duration`
	}

	override onEffect = (cast: IAbilityCast) => {
		// Get Dependencies (Leave if not yet defined)
		const abilityTypes = AbilityTypes.getInstanceNoCreate()
		const pathing = Pathing.getInstanceNoCreate()
		const unitTypes = UnitTypes.getInstance()
		if (!pathing || !abilityTypes) return

		const aoe = this.areaOfEffect

		const g = new Group()
		g.enumUnitsInRange(this.unit, aoe, () => {
			const u = Unit.fromFilter()
			return u.isIllusion && u.owner === this.unit.owner
		})

		// Reset the Ability if no Shades are within the Area of Effect
		if (g.size === 0) {
			const reset = new Timer()
			reset.start(0.02, false, () => {
				this.resetCooldown()
				this.unit.mana += this.manaCost
				reset.destroy()
			})

			// Cast the Spell!!!
		} else {
			new Effect(AbilityModel.howlCaster, this.unit, Attach.origin).destroy()

			let unitsPicked = 0
			g.firstLoop((u) => {
				if (unitsPicked < this.maxShades) {
					const shade = u.replace(unitTypes.DummyShiftstorm)
					shade.addAbility(abilityTypes.ShadeStormDummy)

					const shadeAbility = UnitAbility.fromHandle({
						unit: shade,
						abilType: abilityTypes.ShadeStormDummy,
					})
					shadeAbility.setLevelField(AbilityField.DAMAGE_PER_SECOND_OWW1, this.damage)
					shadeAbility.normalDuration = this.duration
					shadeAbility.castImmediate()
					pathing.newOrders(shade)

					const killTimer = new Timer()
					killTimer.start(this.duration, false, () => {
						new Effect(
							AbilityModel.mirrorImageDeathCaster,
							shade.coordinate,
							{}
						).destroy()
						shade.destroy()
					})
				}
				unitsPicked += 1
			})
			g.destroy()
		}
	}

	static fromHandle(ability: IUnitAbilityParam) {
		return this.getObject(ability) as Shadestorm
	}
}
