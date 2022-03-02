/** @format */

import { UnitTypes } from "app/define/UnitTypes"
import { CameraSetups } from "app/define/cameraSetups/CameraSetups"
import { Forces } from "app/define/forces/Forces"

export interface ICinematicDepend {
  forces: Forces
  camSetups: CameraSetups
  unitTypes: UnitTypes
}
