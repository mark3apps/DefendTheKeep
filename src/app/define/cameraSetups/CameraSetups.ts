/** @format */

import { CameraSetup } from "lib/w3ts"

export class CameraSetups {
  protected static instance: CameraSetups

  static getInstance() {
    if (!CameraSetups.instance) CameraSetups.instance = new CameraSetups()
    return CameraSetups.instance
  }

  /// AUTO DEFINE

  private constructor() {
  }
  /// AUTO DEFINE
}
