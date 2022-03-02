/** @format */

import { EffectType } from "app/classes/abilityType/enums/EffectType"
import { TargetType } from "app/classes/abilityType/enums/TargetType"
import { AbilityFour, Order, BuffFour } from "lib/w3ts"
import { AbilityType } from "../../classes"

export class AbilityTypes {
  private static instance?: AbilityTypes

  static getInstance() {
    if (!AbilityTypes.instance) AbilityTypes.instance = new AbilityTypes()
    return AbilityTypes.instance
  }

  static getInstanceNoCreate() {
    return AbilityTypes.getInstance()
  }

  AspectInferno
  ShiftDummy
  FallingStrikeDummy
  ShadeStormDummy
  StormCrowForm
  FootmanUpgrade
  FelGrunt
  FelOgre
  FelWarlord
  FelWarlock
  ManaTowerRestore
  ManaShieldTower
  ManaShardsTower
  chainLightningTower
  coneOfFireTower
  aspectOfDeathInfect

  bonusCollection
  bonusStats
  bonusDamage
  bonusArmor
  bonusAttackSpeed
  bonusMoveSpeed
  bonusLifeRegeneration

  treeSkill

  shift
  switch
  felForm
  fallingStrike
  shadeStorm

  private constructor() {
    //
    // Non Triggered Abilities
    //

    this.AspectInferno = new AbilityType({
      four: AbilityFour.InfernoAspect,
      orderId: Order.DreadlordInferno,
    })
    this.ShiftDummy = new AbilityType({
      four: AbilityFour.ItemIllusions,
      orderId: Order.Illusion,
    })
    this.FallingStrikeDummy = new AbilityType({
      four: AbilityFour.FallingStrikeDummy,
      orderId: Order.CreepThunderclap,
    })
    this.ShadeStormDummy = new AbilityType({
      four: "A03O",
      orderId: Order.Whirlwind,
    })
    this.StormCrowForm = new AbilityType({
      four: AbilityFour.StormCrowForm,
      orderId: Order.Ravenform,
    })

    //
    // Triggered Unit Abilities
    //

    // Footman Upgrade
    this.FootmanUpgrade = new AbilityType({
      four: AbilityFour.FootmanCharge,
      effectType: EffectType.Casts,
      targetType: TargetType.SupportSelf,
      orderId: Order.BearForm,
    })

    // Fel Grunt
    this.FelGrunt = new AbilityType({
      four: AbilityFour.FelGrunt,
      effectType: EffectType.Kills,
    })

    // Fel Ogre
    this.FelOgre = new AbilityType({
      four: AbilityFour.FelOgre,
      effectType: EffectType.Kills,
    })

    // Fel Warlord
    this.FelWarlord = new AbilityType({
      four: AbilityFour.FelWarlord,
      effectType: EffectType.Kills,
    })

    // Fel Warlock
    this.FelWarlock = new AbilityType({
      four: AbilityFour.FelWarlock,
      effectType: EffectType.Kills,
    })

    // Mana Repository
    this.ManaTowerRestore = new AbilityType({
      four: AbilityFour.ManaTowerRestore,
      effectType: EffectType.Attacks,
      targetType: TargetType.SupportSingle,
      orderId: Order.Recharge,
    })

    this.ManaShieldTower = new AbilityType({
      four: AbilityFour.ManaShieldTower,
      orderId: Order.ManaShieldOn,
      buffFour: BuffFour.ManaShield,
      effectType: EffectType.Attacks,
      targetType: TargetType.SupportSelf,
    })

    this.ManaShardsTower = new AbilityType({
      four: AbilityFour.ManaShardsTower,
      orderId: Order.ClusterRockets,
      effectType: EffectType.Attacks,
      targetType: TargetType.DamageArea,
    })

    this.chainLightningTower = new AbilityType({
      four: AbilityFour.ChainLightningTower,
      orderId: Order.ChainLightning,
      effectType: EffectType.Attacks,
      targetType: TargetType.DamageSingle,
    })

    this.coneOfFireTower = new AbilityType({
      four: AbilityFour.ConeOfFireTower,
      orderId: Order.BreathOfFrost,
      effectType: EffectType.Attacks,
      targetType: TargetType.DamageAreaTarget,
    })

    this.aspectOfDeathInfect = new AbilityType({
      four: AbilityFour.InfectAspect,
      orderId: Order.Parasite,
      buffFour: BuffFour.Infected,
      effectType: EffectType.Attacks,
      targetType: TargetType.CrippleAround,
    })

    //
    // Bonus Abilities
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    this.bonusCollection = new AbilityType({
      four: AbilityFour.BonusSpellBook,
    })
    this.bonusStats = new AbilityType({ four: AbilityFour.BonusStats })
    this.bonusDamage = new AbilityType({ four: AbilityFour.BonusDamage })
    this.bonusArmor = new AbilityType({ four: AbilityFour.BonusArmor })
    this.bonusAttackSpeed = new AbilityType({
      four: AbilityFour.BonusAttackSpeed,
    })
    this.bonusMoveSpeed = new AbilityType({
      four: AbilityFour.BonusMovementSpeed,
    })
    this.bonusLifeRegeneration = new AbilityType({
      four: AbilityFour.BonusLifeRegeneration,
    })

    //
    // Tree Abilities
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    this.treeSkill = new AbilityType({
      four: "A024",
      effectType: EffectType.Casts,
    })

    //
    // Hero Ability Types
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    //
    // Shift Master
    //

    this.shift = new AbilityType({
      four: AbilityFour.Shift,
      orderId: Order.Berserk,
      effectType: EffectType.Casts,
      targetType: TargetType.SupportSelf,
    })

    this.switch = new AbilityType({
      four: AbilityFour.MirrorSwitch,
      orderId: Order.Reveal,
      effectType: EffectType.Casts,
      targetType: TargetType.Specific,
    })

    this.felForm = new AbilityType({
      four: AbilityFour.FelForm,
      orderId: Order.Metamorphosis,
      effectType: EffectType.Casts,
      targetType: TargetType.SupportSelf,
    })

    this.fallingStrike = new AbilityType({
      four: AbilityFour.FallingStrike,
      orderId: Order.Thunderbolt,
      effectType: EffectType.Casts,
      targetType: TargetType.DamageAreaTarget,
    })

    this.shadeStorm = new AbilityType({
      four: AbilityFour.ShadeStorm,
      orderId: Order.Channel,
      effectType: EffectType.Casts,
      targetType: TargetType.Specific,
    })
  }
}
