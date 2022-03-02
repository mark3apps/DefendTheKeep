/* eslint-disable no-unused-vars */
type who = player | number | force

declare namespace HeroSelector {
	const unitCreated: (player: player, unitCode: string, isRandom: boolean) => null
	const buttonSelected: (player: player, unitCode: string) => null
	const unitBaned: (player: player, unitCode: string) => null
	const repick: (unit: unit, player?: player) => null
	const autoDetectCategory: (unitCode: string) => null
	const initHeroes: () => null
	const setUnitReq: (unitCode: string, who: who) => null
	const addUnit: (unitCode: string, onlyRandom?: boolean, requirement?: who) => null
	const setUnitCategory: (unitCode: string, category: number) => null
	const addUnitCategory: (unitCode: string, category: number) => null
	const addCategory: (icon: string, text: string) => null
	const clearUnitData: () => null
	const show: (flag: boolean, who?: who) => null
	const setFrameText: (frame: framehandle, text: string, who?: who) => null
	const setTitleText: (text: string, who?: who) => null
	const setBanButtonText: (text: string, who?: who) => null
	const setAcceptButtonText: (text: string, who?: who) => null
	const enablePick: (flag: boolean, who?: who) => null
	const enableBan: (flag: boolean, who?: who) => null
	const forceRandom: (who?: who) => null
	const forcePick: (who?: who) => null
	const buttonRequirementDone: (unitCode: string, player: player) => null
	const deselectButtons: (buttonIndex?: number) => null
	const update: () => null
	const destroy: () => null
	const getDisabledIcon: (icon: string) => string
	const showFrame: (frame: framehandle, flag: boolean, who?: who) => null
	const includesPlayer: (who: who, player: player) => boolean
	const counterChangeUnitCode: (unitCode: string, add: number, player: player) => null
	const frameLoseFocus: (frame: framehandle) => null
	const rollOption: (player: player, includeRandomOnly: boolean, excludedIndex: number, category: number) => number
}
