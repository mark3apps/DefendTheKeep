/** @format */

import { BonusArmor } from "app/abilities/bonus/bonusArmor"
import { BonusAttackSpeed } from "app/abilities/bonus/bonusAttackSpeed"
import { BonusDamage } from "app/abilities/bonus/bonusDamage"
import { BonusLifeRegeneration } from "app/abilities/bonus/bonusLifeRegeneration"
import { BonusMoveSpeed } from "app/abilities/bonus/bonusMoveSpeed"
import { BonusStats } from "app/abilities/bonus/bonusStats"
import { SkillTree } from "app/abilities/tree/skillTree"
import { HeroType } from "app/classes/heroType/heroType"
import { StateMachine, IState } from "app/heroes/stateMachine"
import { Logger } from "app/log"
import { TalentConfig } from "app/systems/talents/talentConfig"
import { GoldTalentViewModel } from "app/systems/talents/viewModels/GoldTalentViewModel"
import { SkillTalentViewModel } from "app/systems/talents/viewModels/SkillTalentViewModel"
import { GenerateNoButtonTalentTreeView } from "app/systems/talents/views/NoButtonTalentTreeView"
import { GenerateNoButtonTalentView } from "app/systems/talents/views/NoButtonTalentView"
import { BasicTalentTreeViewModel } from "lib/STK/UI/STK/ViewModels/BasicTalentTreeViewModel"
import { Timer, Unit, Group, Force, Frame, Order } from "lib/w3ts"
import { UnitAbility } from ".."
import { IHeroDepend } from "./interfaces/IHeroDepend"
import { IHeroParam } from "./interfaces/IHeroParam"

export class Hero extends Unit {
	static readonly all: Hero[] = []
	static human: Hero[] = []
	static ai: Hero[] = []
	static PickedPlayers: Force

	public static fromHandle(handle: unit): Hero {
		return this.getObject(handle)
	}

	public static fromEvent() {
		return this.fromHandle(GetTriggerUnit())
	}

	// Dependencies

	private stateMachine: StateMachine | undefined

	private AITickTimer = new Timer()
	private AITickIncrement = 1.2
	private AIActivated = false

	readonly heroType: HeroType
	public skillTree: BasicTalentTreeViewModel
	public guardTree: BasicTalentTreeViewModel
	public armorTree: BasicTalentTreeViewModel

	AIpowerBase = 0
	AIpowerHero = 0

	AIunitCount = 0
	AIunitCountAlly = 0
	AIUnitCountEnemy = 0

	AImostPowerfulAlly = 0
	AImostPowerfulAllyUnit: Unit | undefined
	AImostPowerfulEnemy = 0
	AImostPowerfulEnemyUnit: Unit | undefined

	AIclumpAllyUnit: Unit | undefined
	AIclumpAllyCount = 0
	AIclumpAllyPower = 0
	AIclumpEnemyUnit: Unit | undefined
	AIclumpEnemyCount = 0
	AIclumpEnemyPower = 0
	AIclumpAllUnit: Unit | undefined
	AIclumpAllCount = 0
	AIclumpAllPower = 0

	AIheroesAlly = new Group()
	AIheroesEnemy = new Group()

	AIhealthHistory: number[] = []
	AIhealthHistoryAverageSingle = 0
	AIhealthHistoryAverageAll = 0

	AIweightedHealth = 0
	AIweightedHealthMax = 0
	AIweightedHealthPercent = 0

	private damageAbility
	private armorAbility
	private statsAbility
	private attackSpeedAbility
	private moveSpeedAbility
	private lifeRegenerationAbility
	private skillTreeAbility

	constructor(depend: IHeroDepend, hero: IHeroParam) {
		super(hero)

		// Dependencies
		const abils = depend.abils

		// Get Hero Type
		this.heroType = HeroType.get(this.typeId) as HeroType

		// Add Hidden Collection for the extra Abilities
		const collection = abils.bonusCollection.getUnitAbility(this)
		collection.hide()
		collection.permanent = true

		// Add the Bonus Abilities to the Hero
		this.damageAbility = abils.bonusDamage.getUnitAbilityUnknown(this) as BonusDamage
		this.armorAbility = abils.bonusArmor.getUnitAbilityUnknown(this) as BonusArmor
		this.moveSpeedAbility = abils.bonusMoveSpeed.getUnitAbilityUnknown(this) as BonusMoveSpeed
		this.attackSpeedAbility = abils.bonusAttackSpeed.getUnitAbilityUnknown(
			this
		) as BonusAttackSpeed
		this.statsAbility = abils.bonusStats.getUnitAbilityUnknown(this) as BonusStats
		this.lifeRegenerationAbility = abils.bonusLifeRegeneration.getUnitAbilityUnknown(
			this
		) as BonusLifeRegeneration

		// Set the Bonus Abilities to Permanent
		this.damageAbility.permanent = true
		this.armorAbility.permanent = true
		this.moveSpeedAbility.permanent = true
		this.attackSpeedAbility.permanent = true
		this.statsAbility.permanent = true
		this.lifeRegenerationAbility.permanent = true

		// Add Tree Abilities
		this.skillTreeAbility = abils.treeSkill.getUnitAbility(this) as SkillTree
		this.skillTreeAbility.permanent = true

		// Add Starting Abilities
		for (let i = 0; i < this.heroType.heroAbilities.length; i++) {
			const heroAbility = this.heroType.heroAbilities[i]
			const ability = heroAbility.getUnitAbility(this)
			ability.permanent = true
			if (!heroAbility.starting) ability.disable()
			if (heroAbility.hidden) ability.hide()
		}

		// Add Starting Items
		if (this.heroType !== undefined) {
			// Add Attribute Items
			for (let n = 0; n < this.heroType.heroAttributes.length; n++) {
				const element = this.heroType.heroAttributes[n]

				for (let i = 0; i < element.items.length; i++) {
					const item = element.items[i].id
					this.addItemById(item)
				}
			}

			// Add Specific Hero Type Items
			for (let i = 0; i < this.heroType.items.length; i++) {
				const item = this.heroType.items[i].id
				this.addItemById(item)
			}
		}

		// Define Skill Trees
		const config = new TalentConfig()
		const treeUi = GenerateNoButtonTalentTreeView(
			config.talentTreeView,
			Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0)
		)

		this.skillTree = new BasicTalentTreeViewModel(
			config.talentTreeViewModel,
			this.owner,
			treeUi,
			(i) =>
				new SkillTalentViewModel(
					config.talentViewModel,
					GenerateNoButtonTalentView(
						config.talentView,
						treeUi.talentTreeContainer,
						i.toString()
					)
				)
		)

		this.guardTree = new BasicTalentTreeViewModel(
			config.talentTreeViewModel,
			this.owner,
			treeUi,
			(i) =>
				new GoldTalentViewModel(
					config.talentViewModel,
					GenerateNoButtonTalentView(
						config.talentView,
						treeUi.talentTreeContainer,
						i.toString()
					)
				)
		)

		this.armorTree = new BasicTalentTreeViewModel(
			config.talentTreeViewModel,
			this.owner,
			treeUi,
			(i) =>
				new GoldTalentViewModel(
					config.talentViewModel,
					GenerateNoButtonTalentView(
						config.talentView,
						treeUi.talentTreeContainer,
						i.toString()
					)
				)
		)

		this.heroType.talentTrees(this)

		// Add to Hero Array
		Hero.all.push(this)

		if (this.owner.controller === MAP_CONTROL_COMPUTER) {
			Hero.ai.push(this)
		} else {
			Hero.human.push(this)
		}
	}

	updateAbilityTooltips = () => {
		for (let i = 0; i < this.abilityFours.length; i++) {
			const abilityType = this.unitAbilities.get(this.abilityFours[i])
			if (abilityType) {
				;(abilityType as UnitAbility).updateTooltips()
			}
		}
	}

	// AI Methods
	public AIstart(tick = this.AITickIncrement) {
		Logger.Information("Starting AI for", this.nameProper)

		this.stateMachine = new StateMachine(this)
		this.AITickIncrement = tick

		// Add all of the Hero Type Specified States
		this.stateMachine.addState(this.STATEattack())
		this.stateMachine.addState(this.STATEheal())
		this.stateMachine.addState(this.STATEcast())
		this.stateMachine.addState(this.STATEdead())
		this.stateMachine.addState(this.STATEflee())

		// Set the starting State
		this.stateMachine.setState("attack")

		// Start the AI Loop Timer
		this.AITickTimer.start(tick, true, () => this.AIexecute())
	}

	public AIpause() {
		this.AITickTimer.pause()
	}

	public AIexecute() {
		if (this.stateMachine) {
			this.AIintel()
			this.stateMachine.update()
		}
		// Nothing at the moment
	}

	public AIintel() {
		//
	}

	public AIlevelup() {
		//
	}

	private STATEdead(): IState {
		return {
			name: "dead",
			onEnter: () => {
				//
			},
			onUpdate: () => {
				//
			},
			onExit: () => {
				//
			},
		}
	}

	private STATEcast(): IState {
		return {
			name: "cast",
			onEnter: () => {
				//
			},
			onUpdate: () => {
				//
			},
			onExit: () => {
				//
			},
		}
	}

	private STATEheal(): IState {
		return {
			name: "heal",
			onEnter: () => {
				// Log.Information("Heal")
			},
			onUpdate: () => {
				// Log.Information("Healing")
			},
			onExit: () => {
				//
			},
		}
	}

	private STATEattack(): IState {
		return {
			name: "attack",
			onEnter: () => {
				// Log.Information("Attack", this.nameProper)
				this.issueOrderAt(Order.Attack, 0, 0)
			},
			onUpdate: () => {
				// Log.Information("Attacking")
			},
			onExit: () => {
				// Log.Information("End Attack")
			},
		}
	}

	private STATEflee(): IState {
		return {
			name: "flee",
			onEnter: () => {
				//
			},
			onUpdate: () => {
				//
			},
			onExit: () => {
				//
			},
		}
	}

	// General Methods

	get lifeRegenerationBonus() {
		return this.lifeRegenerationAbility.lifeRegeneration
	}

	set lifeRegenerationBonus(value) {
		this.lifeRegenerationAbility.lifeRegeneration = value
	}

	get damageBonus() {
		return this.damageAbility.damage
	}

	set damageBonus(value) {
		this.damageAbility.damage = value
	}

	get armorBonus() {
		return this.armorAbility.armor
	}

	set armorBonus(value) {
		this.armorAbility.armor = value
	}

	get movementSpeedBonus() {
		return this.moveSpeedAbility.movementSpeed
	}

	set movementSpeedBonus(value) {
		this.moveSpeedAbility.movementSpeed = value
	}

	get attackSpeedBonus() {
		return this.attackSpeedAbility.attackSpeed
	}

	set attackSpeedBonus(value) {
		this.attackSpeedAbility.attackSpeed = value
	}

	get strengthBonus() {
		return this.statsAbility.strength
	}

	set strengthBonus(value) {
		this.statsAbility.strength = value
	}

	get agilityBonus() {
		return this.statsAbility.agility
	}

	set agilityBonus(value) {
		this.statsAbility.agility = value
	}

	get intelligenceBonus() {
		return this.statsAbility.intelligence
	}

	set intelligenceBonus(value) {
		this.statsAbility.intelligence = value
	}
}
