import { Rectangle } from 'lib/w3ts/index'
import { ILocForward } from './ILocForward'

export interface ILoc {
	rect: Rectangle
	forward?: ILocForward[]
}
