
import { Force, MapPlayer, Unit } from 'lib/w3ts/index'

export class Army {
	public force!: Force
	public name!: string
	public captial!: Unit
	public _enemy?: Army

	public get enemy (): Army | undefined {
		return this._enemy
	}

	public set enemy (army: Army | undefined) {
		this._enemy = army
	}

	public isCapitalAlive (): boolean {
		return this.captial.isAlive()
	}

	public get enemyForce (): Force | undefined {
		return this._enemy ? this._enemy.force : undefined
	}

	public get randomPlayer (): MapPlayer {
		return this.force.getPlayers()[Math.floor(Math.random() * this.force.getPlayers().length)]
	}
}
