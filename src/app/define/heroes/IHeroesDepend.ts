import { Rectangles } from 'app/define/rectangles'
import { Forces } from 'app/define/forces/Forces'
import { ITriggers } from 'app/define/triggers/interfaces/ITriggers'
import { IHeroDepend } from 'app/classes/hero/interfaces/IHeroDepend'

export interface IHeroesDepend extends IHeroDepend {
	triggers: ITriggers
	rects: Rectangles
	forces: Forces
}
