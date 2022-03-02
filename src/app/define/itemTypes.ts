import { ItemType } from '../classes/itemType'

export class ItemTypes {
	protected static instance: ItemTypes

	static getInstance () {
		if (!ItemTypes.instance) ItemTypes.instance = new ItemTypes()
		return ItemTypes.instance
	}

	increasedStamina1
	increasedStamina2
	increasedStamina3

	blink1
	blink2
	blink3

	teleport1
	teleport2
	teleport3

	toughenUp1
	toughenUp2
	toughenUp3

	giveLife1
	giveLife2
	giveLife3

	manaRenewal1
	manaRenewal2
	manaRenewal3

	focus1
	focus2
	focus3

	itemCheck

	constructor () {
		this.increasedStamina1 = new ItemType('I007', 'A05A')
		this.increasedStamina2 = new ItemType('I00D', 'A05B')
		this.increasedStamina3 = new ItemType('I00E', 'A05V')

		this.blink1 = new ItemType('I00C', 'A03R', 'blink', false, [2])
		this.blink2 = new ItemType('I00A', 'A03G', 'blink', false, [2])
		this.blink3 = new ItemType('I00B', 'A044', 'blink', false, [2])

		this.teleport1 = new ItemType('I000', 'A03H', undefined, false, [8])
		this.teleport2 = new ItemType('I008', 'A03Q', undefined, false, [5])
		this.teleport3 = new ItemType('I009', 'A01M', undefined, false, [3])

		this.toughenUp1 = new ItemType('I002', 'A01A')
		this.toughenUp2 = new ItemType('I003', 'A020')
		this.toughenUp3 = new ItemType('I001', 'A055')

		this.giveLife1 = new ItemType('I00G', 'A05P')
		this.giveLife2 = new ItemType('I00H', 'A05C')
		this.giveLife3 = new ItemType('I00I', 'A05O')

		this.manaRenewal1 = new ItemType('I00F', 'A021')
		this.manaRenewal2 = new ItemType('I005', 'A023')
		this.manaRenewal3 = new ItemType('I004', 'A022')

		this.focus1 = new ItemType('I00J', 'A05Q')
		this.focus2 = new ItemType('I00K', 'A05R')
		this.focus3 = new ItemType('I00L', 'A05S')

		this.itemCheck = new ItemType('I00M')
	};
}
