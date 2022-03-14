/** @format */

import { Unit } from "lib/w3ts"

export class Units {
  private static instance?: Units

  static getInstance() {
    if (!Units.instance) Units.instance = new Units()
    return Units.instance
  }

  /// AUTO DEFINE
  h00E_0081: Unit
  n00K_0477: Unit
  o00C_0225: Unit
  o00C_0215: Unit

  private constructor() {
    this.h00E_0081 = Unit.fromHandle(gg_unit_h00E_0081)
    this.n00K_0477 = Unit.fromHandle(gg_unit_n00K_0477)
    this.o00C_0225 = Unit.fromHandle(gg_unit_o00C_0225)
    this.o00C_0215 = Unit.fromHandle(gg_unit_o00C_0215)
  }
  /// AUTO DEFINE
}
