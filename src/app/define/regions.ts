import { Rectangle } from '../../lib/w3ts/handles/rect'
import { Region } from '../../lib/w3ts/handles/region'

export class Regions {
	protected static instance: Regions

	static getInstance () {
		if (!Regions.instance) Regions.instance = new Regions()
		return Regions.instance
	}

	BigTop: Region
	BigMiddle: Region
	BigBottom: Region

	constructor () {
		this.BigTop = new Region()
		this.BigMiddle = new Region()
		this.BigBottom = new Region()

		this.BigTop.addRect(Rectangle.fromHandle(gg_rct_Big_Top_Left))
		this.BigTop.addRect(Rectangle.fromHandle(gg_rct_Big_Top_Left_Center))
		this.BigTop.addRect(Rectangle.fromHandle(gg_rct_Big_Top_Right))
		this.BigTop.addRect(Rectangle.fromHandle(gg_rct_Big_Top_Right_Center))

		this.BigMiddle.addRect(Rectangle.fromHandle(gg_rct_Big_Middle_Left))
		this.BigMiddle.addRect(Rectangle.fromHandle(gg_rct_Big_Middle_Left_Center))
		this.BigMiddle.addRect(Rectangle.fromHandle(gg_rct_Big_Middle_Right))
		this.BigMiddle.addRect(Rectangle.fromHandle(gg_rct_Big_Middle_Right_Center))

		this.BigBottom.addRect(Rectangle.fromHandle(gg_rct_Big_Bottom_Left))
		this.BigBottom.addRect(Rectangle.fromHandle(gg_rct_Big_Bottom_Left_Center))
		this.BigBottom.addRect(Rectangle.fromHandle(gg_rct_Big_Bottom_Right))
		this.BigBottom.addRect(Rectangle.fromHandle(gg_rct_Big_Bottom_Right_Center))
	};
}
