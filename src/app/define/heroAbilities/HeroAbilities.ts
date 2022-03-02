import { FallingStrike, Shadestorm, Shift, Switch } from '../hero/shiftmaster/abilities'
import { HeroAbility } from 'app/classes/heroAbility/HeroAbility'
import { IHeroAbilitiesDepend } from './IHeroAbilitiesDepend'
import { FelForm } from '../hero/shiftmaster/abilities/felForm'

export class HeroAbilities {
	// Static
	protected static instance?: HeroAbilities

	static getInstance (depend: IHeroAbilitiesDepend) {
		if (!HeroAbilities.instance) HeroAbilities.instance = new HeroAbilities(depend)
		return HeroAbilities.instance
	}

	// Instance
	shift
	felForm
	switch
	fallingStrike
	shadeStorm

	private constructor (depend: IHeroAbilitiesDepend) {
		// Dependencies
		const abilTypes = depend.abilityTypes
		const abilCast = depend.abilityCast

		//
		// Shift Master
		//

		// Shift
		this.shift = new HeroAbility(depend, {
			abilType: abilTypes.shift,
			starting: true,
			TriggerUnit: abilCast.CastingHero,
			unitAbility: (unitAbil) => { return Shift.fromHandle(unitAbil) }
		})
		// Switch
		this.switch = new HeroAbility(depend, {
			abilType: abilTypes.switch,
			starting: true,
			TriggerUnit: abilCast.CastingHero,
			unitAbility: (unitAbil) => { return Switch.fromHandle(unitAbil) }
		})
		// Falling Strike
		this.fallingStrike = new HeroAbility(depend, {
			abilType: abilTypes.fallingStrike,
			starting: true,
			TriggerUnit: abilCast.CastingHero,
			unitAbility: (unitAbil) => { return FallingStrike.fromHandle(unitAbil) }
		})
		// Fel Form
		this.felForm = new HeroAbility(depend, {
			abilType: abilTypes.felForm,
			starting: false,
			TriggerUnit: abilCast.CastingHero,
			unitAbility: (unitAbil) => { return FelForm.fromHandle(unitAbil) }
		})
		// Fel Form
		this.shadeStorm = new HeroAbility(depend, {
			abilType: abilTypes.shadeStorm,
			starting: false,
			ult: true,
			TriggerUnit: abilCast.CastingHero,
			unitAbility: (unitAbil) => { return Shadestorm.fromHandle(unitAbil) }
		})
	}
}
