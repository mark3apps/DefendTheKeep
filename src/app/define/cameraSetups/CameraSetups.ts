import { CameraSetup } from '../../../lib/w3ts/handles/camera'

export class CameraSetups {
	protected static instance: CameraSetups

	static getInstance () {
		if (!CameraSetups.instance) CameraSetups.instance = new CameraSetups()
		return CameraSetups.instance
	}

	/// / AUTO DEFINE
	baseLeftStart: CameraSetup
	intro06: CameraSetup
	intro01: CameraSetup
	intro02: CameraSetup
	intro03: CameraSetup
	intro04: CameraSetup
	intro05: CameraSetup
	baseRightStart: CameraSetup
	intro07: CameraSetup
	intro08: CameraSetup
	intro09: CameraSetup
	intro10: CameraSetup
	intro11: CameraSetup
	intro12: CameraSetup
	intro13: CameraSetup
	baseLeftPanStart: CameraSetup
	baseRightPanStart: CameraSetup
	intro14: CameraSetup

	constructor () {
		this.baseLeftStart = CameraSetup.fromHandle(gg_cam_baseLeftStart)
		this.intro06 = CameraSetup.fromHandle(gg_cam_intro06)
		this.intro01 = CameraSetup.fromHandle(gg_cam_intro01)
		this.intro02 = CameraSetup.fromHandle(gg_cam_intro02)
		this.intro03 = CameraSetup.fromHandle(gg_cam_intro03)
		this.intro04 = CameraSetup.fromHandle(gg_cam_intro04)
		this.intro05 = CameraSetup.fromHandle(gg_cam_intro05)
		this.baseRightStart = CameraSetup.fromHandle(gg_cam_baseRightStart)
		this.intro07 = CameraSetup.fromHandle(gg_cam_intro07)
		this.intro08 = CameraSetup.fromHandle(gg_cam_intro08)
		this.intro09 = CameraSetup.fromHandle(gg_cam_intro09)
		this.intro10 = CameraSetup.fromHandle(gg_cam_intro10)
		this.intro11 = CameraSetup.fromHandle(gg_cam_intro11)
		this.intro12 = CameraSetup.fromHandle(gg_cam_intro12)
		this.intro13 = CameraSetup.fromHandle(gg_cam_intro13)
		this.baseLeftPanStart = CameraSetup.fromHandle(gg_cam_baseLeftPanStart)
		this.baseRightPanStart = CameraSetup.fromHandle(gg_cam_baseRightPanStart)
		this.intro14 = CameraSetup.fromHandle(gg_cam_intro14)
	}
}
