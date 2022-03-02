import { UnitAbility, AbilityType } from 'app/classes'
import { AbilityFour } from 'lib/w3ts'

export class DefineTreeAbilities {
	private static instance: DefineTreeAbilities
	static get () {
		if (!DefineTreeAbilities.instance) DefineTreeAbilities.instance = new DefineTreeAbilities()
		return DefineTreeAbilities.instance
	}

	// collection: AbilityType
	// skill: AbilityType
	// guard: AbilityType
	// armor: AbilityType

	private constructor () {
		// Skill Tree Open & Close
		// this.skill = new AbilityType({
		// 	four: 'A024',
		// 	effectType: EffectType.Casts,
		// 	onEffect: () => {
		// 		const hero = HeroMap.fromEvent()
		// 		if (hero) {
		// 			if (hero.guardTree.IsWatched()) hero.guardTree.Hide()
		// 			if (hero.armorTree.IsWatched()) hero.armorTree.Hide()
		// 			hero.skillTree.IsWatched() ? hero.skillTree.Hide() : hero.skillTree.Show()
		// 		}
		// 	}
		// })
		// this.skill.getAbility = (unit) => { return Ability.fromHandle(unit, this.skill) }

		// // Guard Tree Open & Close
		// this.guard = new AbilityType({
		// 	four: 'A03Y',
		// 	effectType: EffectType.Casts,
		// 	onEffect: () => {
		// 		const hero = HeroMap.fromEvent()
		// 		if (hero) {
		// 			if (hero.skillTree.IsWatched()) hero.skillTree.Hide()
		// 			if (hero.armorTree.IsWatched()) hero.armorTree.Hide()
		// 			hero.guardTree.IsWatched() ? hero.guardTree.Hide() : hero.guardTree.Show()
		// 		}
		// 	}
		// })
		// this.guard.getAbility = (unit) => { return Ability.fromHandle(unit, this.guard) }

		// // Armor Tree Open & Close
		// this.armor = new AbilityType({
		// 	four: 'A03W',
		// 	effectType: EffectType.Casts,
		// 	onEffect: () => {
		// 		const hero = HeroMap.fromEvent()
		// 		if (hero) {
		// 			if (hero.guardTree.IsWatched()) hero.guardTree.Hide()
		// 			if (hero.skillTree.IsWatched()) hero.skillTree.Hide()
		// 			hero.armorTree.IsWatched() ? hero.armorTree.Hide() : hero.armorTree.Show()
		// 		}
		// 	}
		// })
		// this.armor.getAbility = (unit) => { return Ability.fromHandle(unit, this.armor) }

		// this.collection = new AbilityType({ four: AbilityFour.Skills })
		// this.collection.getAbility = (unit) => { return Ability.fromHandle(unit, this.collection) }
	}
}
