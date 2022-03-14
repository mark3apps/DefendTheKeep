/** @format */

import { Region } from "../../lib/w3ts/handles/region"

export class Regions {
  protected static instance: Regions

  static getInstance() {
    if (!Regions.instance) Regions.instance = new Regions()
    return Regions.instance
  }

  BigTop: Region
  BigMiddle: Region
  BigBottom: Region

  constructor() {
    this.BigTop = new Region()
    this.BigMiddle = new Region()
    this.BigBottom = new Region()
  }
}
