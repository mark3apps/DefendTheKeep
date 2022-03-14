/** @format */

import { Rectangle } from "lib/w3ts"

export class Rectangles {
  protected static instance: Rectangles

  static getInstance() {
    if (!Rectangles.instance) Rectangles.instance = new Rectangles()
    return Rectangles.instance
  }

  /// AUTO DEFINE

  private constructor() {
  }
  /// AUTO DEFINE
}
