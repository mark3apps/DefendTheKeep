/** @format */

import { Hero } from "app/classes"
import { ShiftMasterSkillTree } from "app/define/hero/shiftmaster/shiftMasterSkillTree"
import { Strategy } from "lib/resources/strategy"
import { HeroType } from "app/classes/heroType/heroType"
import { AbilityFour, Unit } from "lib/w3ts/index"
import { IHeroTypeDepend } from "app/classes/heroAbility/interfaces/IHeroTypeDepend"
import { FelForm } from "./abilities/felForm"

export class ShiftMasterHeroType extends HeroType {
  protected static instance?: ShiftMasterHeroType

  static getInstance(depend: IHeroTypeDepend) {
    if (!ShiftMasterHeroType.instance) ShiftMasterHeroType.instance = new ShiftMasterHeroType(depend)
    return ShiftMasterHeroType.instance
  }

  private constructor(depend: IHeroTypeDepend) {
    super({ four: "E002", name: "Shift Master", order: false })

    // Dependencies
    const heroAbils = depend.heroAbils
    const heroAttr = depend.heroAttr

    this.talentTrees = (u: Hero) => {
      const skill = new ShiftMasterSkillTree(u)
      const guard = new ShiftMasterSkillTree(u)
      const armor = new ShiftMasterSkillTree(u)

      u.skillTree.SetTree(skill)
      u.guardTree.SetTree(guard)
      u.armorTree.SetTree(armor)
    }

    // const G = Globals.get()

    // Attributes
    this.addHeroAttribute(heroAttr.agility)
    this.addHeroAttribute(heroAttr.melee)
    this.addHeroAttribute(heroAttr.assassin)

    // Items

    // AI Setup
    this.lifeFactor = 1
    this.manaFactor = 0.02
    this.lifeHighPercent = 65
    this.lifeLowPercent = 20
    this.lifeLowNumber = 400
    this.highDamageSingle = 17
    this.highDamageAverage = 25
    this.powerBase = 500
    this.powerLevel = 200
    this.unitClumpCheck = true
    this.unitClumpRange = 100
    this.intelRange = 1100
    this.intelCloseRange = 500

    this.traitAggressive = 60
    this.traitDefensive = 30
    this.traitSupport = 20
    this.traitAssassinate = 80

    this.addStrategy(Strategy.Agressive)
    this.addStrategy(Strategy.Neutral)
    this.addStrategy(Strategy.Defensive)

    // //
    // // Add Abilities
    // //

    this.addHeroAbility(heroAbils.shift)
    this.addHeroAbility(heroAbils.felForm)
    this.addHeroAbility(heroAbils.switch)
    this.addHeroAbility(heroAbils.fallingStrike)
    this.addHeroAbility(heroAbils.shadeStorm)
  }

  override onDeath = (u: Unit) => {
    if (u.custom.has("felForm")) {
      const ability = u.getUnitAbilityUnknown(AbilityFour.FelForm) as FelForm
      ability.endFelForm()
    }
  }
}
