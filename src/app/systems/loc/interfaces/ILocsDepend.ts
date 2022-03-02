import type { ITriggers } from 'app/define/triggers/interfaces/ITriggers'
import type { Rectangles } from 'app/define/rectangles'
import type { Armies } from '../../../define/armies/Armies'

export interface ILocsDepend {
	triggers: ITriggers
	armies: Armies,
	rects: Rectangles
}
