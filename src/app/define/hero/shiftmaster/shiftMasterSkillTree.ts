/** @format */

import { IShiftAttributes, Shadestorm, Shift } from "app/define/hero/shiftmaster/abilities"
import { subtractObjects, toPercent } from "lib/resources/library"
import { ITalentTreeBuilder } from "lib/STK/UI/STK/Interfaces/ITalentTreeBuilder"
import { ActivationEvent } from "lib/STK/UI/STK/Models/Talent"
import { TalentTree } from "lib/STK/UI/STK/Models/TalentTree"
import { AbilityFour, Icon } from "lib/w3ts"
import { FelForm, IFelFormAttributes } from "./abilities/felForm"

export class ShiftMasterSkillTree extends TalentTree {
  get talentPoints(): number {
    return this.ownerPlayer.lumber
  }

  set talentPoints(value: number) {
    this.ownerPlayer.lumber = value
  }

  public Initialize(builder: ITalentTreeBuilder): void {
    builder.SetColumnsRows(4, 8)
    builder.title = "Shift Master Skill Tree"

    // The tree should be built with talents here
    // ==============================================

    //
    // Shift <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    //

    // Improved Shift
    builder.AddMultirankTalent(0, 7, 3, (lvl) => {
      const stats: IShiftAttributes[] = [
        { distance: 0, shadeDamageTaken: 0, shadeDamageDealt: 0, duration: 0, cooldown: 0, title: "Improved" },
        { distance: 25, shadeDamageTaken: -0.05, shadeDamageDealt: 0.05, duration: 0, cooldown: 0 },
        { distance: 50, shadeDamageTaken: -0.1, shadeDamageDealt: 0.1, duration: 0, cooldown: 0 },
        { distance: 75, shadeDamageTaken: -0.15, shadeDamageDealt: 0.15, duration: 0, cooldown: 0 },
      ]
      return {
        Name: "Improved Shift",
        Icon: Icon.MirrorImage,
        Description: `Increases Shifts effectiveness.|n+${stats[lvl].distance} Distance Travelled|n${stats[lvl].shadeDamageTaken} Shade Damage Taken|n${stats[lvl].shadeDamageDealt} Shade Damage Dealt`,
        Tag: subtractObjects<IShiftAttributes>(stats[lvl], stats[lvl - 1]),
        Cost: 2,
        OnAllocate: (e) => this.ImproveShift(e),
      }
    })

    // Mastered Shift
    const shiftStats: IShiftAttributes = {
      cooldown: -1,
      distance: 50,
      duration: 3,
      shadeDamageTaken: -0.1,
      shadeDamageDealt: 0.1,
      title: "Mastered",
    }

    builder.AddTalent(0, 6, {
      Name: "Mastered Shift",
      Icon: Icon.MirrorImage,
      Tag: shiftStats,
      Description: `Increases Shifts effectiveness.
+${math.floor(shiftStats.distance ?? 0)} Distance Travelled
${toPercent(shiftStats.shadeDamageTaken ?? 0)}% Shade Damage Taken
+${toPercent(shiftStats.shadeDamageDealt ?? 0)}% Shade Damage Dealt
+${math.floor(shiftStats.duration ?? 0)}Shade Duration
${shiftStats.cooldown} second Cooldown`,
      Cost: 2,
      OnAllocate: (e) => this.ImproveShift(e),
      Dependency: { up: 3 },
    })

    // Shift Speed
    builder.AddMultirankTalent(1, 7, 4, (lvl) => {
      const stats: IShiftAttributes[] = [{ distance: 0 }, { distance: 50 }, { distance: 100 }, { distance: 150 }, { distance: 200 }]
      return {
        Name: "Shift Speed",
        Description: `Increases the distance travelled by ${toPercent(stats[lvl].distance ?? 0)}.`,
        Tag: subtractObjects<IShiftAttributes>(stats[lvl], stats[lvl - 1]),
        Icon: Icon.Berserk,
        OnAllocate: (e) => this.ImproveShift(e),
        Dependency: { left: 1 },
      }
    })

    // Shade Strength
    builder.AddMultirankTalent(2, 7, 4, (lvl) => {
      const stats: IShiftAttributes[] = [
        { shadeDamageDealt: 0 },
        { shadeDamageDealt: 0.05 },
        { shadeDamageDealt: 0.1 },
        { shadeDamageDealt: 0.15 },
        { shadeDamageDealt: 0.25 },
      ]
      return {
        Name: "Shade Strength",
        Description: `Increases the damage shades deal by ${toPercent(stats[lvl].shadeDamageDealt ?? 0)}%.`,
        Tag: subtractObjects<IShiftAttributes>(stats[lvl], stats[lvl - 1]),
        Icon: Icon.ArcaniteMelee,
        OnAllocate: (e) => this.ImproveShift(e),
        Dependency: { left: 1 },
      }
    })

    // Shade Health
    builder.AddMultirankTalent(1, 6, 5, (lvl) => {
      const stats: IShiftAttributes[] = [
        { shadeDamageTaken: 0 },
        { shadeDamageTaken: -0.08 },
        { shadeDamageTaken: -0.16 },
        { shadeDamageTaken: -0.24 },
        { shadeDamageTaken: -0.32 },
        { shadeDamageTaken: -0.4 },
      ]
      return {
        Name: "Shade Health",
        Description: `Decreases the damage shades take by ${toPercent(math.abs(stats[lvl].shadeDamageTaken ?? 0))}%.`,
        Icon: Icon.ArcaniteArmor,
        OnAllocate: (e) => this.ImproveShift(e),
        Tag: subtractObjects<IShiftAttributes>(stats[lvl], stats[lvl - 1]),
        Dependency: { left: 1 },
      }
    })

    //
    // Fel Form  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    //

    // Learn
    builder.AddTalent(3, 7, {
      Name: "Learn Fel Form",
      Description: "",
      Icon: Icon.ChaosGrom,
      OnAllocate: (e) => this.FelFormLearn(e),
      // Requirements: (e) => {
      // 	return [e.unit.handle.heroLevel >= 8, "Level 8 Required"]
      // }
    })

    // Improved Fel Form
    builder.AddMultirankTalent(3, 6, 4, (lvl) => {
      const stats: IFelFormAttributes[] = [
        { hitPointBonus: 0, damage: 0, lifeRegeneration: 0, armor: 0, attackSpeed: 0, moveSpeed: 0, heroDuration: 0, cooldown: 0, title: "Improved" },
        { hitPointBonus: 0, damage: 5, lifeRegeneration: 2, armor: 1, attackSpeed: 0.1, moveSpeed: 20, heroDuration: 0, cooldown: 0 },
        { hitPointBonus: 0, damage: 10, lifeRegeneration: 5, armor: 2, attackSpeed: 0.15, moveSpeed: 40, heroDuration: 0, cooldown: 0 },
        { hitPointBonus: 0, damage: 17, lifeRegeneration: 8, armor: 3, attackSpeed: 0.2, moveSpeed: 60, heroDuration: 0, cooldown: 0 },
        { hitPointBonus: 0, damage: 25, lifeRegeneration: 11, armor: 4, attackSpeed: 0.25, moveSpeed: 80, heroDuration: 0, cooldown: 0 },
      ]
      return {
        Name: "Improved Fel Form",
        Description: `Improves Fel Form.
+${stats[lvl].damage} Damage
+${stats[lvl].armor} Armor
+${stats[lvl].lifeRegeneration} Hit Point Regeneration
+${stats[lvl].attackSpeed} Attack Speed
+${stats[lvl].moveSpeed} Movement Speed`,
        Tag: subtractObjects<IFelFormAttributes>(stats[lvl], stats[lvl - 1]),
        Icon: Icon.ChaosGrom,
        OnAllocate: (e) => this.FelFormImprove(e),
        Dependency: { up: 1 },
        Cost: 1,
      }
    })

    // Mastered Fel Form
    const felFormMastered: IFelFormAttributes = {
      hitPointBonus: 300,
      damage: 20,
      lifeRegeneration: 10,
      armor: 4,
      attackSpeed: 0.2,
      moveSpeed: 50,
      heroDuration: 4,
      cooldown: 0,
      title: "Mastered",
    }
    builder.AddTalent(3, 5, {
      Name: "Mastered Fel Form",
      Description: `Improves Fel Form.
+${felFormMastered.hitPointBonus} Hit Points
+${felFormMastered.damage} Damage
+${felFormMastered.armor} Armor
+${felFormMastered.lifeRegeneration} Hit Point Regeneration
+${felFormMastered.attackSpeed} Attack Speed
+${felFormMastered.moveSpeed} Movement Speed
+${felFormMastered.heroDuration} Second Duration`,
      Icon: Icon.ChaosGrom,
      Tag: felFormMastered,
      OnAllocate: (e) => this.FelFormImprove(e),
      Cost: 3,
      Dependency: { up: 4 },
    })

    // Fel Stability
    builder.AddMultirankTalent(2, 6, 2, (lvl) => {
      const stats: IFelFormAttributes[] = [{ duration: 0 }, { duration: 2 }, { duration: 4 }]
      const bonusDamage = [0, 5, 10]
      return {
        Name: "Fel Stability",
        Description: `Increases the duration of Fel Form by ${stats[lvl].duration} seconds and gives a permanent +${bonusDamage[lvl]}.`,
        Tag: { stats: subtractObjects<IFelFormAttributes>(stats[lvl], stats[lvl - 1]), bonusDamage: bonusDamage[lvl] },
        Icon: Icon.ChaosGrom,
        OnAllocate: (e) => this.FelStability(e),
        Dependency: { right: 2 },
      }
    })

    //
    // Shade Storm  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    //

    // Learn
    builder.AddTalent(0, 0, {
      Name: "Learn Shade Storm",
      Description: "",
      Icon: Icon.Whirlwind,
      OnAllocate: (e) => this.LearnShiftstorm(e),
      Cost: 2,
      Requirements: (e) => {
        return [e.hero.heroLevel >= 15, "Level 15 Required"]
      },
    })
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // Can use these methods inside Activate/Deactivate/Allocate/Deallocate/Requirements functions

  //
  // Shift Storm
  //

  LearnShiftstorm(e: ActivationEvent) {
    const ability = e.hero.getUnitAbility(AbilityFour.ShadeStorm) as Shadestorm
    ability.enable()
  }

  //
  // Fel Form
  //

  FelFormLearn(e: ActivationEvent) {
    try {
      const ability = e.hero.getUnitAbility(AbilityFour.FelForm) as FelForm
      ability.enable()
    } catch (error) {
      print(error)
    }
  }

  FelFormImprove(e: ActivationEvent) {
    const ability = e.hero.getUnitAbility(AbilityFour.FelForm) as FelForm
    const stats = e.talent.tag as IFelFormAttributes
    Object.assign(ability, stats)
    ability.augments += 1
  }

  FelStability(e: ActivationEvent) {
    const ability = e.hero.getUnitAbility(AbilityFour.FelForm) as FelForm
    ability.heroDuration += e.talent.tag
  }

  //
  // Shift
  //

  ImproveShift(e: ActivationEvent) {
    const ability = e.hero.getUnitAbility(AbilityFour.Shift) as Shift
    const stats: IShiftAttributes = e.talent.tag
    Object.assign(ability, stats)
    ability.update()
  }

  ShiftDistance(e: ActivationEvent) {
    const ability = e.hero.getUnitAbility(AbilityFour.Shift) as Shift
    ability.distance += e.talent.tag as number
    ability.update()
  }

  ShadeStrength(e: ActivationEvent) {
    const ability = e.hero.getUnitAbility(AbilityFour.Shift) as Shift
    ability.shadeDamageDealt += e.talent.tag as number
    ability.update()
  }

  ShadeHealth(e: ActivationEvent) {
    const ability = e.hero.getUnitAbility(AbilityFour.Shift) as Shift
    ability.shadeDamageTaken -= e.talent.tag as number
    ability.update()
  }
}
