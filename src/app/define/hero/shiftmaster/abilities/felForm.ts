/** @format */

import { UnitAbility, Hero, UnitType } from "app/classes"
import { IUnitAbilityParam } from "app/classes/unitAbility/interfaces/IUnitAbilityParam"
import { Logger } from "app/log"
import { AbilityField } from "lib/resources/fields"
import { AbilityModel, Effect, Order } from "lib/w3ts"

export interface FelFormCustomData {
  enabled: boolean
  armor: number
  damage: number
  attackSpeed: number
  moveSpeed: number
  lifeRegeneration: number
}

export interface IFelFormAttributes {
  hitPointBonus?: number
  damage?: number
  lifeRegeneration?: number
  armor?: number
  attackSpeed?: number
  moveSpeed?: number
  heroDuration?: number
  cooldown?: number
  duration?: number
  title?: string
}

export class FelForm extends UnitAbility {
  private _felUnit = UnitType.get(this.getLevelField(AbilityField.ALTERNATE_FORM_UNIT_EMEU) as number)

  private _damage = 15
  private _attackSpeed = 0.5
  private _moveSpeed = 100
  private _armor = 2
  private _lifeRegenerationRate = 12
  private _title = ""
  augments = 0
  custom = this.unit.custom

  constructor(ability: IUnitAbilityParam) {
    super(ability)
    this.updateTooltips()
  }

  override updateTooltip(): void {
    this.tooltip = `${this.title}Fel Form [|cffffcc00${this.augments} Augments|r]`
  }

  override updateExtendedTooltip(): void {
    this.extendedTooltip = `The Shifter unleashes his inner rage, greatly increasing his fighting abilities and stamina while depleting his mana.
Lasts ${this.heroDuration} seconds.
		
|cff00ffff+${this.damage} Armor
|cff00ffff+${this.armor} Armor
|cff00ffff+${this.attackSpeed + 1}x attack speed
|cff00ffff+${this.moveSpeed} move speed
|cff00ffff+${this.lifeRegeneration} health per second`
  }

  get title() {
    return this._title
  }

  set title(value) {
    this._title = value + " "
  }

  get moveSpeed() {
    return this._moveSpeed
  }

  set moveSpeed(value) {
    this._moveSpeed = value
    this.updateTooltips()
  }

  get attackSpeed() {
    return this._attackSpeed
  }

  set attackSpeed(value) {
    this._attackSpeed = value
    this.updateTooltips()
  }

  get armor() {
    return this._armor
  }

  set armor(value) {
    this._armor = value
    this.updateTooltips()
  }

  get lifeRegeneration() {
    return this._lifeRegenerationRate
  }

  set lifeRegeneration(value) {
    this._lifeRegenerationRate = value
    this.updateTooltips()
  }

  get felUnit() {
    return this._felUnit
  }

  set felUnit(value) {
    if (value) {
      this.setLevelField(AbilityField.ALTERNATE_FORM_UNIT_EMEU, value.id)
      this._felUnit = value
    }
  }

  get hitPointBonus() {
    return this.getLevelField(AbilityField.ALTERNATE_FORM_HIT_POINT_BONUS) as number
  }

  set hitPointBonus(value) {
    this.setLevelField(AbilityField.ALTERNATE_FORM_HIT_POINT_BONUS, value)
    this.updateTooltips()
  }

  get damage() {
    return this._damage
  }

  set damage(value) {
    this.updateTooltips()
    this._damage = value
  }

  override onEffect = () => {
    // Start Fel Form
    if (this.unit.currentOrder === Order.Metamorphosis) {
      this.startFelForm()

      // End Fel Form
    } else if (this.custom.get("felForm")) {
      this.endFelForm()
    }
  }

  startFelForm() {
    try {
      const hero = this.unit as Hero
      Logger.Information("Hero", hero.name)

      const customData: FelFormCustomData = {
        enabled: true,
        armor: this.armor,
        damage: this.damage,
        attackSpeed: this.attackSpeed,
        moveSpeed: this.moveSpeed,
        lifeRegeneration: this.lifeRegeneration,
      }
      this.custom.set("felForm", customData)

      hero.armorBonus += this.armor
      hero.damageBonus += this.damage
      hero.attackSpeedBonus += this.attackSpeed
      hero.movementSpeedBonus += this.moveSpeed
      hero.lifeRegenerationBonus += this.lifeRegeneration

      const morph = new Effect(AbilityModel.howlCaster, hero.coordinate)
      morph.destroy()

      print("Morphing")
    } catch (error) {
      Logger.Error("Fel Form", error)
    }
  }

  endFelForm() {
    const hero = this.unit as Hero
    const customData = this.custom.get("felForm") as FelFormCustomData
    hero.armorBonus -= customData.armor
    hero.damageBonus -= customData.damage
    hero.attackSpeedBonus -= customData.attackSpeed
    hero.movementSpeedBonus -= customData.moveSpeed
    hero.lifeRegenerationBonus -= customData.lifeRegeneration

    // Reset variables
    this.custom.delete("felForm")

    print("UnMorphing")
  }

  static override fromHandle(ability: IUnitAbilityParam) {
    return this.getObject(ability) as FelForm
  }
}
