import { Players } from '../../../lib/w3ts/globals/index'
import { Force } from '../../../lib/w3ts/handles/force'

export class Forces {
	protected static instance: Forces

	static getInstance () {
		if (!Forces.instance) Forces.instance = new Forces()
		return Forces.instance
	}

	Alliance: Force
	AlliancePlayers: Force
	AllianceAll: Force
	Federation: Force
	FederationPlayers: Force
	FederationAll: Force
	Computers: Force
	Humans: Force

	constructor () {
		this.Alliance = new Force()
		this.Alliance.addPlayers([18, 19, 20])

		this.Federation = new Force()
		this.Federation.addPlayers([21, 22, 23])

		this.Computers = new Force()
		this.Computers.addPlayers([18, 19, 20, 21, 22, 23])

		this.AlliancePlayers = new Force()
		this.AlliancePlayers.addPlayers([0, 1, 2, 3, 4, 5])

		this.FederationPlayers = new Force()
		this.FederationPlayers.addPlayers([6, 7, 8, 9, 10, 11])

		this.Humans = new Force()
		for (let i = 0; i < 11; i++) {
			const player = Players[i]

			if (player.slotState === PLAYER_SLOT_STATE_PLAYING) {
				this.Humans.addPlayer(Players[i])
			}
		}

		this.AllianceAll = new Force()
		this.AllianceAll.addPlayers([0, 1, 2, 3, 4, 5, 18, 19, 20])

		this.FederationAll = new Force()
		this.FederationAll.addPlayers([6, 7, 8, 9, 10, 11, 21, 22, 23])
	};
}
