
import { HeroAbilities } from 'app/define/heroAbilities/HeroAbilities'
import { HeroAttributes } from 'app/systems/heroAttribute/heroAttributes'

export interface IHeroTypeDepend {
	heroAbils: HeroAbilities,
	heroAttr: HeroAttributes
}
