/** @format */

import { SpawnValues, SpawnLoop } from "lib/resources/spawnCheck"
import { Timer } from "lib/w3ts/index"
import { ISpawnsDepend } from "./ISpawnsDepend"
import { Spawn } from "./spawn"

export class Spawns {
  protected static instance: Spawns

  static getInstance(depend: ISpawnsDepend) {
    if (!Spawns.instance) Spawns.instance = new Spawns(depend)
    return Spawns.instance
  }

  maxLevel = 12
  maxWaves = 10

  spawnTimer: Timer
  levelTimer: Timer
  check: SpawnValues = { levels: 12, waves: 10, level: 1, wave: 1, base: 0, unit: 0 }
  loop: SpawnLoop = { cycle: 1, wave: 10, base: 0.5, unit: 0.05 }
  spawns: string[] = []

  base: { [name: string]: Spawn } = {}

  constructor(depend: ISpawnsDepend) {
    // Dependencies
    const factions = depend.factions
    const unitTypes = depend.unitTypes

    this.spawnTimer = new Timer()
    this.levelTimer = new Timer()

    // Arcane
    this.base.arcane = new Spawn("arcane", factions.arcane)
    this.base.arcane.addUnit({ unitType: unitTypes.Sorceress, waves: [6, 7, 8, 9, 10], start: 3 })
    this.base.arcane.addUnit({ unitType: unitTypes.StormSummoner, waves: [6, 7, 8, 9, 10], start: 5 })
    this.base.arcane.addUnit({ unitType: unitTypes.MagiDefender, waves: [6, 8], start: 7 })
    this.addSpawn(this.base.arcane.name)

    // Arcane Creep
    this.base.arcaneCreep = new Spawn("arcaneCreep", factions.arcaneCreep)
    this.base.arcaneCreep.addUnit({ unitType: unitTypes.BattleGolem, waves: [1, 2, 3, 4], start: 1 })
    this.base.arcaneCreep.addUnit({ unitType: unitTypes.WaterElemental2, waves: [1, 3], start: 3 })
    this.base.arcaneCreep.addUnit({ unitType: unitTypes.WaterElemental3, waves: [2, 3], start: 4 })
    this.base.arcaneCreep.addUnit({ unitType: unitTypes.MagiDefender, waves: [1, 2], start: 6 })
    this.addSpawn(this.base.arcaneCreep.name)

    // Arcane Hero
    this.base.arcaneHero = new Spawn("arcaneHero", factions.arcaneHero)
    this.base.arcaneHero.addUnit({ unitType: unitTypes.MagiDefender, waves: [1, 2, 3, 5], start: 6 })
    this.base.arcaneHero.addUnit({ unitType: unitTypes.SupremeWizard, waves: [5], start: 7 })
    this.base.arcaneHero.addUnit({ unitType: unitTypes.SeigeGolem, waves: [4], start: 9 })
    this.addSpawn(this.base.arcaneHero.name)

    // Arcane Top
    this.base.arcaneTop = new Spawn("arcaneTop", factions.arcaneTop)
    this.base.arcaneTop.addUnit({ unitType: unitTypes.BattleGolem, amount: 2, waves: [4, 5, 6] })
    this.base.arcaneTop.addUnit({ unitType: unitTypes.WaterElemental2, waves: [4, 6], start: 4 })
    this.base.arcaneTop.addUnit({ unitType: unitTypes.Summoner, waves: [4], start: 8 })
    this.addSpawn(this.base.arcaneTop.name)

    // Arcane Bottom
    this.base.arcaneBottom = new Spawn("arcaneBottom", factions.arcaneBottom)
    this.base.arcaneBottom.addUnit({ unitType: unitTypes.BattleGolem, amount: 2, waves: [1, 2, 3], start: 2 })
    this.base.arcaneBottom.addUnit({ unitType: unitTypes.WaterElemental2, waves: [1, 3], start: 4 })
    this.base.arcaneBottom.addUnit({ unitType: unitTypes.Summoner, waves: [1], start: 8 })
    this.addSpawn(this.base.arcaneBottom.name)

    // High City
    this.base.highCity = new Spawn("highCity", factions.highCity)
    this.base.highCity.addUnit({ unitType: unitTypes.Militia2, amount: 2, waves: [1, 2, 3, 4, 5, 6], end: 7 })
    this.base.highCity.addUnit({ unitType: unitTypes.Arbalist, waves: [1, 2, 3, 4], start: 1, end: 4 })
    this.base.highCity.addUnit({ unitType: unitTypes.Arbalist, waves: [1, 2, 3, 4, 5, 6, 7], start: 5 })
    this.base.highCity.addUnit({ unitType: unitTypes.Footman1, waves: [1, 2, 3, 4], start: 4, end: 7 })
    this.base.highCity.addUnit({ unitType: unitTypes.Footman2, amount: 2, waves: [1, 2, 3, 4], start: 8 })
    this.base.highCity.addUnit({ unitType: unitTypes.Captain1, amount: 1, waves: [1, 3], start: 9 })
    this.addSpawn(this.base.highCity.name)

    // Castle
    this.base.castle = new Spawn("castle", factions.castle)
    this.base.castle.addUnit({ unitType: unitTypes.Captain2, waves: [1, 2, 3], start: 8 })
    this.addSpawn(this.base.castle.name)

    // City Elves
    this.base.cityElves = new Spawn("cityElves", factions.cityElves)
    this.base.cityElves.addUnit({ unitType: unitTypes.BloodElfArcher, waves: [1, 3, 5], end: 1 })
    this.base.cityElves.addUnit({ unitType: unitTypes.BloodElfArcher, waves: [1, 2, 3, 4], start: 2 })
    this.base.cityElves.addUnit({ unitType: unitTypes.BloodElfArcher, waves: [3, 4, 5, 6], start: 4 })
    this.base.cityElves.addUnit({ unitType: unitTypes.BloodElfBreaker, waves: [1, 3, 4, 5, 6], start: 2, end: 3 })
    this.base.cityElves.addUnit({ unitType: unitTypes.BloodElfBreaker, waves: [1, 2, 3, 4, 5, 6, 7], start: 4, end: 5 })
    this.base.cityElves.addUnit({ unitType: unitTypes.BloodElfBreaker, amount: 2, waves: [1, 2, 3, 4, 5], start: 6 })
    this.base.cityElves.addUnit({ unitType: unitTypes.BloodElfMage, waves: [1, 4], start: 3, end: 6 })
    this.base.cityElves.addUnit({ unitType: unitTypes.BloodElfMage, waves: [1, 2, 3, 4, 5], start: 7 })
    this.addSpawn(this.base.cityElves.name)

    // City Front
    this.base.cityFront = new Spawn("cityFront", factions.cityFront)
    this.base.cityFront.addUnit({ unitType: unitTypes.Militia1, amount: 3, waves: [1, 2, 3, 4, 5, 6], end: 2 })
    this.base.cityFront.addUnit({ unitType: unitTypes.Militia2, amount: 2, waves: [1, 2, 3, 4, 5, 6, 7], start: 3, end: 4 })
    this.base.cityFront.addUnit({ unitType: unitTypes.Footman1, amount: 3, waves: [1, 2, 3, 5, 6, 7], start: 5 })
    this.base.cityFront.addUnit({ unitType: unitTypes.Captain1, amount: 2, waves: [3, 4, 7], start: 5 })
    this.base.cityFront.addUnit({ unitType: unitTypes.Knight, waves: [1, 3, 5, 7], start: 6 })
    this.base.cityFront.addUnit({ unitType: unitTypes.Catapult, waves: [1, 4], start: 6 })
    this.base.cityFront.addUnit({ unitType: unitTypes.Commander, waves: [2], start: 10 })
    this.addSpawn(this.base.cityFront.name)

    // Draenei
    this.base.draenei = new Spawn("draenei", factions.draenei)
    this.base.draenei.addUnit({ unitType: unitTypes.DraeneiGuardian, amount: 2, waves: [5, 6, 7, 8, 9, 10] })
    this.base.draenei.addUnit({ unitType: unitTypes.DraeneiGuardian, waves: [7, 8, 9], start: 5 })
    this.base.draenei.addUnit({ unitType: unitTypes.DraeneiDarkslayer, waves: [6, 7, 8, 9, 10], start: 3 })
    this.base.draenei.addUnit({ unitType: unitTypes.DraeneiSeer, waves: [7, 10], start: 4 })
    this.base.draenei.addUnit({ unitType: unitTypes.DraeneiVindicator, waves: [5, 6, 8], start: 7 })
    this.base.draenei.addUnit({ unitType: unitTypes.DraeneiDemolisher, waves: [6, 8, 10], start: 6 })
    this.addSpawn(this.base.draenei.name)

    // High Elves
    this.base.highElves = new Spawn("highElves", factions.highElves)
    this.base.highElves.addUnit({ unitType: unitTypes.HighElfApprenticeSwordsman, waves: [1, 2, 3, 5], end: 3 })
    this.base.highElves.addUnit({ unitType: unitTypes.HighElfApprenticeSwordsman, waves: [1, 3], start: 4 })
    this.base.highElves.addUnit({ unitType: unitTypes.HighElfArcher, waves: [1, 3, 5], start: 2 })
    this.base.highElves.addUnit({ unitType: unitTypes.HighElfSwordsman, amount: 2, waves: [1, 2, 3, 4], start: 4 })
    this.base.highElves.addUnit({ unitType: unitTypes.HighElfHealer, waves: [1, 3, 5], start: 5 })
    this.base.highElves.addUnit({ unitType: unitTypes.DragonHawk, amount: 2, waves: [2, 3, 5], start: 6 })
    this.base.highElves.addUnit({ unitType: unitTypes.HighElfKnight, waves: [1, 3, 5], start: 7 })
    this.addSpawn(this.base.highElves.name)

    // High Elves Creep
    this.base.highElvesCreep = new Spawn("highElvesCreep", factions.highElvesCreep)
    this.base.highElvesCreep.addUnit({ unitType: unitTypes.HighElfSwordsman, waves: [1, 2, 3, 4] })
    this.base.highElvesCreep.addUnit({ unitType: unitTypes.HighElfArcher, waves: [1, 3, 5], start: 2 })
    this.base.highElvesCreep.addUnit({ unitType: unitTypes.HighElfHealer, waves: [1, 3], start: 4 })
    this.base.highElvesCreep.addUnit({ unitType: unitTypes.HighElfGuardian, amount: 2, waves: [3], start: 5 })
    this.addSpawn(this.base.highElvesCreep.name)

    // Merc this
    this.base.merc = new Spawn("merc", factions.merc)
    this.base.merc.addUnit({ unitType: unitTypes.Rogue, amount: 2, waves: [4, 5, 6, 7] })
    this.base.merc.addUnit({ unitType: unitTypes.BanditSpearman, waves: [3, 4, 5, 6, 7, 8, 9], start: 2 })
    this.base.merc.addUnit({ unitType: unitTypes.Bandit, amount: 2, waves: [3, 5, 6, 7], start: 3 })
    this.base.merc.addUnit({ unitType: unitTypes.Enforcer, waves: [3, 5], start: 4 })
    this.base.merc.addUnit({ unitType: unitTypes.Assassin, waves: [5, 6, 7], start: 5 })
    this.base.merc.addUnit({ unitType: unitTypes.BanditLord, waves: [3, 5], start: 6 })
    this.addSpawn(this.base.merc.name)

    // Dwarf this
    this.base.dwarf = new Spawn("dwarf", factions.dwarf)
    this.base.dwarf.addUnit({ unitType: unitTypes.IronGuard, amount: 2, waves: [1, 2, 3, 5, 6], end: 1 })
    this.base.dwarf.addUnit({ unitType: unitTypes.IronGuard, amount: 3, waves: [1, 2, 3, 4, 5, 6, 7], start: 2 })
    this.base.dwarf.addUnit({ unitType: unitTypes.IronRifleman, waves: [1, 2, 3, 4, 5, 6], start: 2 })
    this.base.dwarf.addUnit({ unitType: unitTypes.IronMortarTeam, waves: [2, 3, 4, 6], start: 3 })
    this.base.dwarf.addUnit({ unitType: unitTypes.IronCaptain, waves: [1, 2, 3, 4, 5, 6], start: 4 })
    this.base.dwarf.addUnit({ unitType: unitTypes.IronMagi, waves: [1, 2, 3, 4], start: 5 })
    this.base.dwarf.addUnit({ unitType: unitTypes.SeigeEngine, waves: [1, 2, 5], start: 6 })
    this.base.dwarf.addUnit({ unitType: unitTypes.GryphonRider, waves: [1, 2, 3, 4, 5], start: 8 })
    this.addSpawn(this.base.dwarf.name)

    // Dwarf Creep this
    this.base.dwarfCreep = new Spawn("dwarfCreep", factions.dwarfCreep)
    this.base.dwarfCreep.addUnit({ unitType: unitTypes.IronGuard, amount: 2, waves: [5, 6, 7, 8] })
    this.base.dwarfCreep.addUnit({ unitType: unitTypes.IronRifleman, waves: [5, 7], start: 3 })
    this.base.dwarfCreep.addUnit({ unitType: unitTypes.IronCaptain, waves: [5, 7, 8], start: 4 })
    this.base.dwarfCreep.addUnit({ unitType: unitTypes.IronMagi, waves: [6], start: 5 })
    this.addSpawn(this.base.dwarfCreep.name)

    // Murloc this
    this.base.murloc = new Spawn("murloc", factions.murloc)
    this.base.murloc.addUnit({ unitType: unitTypes.MurlocCliffRunner, amount: 4, waves: [5, 6, 7, 8, 9, 10] })
    this.base.murloc.addUnit({ unitType: unitTypes.MurlocCliffRunner, amount: 2, waves: [5, 6, 7, 8], start: 5 })
    this.base.murloc.addUnit({ unitType: unitTypes.MurlocReaver, waves: [5, 6, 7, 9], start: 3 })
    this.base.murloc.addUnit({ unitType: unitTypes.MurlocSnareCaster, amount: 2, waves: [6, 7, 8, 10], start: 4 })
    this.base.murloc.addUnit({ unitType: unitTypes.MurlocTideWarrior, waves: [4, 8], start: 7 })
    this.addSpawn(this.base.murloc.name)

    // Naga this
    this.base.naga = new Spawn("naga", factions.naga)
    this.base.naga.addUnit({ unitType: unitTypes.NagaMyrmidon, waves: [1, 3], end: 3 })
    this.base.naga.addUnit({ unitType: unitTypes.NagaMyrmidon, waves: [1, 2, 3, 4], start: 4, end: 6 })
    this.base.naga.addUnit({ unitType: unitTypes.NagaMyrmidon, waves: [1, 3, 5], start: 7 })
    this.base.naga.addUnit({ unitType: unitTypes.NagaMyrmidon, waves: [1, 2, 3, 4, 5, 6], start: 7 })
    this.base.naga.addUnit({ unitType: unitTypes.NagaSiren, waves: [2, 4, 6], start: 3 })
    this.base.naga.addUnit({ unitType: unitTypes.SnapDragon, waves: [2, 3, 4], start: 5 })
    this.base.naga.addUnit({ unitType: unitTypes.NagaRoyalGuard, waves: [2, 5], start: 6 })
    this.base.naga.addUnit({ unitType: unitTypes.DragonTurtle, waves: [1, 4], start: 9 })
    this.addSpawn(this.base.naga.name)

    // Naga Creep this
    this.base.nagaCreep = new Spawn("nagaCreep", factions.nagaCreep)
    this.base.nagaCreep.addUnit({ unitType: unitTypes.NagaMyrmidon, waves: [1, 2], start: 2 })
    this.base.nagaCreep.addUnit({ unitType: unitTypes.NagaSiren, waves: [2, 4], start: 3 })
    this.base.nagaCreep.addUnit({ unitType: unitTypes.SnapDragon, waves: [2, 3, 4], start: 5 })
    this.addSpawn(this.base.nagaCreep.name)

    // Tree this
    this.base.tree = new Spawn("tree", factions.tree)
    this.base.tree.addUnit({ unitType: unitTypes.Dryad, waves: [7, 8, 9, 10], start: 3 })
    this.base.tree.addUnit({ unitType: unitTypes.DruidOfTheClaw, waves: [6, 7, 8, 9, 10], start: 4 })
    this.base.tree.addUnit({ unitType: unitTypes.MountainGiant, waves: [5, 9], start: 5 })
    this.base.tree.addUnit({ unitType: unitTypes.AncientOfLife, waves: [5, 8], start: 6 })
    this.base.tree.addUnit({ unitType: unitTypes.AncientOfWar, waves: [3], start: 10 })
    this.addSpawn(this.base.tree.name)

    // Night Elves this
    this.base.nightElf = new Spawn("nightElf", factions.nightElf)
    this.base.nightElf.addUnit({ unitType: unitTypes.NightElfRanger, waves: [5, 6, 7, 8, 9, 10] })
    this.base.nightElf.addUnit({ unitType: unitTypes.NightElfEliteRanger, waves: [6, 7, 8, 9, 10], start: 2 })
    this.base.nightElf.addUnit({ unitType: unitTypes.NightElfSentry, waves: [6, 7, 8, 9, 10], start: 2 })
    this.base.nightElf.addUnit({ unitType: unitTypes.NightElfSentry, waves: [7, 8, 9], start: 4 })
    this.base.nightElf.addUnit({ unitType: unitTypes.NightElfWarden, waves: [6, 7, 8, 9, 10], start: 5 })
    this.base.nightElf.addUnit({ unitType: unitTypes.HippogryphRider, amount: 2, waves: [4, 6, 7], start: 6 })
    this.addSpawn(this.base.nightElf.name)

    // Orc this
    this.base.orc = new Spawn("orc", factions.orc)
    this.base.orc.addUnit({ unitType: unitTypes.Grunt, amount: 2, waves: [1, 3, 5, 6] })
    this.base.orc.addUnit({ unitType: unitTypes.Grunt, waves: [2, 4, 6, 7], start: 3 })
    this.base.orc.addUnit({ unitType: unitTypes.TrollAxethrower, waves: [2, 4, 6, 7], start: 2 })
    this.base.orc.addUnit({ unitType: unitTypes.Ogre, amount: 2, waves: [2, 4, 6, 7], start: 4 })
    this.base.orc.addUnit({ unitType: unitTypes.Warlock, waves: [3, 5, 7], start: 3 })
    this.base.orc.addUnit({ unitType: unitTypes.OrcWarlord, waves: [1, 7], start: 6 })
    this.addSpawn(this.base.orc.name)

    // Human Shipyard this
    this.base.humanShipyard = new Spawn("humanShipyard", factions.humanShipyard)
    this.base.humanShipyard.addUnit({ unitType: unitTypes.HumanFrigate, waves: [2], end: 2 })
    this.base.humanShipyard.addUnit({ unitType: unitTypes.HumanFrigate, waves: [2, 6], start: 3, end: 5 })
    this.base.humanShipyard.addUnit({ unitType: unitTypes.HumanFrigate, waves: [2, 4, 7], start: 6, end: 8 })
    this.base.humanShipyard.addUnit({ unitType: unitTypes.HumanFrigate, waves: [2, 4, 6, 7], start: 9 })
    this.base.humanShipyard.addUnit({ unitType: unitTypes.HumanBattleship, waves: [3], start: 5, end: 7 })
    this.base.humanShipyard.addUnit({ unitType: unitTypes.HumanBattleship, waves: [3, 5], start: 8 })
    this.addSpawn(this.base.humanShipyard.name)

    // Night Elf Shipyard this
    this.base.nightElfShipyard = new Spawn("nightElfShipyard", factions.nightElfShipyard)
    this.base.nightElfShipyard.addUnit({ unitType: unitTypes.NightElfFrigate, waves: [3], end: 3 })
    this.base.nightElfShipyard.addUnit({ unitType: unitTypes.NightElfFrigate, waves: [1, 3], start: 4, end: 5 })
    this.base.nightElfShipyard.addUnit({ unitType: unitTypes.NightElfFrigate, waves: [1, 3, 6], start: 6 })
    this.base.nightElfShipyard.addUnit({ unitType: unitTypes.NightElfBattleship, waves: [3], start: 7 })
    this.addSpawn(this.base.nightElfShipyard.name)

    // Undead this
    this.base.undead = new Spawn("undead", factions.undead)
    this.base.undead.addUnit({ unitType: unitTypes.Ghoul, amount: 4, waves: [4, 5, 6, 7, 8] })
    this.base.undead.addUnit({ unitType: unitTypes.Necromancer, waves: [4, 6, 8], start: 2 })
    this.base.undead.addUnit({ unitType: unitTypes.Lich, waves: [5, 7, 9], start: 4 })
    this.base.undead.addUnit({ unitType: unitTypes.EredarWarlock, waves: [6], start: 6 })
    this.base.undead.addUnit({ unitType: unitTypes.GiantSkeleton, waves: [4, 6], start: 8 })
    this.base.undead.addUnit({ unitType: unitTypes.InfernalContraption, waves: [5, 7], start: 3, end: 5 })
    this.base.undead.addUnit({ unitType: unitTypes.InfernalMachine, waves: [5, 7], start: 6, end: 9 })
    this.base.undead.addUnit({ unitType: unitTypes.InfernalJuggernaut, waves: [5, 7], start: 10 })
    this.addSpawn(this.base.undead.name)

    // Wildhammer
    this.base.wildhammer = new Spawn("wildhammer", factions.wildhammer)
    this.base.wildhammer.addUnit({ unitType: unitTypes.DwarfClansman, amount: 3, waves: [4, 5, 6, 7, 8] })
    this.base.wildhammer.addUnit({ unitType: unitTypes.DwarfAxethrower, amount: 2, waves: [4, 5, 6, 7], start: 3 })
    this.base.wildhammer.addUnit({ unitType: unitTypes.DwarfElite, amount: 1, waves: [4, 5, 6, 7], start: 5 })
    this.addSpawn(this.base.wildhammer.name)
  }

  addSpawn = (value: string): void => {
    this.spawns.push(value)
  }

  iterate = (): void => {
    try {
      const spawnName = this.spawns[this.check.base]

      const curSpawn: Spawn = this.base[spawnName]

      // this Units
      curSpawn.spawnUnit(this.check)

      this.check.unit++

      // If unit is last unit in Base
      if (this.check.unit > curSpawn.countOfUnits - 1) {
        this.check.unit = 0
        this.check.base++

        // Base is last Base in Wave
        if (this.check.base >= this.spawns.length) {
          this.check.base = 0
          this.check.wave++

          // Wave is last Wave in Cycly
          if (this.check.wave > this.check.waves) {
            this.check.wave = 1

            // New Cycle Time
            this.spawnTimer.start(this.loop.cycle, false, () => {
              this.iterate()
            })
          } else {
            // New Wave Time
            this.spawnTimer.start(this.loop.wave, false, () => {
              this.iterate()
            })
          }
        } else {
          // New Base Time
          this.spawnTimer.start(this.loop.base, false, () => {
            this.iterate()
          })
        }
      } else {
        // New Unit Time
        this.spawnTimer.start(this.loop.unit, false, () => {
          this.iterate()
        })
      }
    } catch (e) {
      print(e)
    }
  }

  levelUp = (): number => {
    this.check.level++
    if (this.check.level > this.check.levels) {
      this.check.level = this.check.levels
    } else {
      print("Level Up")

      this.levelTimer.start(50 + 15 * this.check.level, false, () => {
        this.levelUp()
      })
    }
    return this.check.level
  }

  start = (): void => {
    this.spawnTimer = new Timer()
    this.spawnTimer.start(1, false, () => {
      this.iterate()
    })

    this.levelTimer = new Timer()
    this.levelTimer.start(50 + 10 * this.check.level, false, () => {
      this.levelUp()
    })
  }
}
