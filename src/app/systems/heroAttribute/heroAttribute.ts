import { AbilityType } from 'app/classes/abilityType/abilityType'
import { ItemType } from 'app/classes/itemType'

export class HeroAttribute {
	public items: ItemType[] = []
	public abilities: AbilityType[] = []

	public addItem (itemType: ItemType): void {
		this.items.push(itemType)
	}

	public addAbility (ability: AbilityType): void {
		this.abilities.push(ability)
	}
}
