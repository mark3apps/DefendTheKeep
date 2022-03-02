import { Hero, UnitAbility } from 'app/classes'
import { IAbilityCast } from 'app/classes/abilityCast/interfaces/IAbilityCast'
import { IUnitAbilityParam } from 'app/classes/unitAbility/interfaces/IUnitAbilityParam'

export class SkillTree extends UnitAbility {
	override onEffect (cast: IAbilityCast): void {
		const hero = Hero.fromEvent()
		if (hero) {
			if (hero.guardTree.IsWatched()) hero.guardTree.Hide()
			if (hero.armorTree.IsWatched()) hero.armorTree.Hide()
			hero.skillTree.IsWatched() ? hero.skillTree.Hide() : hero.skillTree.Show()
		}
	}

	static override fromHandle (ability: IUnitAbilityParam) {
		return this.getObject(ability) as SkillTree
	}
}
