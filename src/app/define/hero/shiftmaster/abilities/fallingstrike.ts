/** @format */

import { UnitAbility, Position } from "app/classes"
import { IUnitAbilityParam } from "app/classes/unitAbility/interfaces/IUnitAbilityParam"
import { UnitTypes } from "app/define/UnitTypes"
import { AbilityTypes } from "app/define/abilityTypes/abilityTypes"
import { Logger } from "app/log"
import { AttackType, DamageType } from "lib/resources/types"
import { AbilityFour, Timer, Anim, Unit, Group, Order } from "lib/w3ts"

export class FallingStrike extends UnitAbility {
  damage = 85
  speed = 32
  augments = 0
  slowDuration = 5
  slowMovement = 0.5

  constructor(ability: IUnitAbilityParam) {
    super(ability)
    this.updateTooltips()
  }

  updateTooltip(): void {
    this.tooltip = `Falling Strike - [|cffffcc00${this.augments} Augments|r]`
  }

  updateExtendedTooltip(): void {
    this.extendedTooltip = `The Shifter jumps to the target dealing damage and slowing units in close proximity to the landing attack for a short time.

|cff00ffff${this.damage}|r Area Damage
|cff00ffff${this.slowMovement * 100}%|r Slower Movement Speed
|cff00ffff${this.slowDuration}|r Second Area Slow
|cff00ffff${math.floor(this.areaOfEffect)}|r Area of Effect
|cff00ffff${math.floor(this.castRange)}|r Jump Distance`
  }

  override onEffect = () => {
    try {
      const abilityTypes = AbilityTypes.getInstance()
      const unitTypes = UnitTypes.getInstance()

      // Get Attributes
      const startPos = new Position(this.unit.coordinate)
      const spellTarget = Position.fromSpellTarget()

      // Calculate some vars
      let distanceTravelled = 0
      const angle = startPos.yawTo(spellTarget)
      const fullDistance = startPos.distanceTo(spellTarget)
      const maximumHeight = fullDistance * 0.5

      if (spellTarget.isTerrianPathable()) {
        this.unit.setPathing(false)
        this.unit.invulnerable = true
        this.unit.addAbility(AbilityFour.StormCrowForm)
        this.unit.removeAbility(AbilityFour.StormCrowForm)

        // Queue the Proper Animation
        const animTimer = new Timer()
        animTimer.start(0.1, false, () => {
          this.unit.setAnimation(Anim.Hellscream.attackSlam)
        })

        // Start the Jump
        const loop = new Timer()
        loop.start(0.02, true, () => {
          distanceTravelled += this.speed
          this.unit.moveToPolarProjection(this.speed, angle)
          this.unit.flyHeight = this.unit.getParabolaZ(distanceTravelled, fullDistance, maximumHeight)

          if (distanceTravelled >= fullDistance) {
            this.unit.invulnerable = false
            this.unit.setPathing(true)
            this.unit.flyHeight = this.unit.defaultFlyHeight

            const u = new Unit({
              owner: this.unit.owner,
              type: unitTypes.Dummy,
              coor: this.unit.coordinate,
            })
            u.addAbility(abilityTypes.FallingStrikeDummy)
            u.applyTimedLifeGeneric(1)

            const ability = new UnitAbility({
              unit: u,
              abilType: abilityTypes.FallingStrikeDummy,
            })
            ability.heroDuration = this.slowDuration
            ability.normalDuration = this.slowDuration
            ability.areaOfEffect = this.areaOfEffect
            ability.castImmediate()

            const g = new Group()
            g.enumUnitsInRange(spellTarget, this.areaOfEffect, () => {
              const u = Unit.fromFilter()
              return u.isAlive() && u.isEnemy(this.unit) && !u.isMagicImmune && !u.isStructure && u.isGround
            })

            g.firstLoop((u) => {
              this.unit.damageTarget(u, this.damage, false, false, AttackType.MAGIC, DamageType.NORMAL)
            })
            g.destroy()

            loop.destroy()
          }
        })
      } else {
        this.unit.issueOrder(Order.Stop)
        this.unit.mana += this.manaCost
        this.resetCooldown()
      }
    } catch (error) {
      Logger.Error("FallingStrike.onEffect", error)
    }
  }

  static override fromHandle(ability: IUnitAbilityParam) {
    return this.getObject(ability) as FallingStrike
  }
}
