import { Force, Unit } from 'lib/w3ts/index'
import { Hero } from '../../classes/hero/hero'
import { IHeroesDepend } from './IHeroesDepend'
import { Logger } from 'app/log'
import { UnitType } from 'app/classes'
import { Coordinate } from 'app/classes/Coordinate'
import { IUnitParam } from 'app/classes/hero/interfaces/IUnitParam'

export class Heroes {
	protected static instance: Heroes

	static getInstance (depend: IHeroesDepend) {
		if (!Heroes.instance) Heroes.instance = new Heroes(depend)
		return Heroes.instance
	}

	constructor (depend: IHeroesDepend) {
		const triggers = depend.triggers
		const rects = depend.rects
		const forces = depend.forces

		Hero.PickedPlayers = new Force()

		// When a Hero Levels up
		triggers.heroLevels.addAction(() => {
			const hero = Hero.fromEvent()

			const player = hero.owner

			Logger.Information('Hero Leveled Up:', hero.name)

			// Every Level increase Attack
			player.setTechResearched(FourCC('R005'), hero.level - 1)

			// Every other level increase Armor
			if (hero.heroLevel % 3 === 0) {
				player.setTechResearched(FourCC('R006'), hero.level - 1)
			}

			// Add Ability Points
			hero.owner.lumber += 2
		})

		// When a new hero is created add it to the index
		triggers.unitCreated.addAction(() => {
			if (Unit.fromEvent().isHero) {
				const unit = Unit.fromEvent()

				// If Hero's Hero Type hasn't been defined yet (First time being created)
				// eslint-disable-next-line camelcase
				if (unit.handle === udg_unit_PickedHero) {
					try {
						const coor = unit.owner.inForce(forces.AlliancePlayers)
							? rects.Left_Castle.centerPosition
							: rects.Right_Castle.centerPosition

						const hero = unit.unitParams ? new Hero(depend, unit.unitParams) : undefined
						if (!hero) error("Hero Coulding be created from the Unit")

						unit.destroy()

						Hero.PickedPlayers.addPlayer(hero.owner)

						Logger.Information('Name', hero.name)
						hero.coordinate = coor
						hero.show = false
					} catch (error) {
						Logger.Error('Error', error)
					}
				}
			}
		})
	};
}
