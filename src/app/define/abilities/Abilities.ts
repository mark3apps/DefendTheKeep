/** @format */

import { ChainLightningTower } from "app/abilities/ChainLightningTower"
import { ConeOfFireTower } from "app/abilities/ConeOfFireTower"
import { FelGrunt, FelOgre, FelWarlock, FelWarlord } from "app/abilities/Fel"
import { ManaShardsTower } from "app/abilities/ManaShardsTower"
import { ManaShieldTower } from "app/abilities/ManaShieldTower"
import { ManaTowerRestore } from "app/abilities/ManaTowerRestore"
import { FootmanUpgrade } from "app/abilities/footmanUpgrade"
import { AspectOfDeathInfect } from "app/abilities/AspectOfDeathInfect"
import { Ability } from "app/classes/ability/Ability"
import { IAbilitiesDepend } from "./interfaces/IAbilitiesDepend"
import { BonusArmor } from "app/abilities/bonus/bonusArmor"
import { BonusAttackSpeed } from "app/abilities/bonus/bonusAttackSpeed"
import { BonusDamage } from "app/abilities/bonus/bonusDamage"
import { BonusMoveSpeed } from "app/abilities/bonus/bonusMoveSpeed"
import { BonusStats } from "app/abilities/bonus/bonusStats"
import { UnitAbility } from "app/classes"
import { SkillTree } from "app/abilities/tree/skillTree"
import { BonusLifeRegeneration } from "app/abilities/bonus/bonusLifeRegeneration"

export class Abilities {
	// Static
	protected static instance?: Abilities

	static getInstance(depend: IAbilitiesDepend) {
		if (!Abilities.instance) Abilities.instance = new Abilities(depend)
		return Abilities.instance
	}

	// Instance
	bonusCollection
	bonusDamage
	bonusArmor
	bonusStats
	bonusAttackSpeed
	bonusMoveSpeed
	bonusLifeRegeneration

	treeSkill

	private constructor(depend: IAbilitiesDepend) {
		// Dependencies
		const abilTypes = depend.abilityTypes
		const abilCast = depend.abilityCast

		// Footman Upgrade
		new Ability(depend, {
			abilType: abilTypes.FootmanUpgrade,
			TriggerUnit: abilCast.CastingUnit,
			unitAbility: (unitAbil) => {
				return FootmanUpgrade.fromHandle(unitAbil)
			},
		})
		// Fel Grunt
		new Ability(depend, {
			abilType: abilTypes.FelGrunt,
			TriggerUnit: abilCast.KillingUnit,
			unitAbility: (unitAbil) => {
				return FelGrunt.fromHandle(unitAbil)
			},
		})
		// Fel Ogre
		new Ability(depend, {
			abilType: abilTypes.FelOgre,
			TriggerUnit: abilCast.KillingUnit,
			unitAbility: (unitAbil) => {
				return FelOgre.fromHandle(unitAbil)
			},
		})
		// Fel Warlord
		new Ability(depend, {
			abilType: abilTypes.FelWarlord,
			TriggerUnit: abilCast.KillingUnit,
			unitAbility: (unitAbil) => {
				return FelWarlord.fromHandle(unitAbil)
			},
		})
		// Fel Warlock
		new Ability(depend, {
			abilType: abilTypes.FelWarlock,
			TriggerUnit: abilCast.KillingUnit,
			unitAbility: (unitAbil) => {
				return FelWarlock.fromHandle(unitAbil)
			},
		})
		// Mana Tower Restore
		new Ability(depend, {
			abilType: abilTypes.ManaTowerRestore,
			TriggerUnit: abilCast.AttackingUnit,
			unitAbility: (unitAbil) => {
				return ManaTowerRestore.fromHandle(unitAbil)
			},
		})

		// Mana Shield Tower
		new Ability(depend, {
			abilType: abilTypes.ManaShieldTower,
			TriggerUnit: abilCast.AttackingUnit,
			unitAbility: (unitAbil) => {
				return ManaShieldTower.fromHandle(unitAbil)
			},
		})
		// Mana Shards Tower
		new Ability(depend, {
			abilType: abilTypes.ManaShardsTower,
			TriggerUnit: abilCast.AttackingUnit,
			unitAbility: (unitAbil) => {
				return ManaShardsTower.fromHandle(unitAbil)
			},
		})
		// Chain Lightning Tower
		new Ability(depend, {
			abilType: abilTypes.chainLightningTower,
			TriggerUnit: abilCast.AttackingUnit,
			unitAbility: (unitAbil) => {
				return ChainLightningTower.fromHandle(unitAbil)
			},
		})
		// Cone of Fire
		new Ability(depend, {
			abilType: abilTypes.coneOfFireTower,
			TriggerUnit: abilCast.AttackingUnit,
			unitAbility: (unitAbil) => {
				return ConeOfFireTower.fromHandle(unitAbil)
			},
		})
		// Aspect of Death Infect
		new Ability(depend, {
			abilType: abilTypes.aspectOfDeathInfect,
			TriggerUnit: abilCast.AttackingUnit,
			unitAbility: (unitAbil) => {
				return AspectOfDeathInfect.fromHandle(unitAbil)
			},
		})

		//
		// Bonus Abilities
		//

		this.bonusCollection = new Ability(depend, {
			abilType: abilTypes.bonusCollection,
			TriggerUnit: abilCast.CastingUnit,
			unitAbility: (unitAbil) => {
				return UnitAbility.fromHandle(unitAbil)
			},
		})
		this.bonusDamage = new Ability(depend, {
			abilType: abilTypes.bonusDamage,
			TriggerUnit: abilCast.CastingUnit,
			unitAbility: (unitAbil) => {
				return BonusDamage.fromHandle(unitAbil)
			},
		})
		this.bonusArmor = new Ability(depend, {
			abilType: abilTypes.bonusArmor,
			TriggerUnit: abilCast.CastingUnit,
			unitAbility: (unitAbil) => {
				return BonusArmor.fromHandle(unitAbil)
			},
		})
		this.bonusStats = new Ability(depend, {
			abilType: abilTypes.bonusStats,
			TriggerUnit: abilCast.CastingUnit,
			unitAbility: (unitAbil) => {
				return BonusStats.fromHandle(unitAbil)
			},
		})
		this.bonusAttackSpeed = new Ability(depend, {
			abilType: abilTypes.bonusAttackSpeed,
			TriggerUnit: abilCast.CastingUnit,
			unitAbility: (unitAbil) => {
				return BonusAttackSpeed.fromHandle(unitAbil)
			},
		})
		this.bonusMoveSpeed = new Ability(depend, {
			abilType: abilTypes.bonusMoveSpeed,
			TriggerUnit: abilCast.CastingUnit,
			unitAbility: (unitAbil) => {
				return BonusMoveSpeed.fromHandle(unitAbil)
			},
		})
		this.bonusLifeRegeneration = new Ability(depend, {
			abilType: abilTypes.bonusLifeRegeneration,
			TriggerUnit: abilCast.CastingUnit,
			unitAbility: (unitAbil) => {
				return BonusLifeRegeneration.fromHandle(unitAbil)
			},
		})

		//
		// Trees
		//

		this.treeSkill = new Ability(depend, {
			abilType: abilTypes.treeSkill,
			TriggerUnit: abilCast.CastingUnit,
			unitAbility: (unitAbil) => {
				return SkillTree.fromHandle(unitAbil)
			},
		})
	}
}
