/** @format */

import { DeathSpawn } from "app/abilities"
import { Cinematic } from "app/systems"
import { Players } from "lib/w3ts"
import { CameraSetups } from "app/define/cameraSetups/CameraSetups"
import { Forces } from "app/define/forces/Forces"
import { Rectangles } from "app/define/Rectangles/Rectangles"
import { Regions } from "app/define/regions"
import { Triggers } from "app/define/triggers/triggers"
import { Units } from "app/define/units/Units"
import { AbilityTypes } from "./define/abilityTypes/abilityTypes"
import { Heroes } from "./define/heroes/Heroes"
import { ItemTypes } from "./define/itemTypes"
import { Banners } from "./define/banners/Banners"
import { Gates } from "./systems/gates/gates"
import { HeroAttributes } from "./systems/heroAttribute/heroAttributes"
import { Abilities } from "./define/abilities/Abilities"
import { AbilityEngine } from "./classes/abilityEngine/AbilityEngine"
import { AbilityCast } from "./classes/abilityCast/AbilityCast"
import { ArcTagEngine } from "./systems/arcTag/ArcTagEngine"
import { DamageEngine } from "./systems/damageEvent/DamageEngine"
import { Logger } from "./log"
import { HeroAbilities } from "./define/heroAbilities/HeroAbilities"
import { UnitTypes } from "./define/UnitTypes"
import { UI } from "./ui/UI"

export class Game {
  static init = (): void => {}

  static start = (): void => {
    // FogEnableOff()
    // FogMaskEnableOff()

    Logger.Information("Game Init Start")

    Logger.Information("Static Define")
    const rects = Rectangles.getInstance()
    const camSetups = CameraSetups.getInstance()
    const units = Units.getInstance()
    const regions = Regions.getInstance()

    // Globals with no upstream Dependencies
    Logger.Information("No Up Dependencies")
    const unitTypes = UnitTypes.getInstance()
    const itemTypes = ItemTypes.getInstance()
    const forces = Forces.getInstance()
    const abilCast = AbilityCast.getInstance()
    const abilTypes = AbilityTypes.getInstance()
    const arcTagEngine = ArcTagEngine.getInstance()
    const triggers = Triggers.getInstance({})

    // Globals with upstream and downstream dependencies
    Logger.Information("Up and Down Dependencies")
    const banners = Banners.getInstance({ units: units, forces: forces })
    const heroAttr = HeroAttributes.getInstance({ itemTypes: itemTypes })
    const abilEngine = AbilityEngine.getInstance({ triggers: triggers, abilityCast: abilCast })
    const abils = Abilities.getInstance({ abilityEngine: abilEngine, abilityTypes: abilTypes, abilityCast: abilCast })
    const heroAbils = HeroAbilities.getInstance({ abilityTypes: abilTypes, abilityCast: abilCast, abilityEngine: abilEngine })

    // Globals with Upstream Dependencies
    Logger.Information("Up Dependencies")
    const ui = UI.getInstance({ unitTypes: unitTypes })
    Logger.Debug("DamageEngine")
    const damageEngine = DamageEngine.getInstance({ arcTagEngine: arcTagEngine, triggers: triggers })
    Logger.Debug("Heroes")
    // const heroes = Heroes.getInstance({ triggers: triggers, forces: forces, rects: rects, abils: abils })
    Logger.Debug("DeathSpawn")
    const deathSpawn = DeathSpawn.getInstance({ triggers: triggers, unitTypes: unitTypes })
    Logger.Debug("gates")
    const gates = Gates.getInstance({ triggers: triggers, unitTypes: unitTypes })

    // // // Globals with Init Functions
    Logger.Debug("cinematic")
    // const cinematic = Cinematic.getInstance({ forces: forces, camSetups: camSetups, unitTypes: unitTypes })

    Logger.Debug("Game Init Finished")

    // Start Functions
    Logger.Debug("Running Init Functions")
    // cinematic.onInit()
    // cinematic.setupCineCamera()
    // cinematic.startHeroSelector()

    Players[0].lumber = 50
  }
}
