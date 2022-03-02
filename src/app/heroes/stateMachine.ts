import { Hero } from 'app/classes/hero/hero'

export interface IState {
	name: string
	onEnter?: () => void
	onUpdate?: () => void
	onExit?: () => void
}

let idCount = 0

export class StateMachine {
	private id = (++idCount).toString()
	private hero?: Hero
	private changeStateQueue: string[] = []

	private states = new Map<string, IState>()
	private currentState: IState = { name: 'init', onEnter: () => { }, onUpdate: () => { }, onExit: () => { } }

	private isChangingState = false

	constructor (hero?: Hero, id?: string) {
		this.id = id ?? this.id
		this.hero = hero
	}

	addState (state: IState): StateMachine {
		const context = this.hero
		const name = state.name

		this.states.set(name, {
			name,
			onEnter: state.onEnter?.bind(context),
			onUpdate: state.onUpdate?.bind(context),
			onExit: state.onExit?.bind(context)
		})

		return this
	}

	setState (name: string | undefined): void {
		if (name) {
			if (!this.states.has(name)) {
				// Log.Warning(`Tried to change to unknown state: ${name}`)
				return
			}

			if (this.isCurrentState(name)) {
				return
			}

			if (this.isChangingState) {
				this.changeStateQueue.push(name)
				return
			}

			this.isChangingState = true

			// Log.Information(`[StateMachine (${this.id})] change from ${this.currentState.name} to ${name}`)

			if (this.currentState && this.currentState.onExit) {
				this.currentState.onExit()
			}

			this.currentState = this.states.get(name) ?? this.currentState

			if (this.currentState.onEnter) {
				this.currentState.onEnter()
			}

			this.isChangingState = false
		}
	}

	isCurrentState (name: string): boolean {
		if (!this.currentState) {
			return false
		}

		return this.currentState.name === name
	}

	update (): void {
		if (this.changeStateQueue.length > 0) {
			this.setState(this.changeStateQueue.shift())
			return
		}

		if (this.currentState && this.currentState.onUpdate) {
			this.currentState.onUpdate()
		}
	}
}
