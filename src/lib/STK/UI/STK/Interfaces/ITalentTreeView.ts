import { Frame } from 'lib/w3ts'

export interface ITalentTreeView {
	window: Frame,
	talentTreeContainer: Frame,
	backgroundArt: Frame,
	titleText: Frame,
	confirm?: {
		buttonMain: Frame,
		text: Frame
	},
	cancel?: {
		buttonMain: Frame,
		text: Frame
	},
	close: {
		buttonMain: Frame,
		text: Frame
	}
}
