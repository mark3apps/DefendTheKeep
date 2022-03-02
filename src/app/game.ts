/** @format */

import { DeathSpawn } from "app/abilities"
import { Cinematic, Pathing } from "app/systems"
import { Players } from "lib/w3ts"
import { CameraSetups } from "app/define/cameraSetups/CameraSetups"
import { Forces } from "app/define/forces/Forces"
import { Rectangles } from "app/define/rectangles"
import { Regions } from "app/define/regions"
import { Triggers } from "app/define/triggers/triggers"
import { Units } from "app/define/units"
import { AbilityTypes } from "./define/abilityTypes/abilityTypes"
import { Heroes } from "./define/heroes/Heroes"
import { ItemTypes } from "./define/itemTypes"
import { Banners } from "./define/banners/Banners"
import { Events } from "./systems/event/Events"
import { Gates } from "./systems/gates/gates"
import { HeroAttributes } from "./systems/heroAttribute/heroAttributes"
import { Abilities } from "./define/abilities/Abilities"
import { AbilityEngine } from "./classes/abilityEngine/AbilityEngine"
import { AbilityCast } from "./classes/abilityCast/AbilityCast"
import { ArcTagEngine } from "./systems/arcTag/ArcTagEngine"
import { Armies } from "./define/armies/Armies"
import { Factions } from "./define/factions/Factions"
import { Locs } from "./systems/loc/Locs"
import { Aspects } from "./define/aspects/Aspects"
import { Spawns } from "./systems/spawn/Spawns"
import { ShiftMasterHeroType } from "./heroes/heroTypes"
import { DamageEngine } from "./systems/damageEvent/DamageEngine"
import { Bases } from "./define/bases/Bases"
import { Logger } from "./log"
import { HeroAbilities } from "./define/heroAbilities/HeroAbilities"
import { UnitTypes } from "./define/UnitTypes"
import { UI } from "./ui/UI"

export class Game {
  static init = (): void => {}

  static start = (): void => {
    FogEnableOff()
    FogMaskEnableOff()

    Logger.Information("Game Init Start")

    // Globals with no upstream Dependencies
    Logger.Information("No Up Dependencies")
    const unitTypes = UnitTypes.getInstance()
    const rects = Rectangles.getInstance()
    const camSetups = CameraSetups.getInstance()
    const itemTypes = ItemTypes.getInstance()
    const forces = Forces.getInstance()
    const abilCast = AbilityCast.getInstance()
    const units = Units.getInstance()
    const abilTypes = AbilityTypes.getInstance()
    const regions = Regions.getInstance()
    const arcTagEngine = ArcTagEngine.getInstance()
    const triggers = Triggers.getInstance({})

    // Globals with upstream and downstream dependencies
    Logger.Information("Up and Down Dependencies")
    const armies = Armies.getInstance({ units: units, forces: forces })
    const locs = Locs.getInstance({ triggers: triggers, armies: armies, rects: rects })
    const banners = Banners.getInstance({ units: units, forces: forces })
    const heroAttr = HeroAttributes.getInstance({ itemTypes: itemTypes })
    const bases = Bases.getInstance({ locs: locs, armies: armies, units: units })
    const factions = Factions.getInstance({ bases: bases })
    const abilEngine = AbilityEngine.getInstance({ triggers: triggers, abilityCast: abilCast })
    const pathing = Pathing.getInstance({ triggers: triggers, locs: locs, forces: forces, regions: regions, unitTypes: unitTypes })
    const abils = Abilities.getInstance({ abilityEngine: abilEngine, abilityTypes: abilTypes, abilityCast: abilCast })
    const heroAbils = HeroAbilities.getInstance({ abilityTypes: abilTypes, abilityCast: abilCast, abilityEngine: abilEngine })

    // // // Globals with Upstream Dependencies
    Logger.Information("Up Dependencies")
    const ui = UI.getInstance({ unitTypes: unitTypes })
    Logger.Debug("DamageEngine")
    const damageEngine = DamageEngine.getInstance({ arcTagEngine: arcTagEngine, triggers: triggers })
    Logger.Debug("Heroes")
    const heroes = Heroes.getInstance({ triggers: triggers, forces: forces, rects: rects, abils: abils })
    Logger.Debug("DeathSpawn")
    const deathSpawn = DeathSpawn.getInstance({ triggers: triggers, pathing: pathing, unitTypes: unitTypes })
    Logger.Debug("Aspects")
    const aspects = Aspects.getInstance({ locs: locs, units: units, forces: forces, rects: rects })
    Logger.Debug("shiftMasterHeroType")
    const shiftMasterHeroType = ShiftMasterHeroType.getInstance({ heroAbils: heroAbils, heroAttr: heroAttr })
    Logger.Debug("gates")
    const gates = Gates.getInstance({ triggers: triggers, unitTypes: unitTypes })

    // // // Globals with Init Functions
    Logger.Debug("cinematic")
    const cinematic = Cinematic.getInstance({ forces: forces, camSetups: camSetups, unitTypes: unitTypes })
    Logger.Debug("spawns")
    const spawns = Spawns.getInstance({ factions: factions, unitTypes: unitTypes })
    Logger.Debug("events")
    const events = Events.getInstance({ units: units, banners: banners, locs: locs, forces: forces, rects: rects, unitTypes: unitTypes })

    Logger.Debug("Game Init Finished")

    // Start Functions
    Logger.Debug("Running Init Functions")
    cinematic.onInit()
    cinematic.setupCineCamera()
    cinematic.startHeroSelector()
    spawns.start()
    events.start()

    Players[0].lumber = 50
  }
}
