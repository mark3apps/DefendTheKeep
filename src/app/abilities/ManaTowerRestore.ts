import { UnitAbility } from 'app/classes'
import { IAbilityCast } from 'app/classes/abilityCast/interfaces/IAbilityCast'
import { IUnitAbilityParam } from 'app/classes/unitAbility/interfaces/IUnitAbilityParam'
import { Group } from 'lib/w3ts'

export class ManaTowerRestore extends UnitAbility {
	override onEffect (cast: IAbilityCast): void {
		const g = new Group()
		g.enumUnitsInRange(this.unit, 1300)

		g.firstLoop((u) => {
			if (u.isStructure &&
				u.typeId !== this.unit.typeId &&
				u.isAlly(this.unit) &&
				u.isAlive() &&
				u.manaPercent < 50 &&
				this.cooldownRemaining === 0 &&
				this.unit.mana > 200) {
				this.castTarget(u)
			}
		})
		g.destroy()
	}

	static override fromHandle (ability: IUnitAbilityParam) {
		return this.getObject(ability) as ManaTowerRestore
	}
}
