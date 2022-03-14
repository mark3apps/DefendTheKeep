/** @format */

import { Banner } from "../../systems/banner/banner"
import { IBannersDepend } from "./IBannersDepend"

export class Banners {
  private static instance?: Banners

  static getInstance(depend: IBannersDepend) {
    if (!Banners.instance) Banners.instance = new Banners(depend)
    return Banners.instance
  }

  // center1: Banner
  //   center2: Banner

  constructor(depend: IBannersDepend) {
    const units = depend.units

    // this.center1 = new Banner(depend, { unit: units.o00C_0215 })
    // this.center2 = new Banner(depend, { unit: units.o00C_0225 })
  }
}
