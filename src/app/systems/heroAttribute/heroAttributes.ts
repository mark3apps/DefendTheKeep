
import { HeroAttribute } from './heroAttribute'
import { IHeroAttributes } from './IHeroAttributes'

export class HeroAttributes {
	protected static instance: HeroAttributes

	static getInstance (depend: IHeroAttributes) {
		if (!HeroAttributes.instance) HeroAttributes.instance = new HeroAttributes(depend)
		return HeroAttributes.instance
	}

	strength: HeroAttribute
	agility: HeroAttribute
	intelligence: HeroAttribute

	melee: HeroAttribute
	ranged: HeroAttribute

	brawler: HeroAttribute
	healer: HeroAttribute
	mage: HeroAttribute
	assassin: HeroAttribute

	constructor (depend: IHeroAttributes) {
		const itemTypes = depend.itemTypes

		this.strength = new HeroAttribute()
		this.strength.addItem(itemTypes.increasedStamina1)

		this.agility = new HeroAttribute()
		this.agility.addItem(itemTypes.blink1)

		this.intelligence = new HeroAttribute()
		this.intelligence.addItem(itemTypes.teleport1)

		this.melee = new HeroAttribute()

		this.ranged = new HeroAttribute()

		this.brawler = new HeroAttribute()
		this.brawler.addItem(itemTypes.toughenUp1)

		this.healer = new HeroAttribute()
		this.healer.addItem(itemTypes.giveLife1)

		this.mage = new HeroAttribute()
		this.mage.addItem(itemTypes.manaRenewal1)

		this.assassin = new HeroAttribute()
		this.assassin.addItem(itemTypes.focus1)
	};
}
