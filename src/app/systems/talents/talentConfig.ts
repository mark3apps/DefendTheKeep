import { IBasicTalentTreeViewModelConfig } from 'lib/STK/UI/STK/ViewModels/BasicTalentTreeViewModel'
import { IBasicTalentViewModelConfig } from 'lib/STK/UI/STK/ViewModels/BasicTalentViewModel'
import { IBasicTalentTreeViewConfig } from 'lib/STK/UI/STK/Views/BasicTalentTreeView'
import { IBasicTalentViewConfig } from 'lib/STK/UI/STK/Views/BasicTalentView'

export class TalentConfig {
	talentTreeView: IBasicTalentTreeViewConfig = {
		window: {
			x: 0.370,
			y: 0.55,
			width: 0.25,
			height: 0.38
		},
		title: {
			backgroundArt: 'UI/Glues/Loading/LoadBar/Loading-BarBorder.blp',
			textScale: 1,
			topLeftOffset: [0.01, -0.016],
			bottomRightOffset: [-0.01, -0.046]
		},
		cancelButton: {
			text: 'Cancel',
			x: 0.039,
			y: -0.005,
			width: 0.103,
			height: 0.02941
		},
		confirmButton: {
			text: 'Confirm',
			x: -0.039,
			y: -0.005,
			width: 0.103,
			height: 0.02941
		},
		closeButton: {
			text: '|cffFCD20D×|r',
			x: -0.001,
			y: -0.001,
			height: 0.025,
			width: 0.025
		},
		talentTreeContainer: {
			topLeftOffset: [0.020126, -0.0408],
			bottomRightOffset: [-0.020126, 0.0274],
			backgroundArt: {
				topLeftOffset: [0.009, -0.01],
				bottomRightOffset: [-0.009, 0.01]
			}
		}
	}

	talentView: IBasicTalentViewConfig = {
		buttonHeight: 0.035,
		buttonWidth: 0.035,
		buttonTexture: 'ReplaceableTextures/CommandButtons/BTNPeasant.blp',
		highlight: {
			width: 0.031,
			height: 0.031,
			texture: 'UI/Widgets/Console/Human/CommandButton/human-activebutton.blp'
		},
		link: {
			activeTexture: 'Textures/Water00.blp',
			inactiveTexture: 'UI/Widgets/Console/Human/human-inventory-slotfiller.blp',
			width: 0.004
		},
		rank: {
			x: -0.0006,
			y: 0.0015,
			size: {
				width: 0.016,
				height: 0.010
			},
			texture: 'UI/Widgets/Console/Human/human-transport-slot.blp',
			textScale: 0.72
		},
		tooltip: {
			width: 0.28,
			height: 0.16,
			textX: 0,
			textY: 0,
			textWidth: 0.25,
			textHeight: 0.13,
			defaultText: 'Default talent name \n\nDefault talent description'
		}
	}

	talentViewModel: IBasicTalentViewModelConfig = {
		activeLinkTexture: 'Textures/Water00.blp',
		inactiveLinkTexture: 'UI/Widgets/Console/Human/human-inventory-slotfiller.blp'
	}

	talentTreeViewModel: IBasicTalentTreeViewModelConfig = {
		boxWidth: 0.3,
		boxHeight: 0.44,
		sideMargin: 0.25,
		verticalMargin: 0.25
	}
}
