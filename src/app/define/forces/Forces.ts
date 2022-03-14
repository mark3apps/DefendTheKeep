/** @format */

import { Force, Players } from "lib/w3ts"

export class Forces {
  protected static instance: Forces

  static getInstance() {
    if (!Forces.instance) Forces.instance = new Forces()
    return Forces.instance
  }

  Alliance: Force
  AlliancePlayers: Force
  Federation: Force
  FederationPlayers: Force
  Computers: Force
  Humans: Force

  constructor() {
    this.Alliance = new Force()
    this.Federation = new Force()
    this.Computers = new Force()
    this.AlliancePlayers = new Force()
    this.FederationPlayers = new Force()

    this.Humans = new Force()
    for (let i = 0; i < 11; i++) {
      const player = Players[i]

      if (player.slotState === PLAYER_SLOT_STATE_PLAYING) {
        this.Humans.addPlayer(Players[i])
      }
    }
  }
}
