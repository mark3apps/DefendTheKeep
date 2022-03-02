import { Base } from '../base/base'
import { IFaction } from './IFaction'

export class Faction {
	alliance: Base
	federation: Base

	constructor (faction: IFaction) {
		this.alliance = faction.alliance
		this.federation = faction.federation
	}
}
