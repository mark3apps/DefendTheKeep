/** @format */

import { IFactionsDepend } from "./IFactionsDepend"
import { Faction } from "../../systems/faction/faction"
export class Factions {
  private static instance?: Factions

  static getInstance(depend: IFactionsDepend) {
    if (!Factions.instance) Factions.instance = new Factions(depend)
    return Factions.instance
  }

  arcane: Faction
  arcaneCreep: Faction
  arcaneHero: Faction
  arcaneTop: Faction
  arcaneBottom: Faction
  castle: Faction
  highCity: Faction
  cityElves: Faction
  cityFront: Faction
  humanShipyard: Faction
  highElves: Faction
  highElvesCreep: Faction
  tree: Faction
  nightElf: Faction
  nightElfShipyard: Faction
  merc: Faction
  dwarf: Faction
  dwarfCreep: Faction
  naga: Faction
  nagaCreep: Faction
  murloc: Faction
  orc: Faction
  draenei: Faction
  undead: Faction
  wildhammer: Faction

  constructor(depend: IFactionsDepend) {
    const bases = depend.bases

    this.arcane = new Faction({ alliance: bases.arcaneAlliance, federation: bases.arcaneFederation })
    this.arcaneCreep = new Faction({ alliance: bases.arcaneCreepAlliance, federation: bases.arcaneCreepFederation })
    this.arcaneHero = new Faction({ alliance: bases.arcaneHeroAlliance, federation: bases.arcaneHeroFederation })
    this.arcaneTop = new Faction({ alliance: bases.arcaneTopAlliance, federation: bases.arcaneTopFederation })
    this.arcaneBottom = new Faction({ alliance: bases.arcaneBottomAlliance, federation: bases.arcaneBottomFederation })
    this.castle = new Faction({ alliance: bases.castleAlliance, federation: bases.castleFederation })
    this.highCity = new Faction({ alliance: bases.highCityAlliance, federation: bases.highCityFederation })
    this.cityElves = new Faction({ alliance: bases.cityElvesAlliance, federation: bases.cityElvesFederation })
    this.cityFront = new Faction({ alliance: bases.cityFrontAlliance, federation: bases.cityFrontFederation })
    this.humanShipyard = new Faction({ alliance: bases.humanShipyardAlliance, federation: bases.humanShipyardFederation })
    this.highElves = new Faction({ alliance: bases.highElvesAlliance, federation: bases.highElvesFederation })
    this.highElvesCreep = new Faction({ alliance: bases.highElvesCreepAlliance, federation: bases.highElvesCreepFederation })
    this.tree = new Faction({ alliance: bases.treeAlliance, federation: bases.treeFederation })
    this.nightElf = new Faction({ alliance: bases.nightElfAlliance, federation: bases.nightElfFederation })
    this.nightElfShipyard = new Faction({ alliance: bases.nightElfShipyardAlliance, federation: bases.nightElfShipyardFederation })
    this.merc = new Faction({ alliance: bases.mercAlliance, federation: bases.mercFederation })
    this.dwarf = new Faction({ alliance: bases.dwarfAlliance, federation: bases.dwarfFederation })
    this.dwarfCreep = new Faction({ alliance: bases.dwarfCreepAlliance, federation: bases.dwarfCreepFederation })
    this.naga = new Faction({ alliance: bases.nagaAlliance, federation: bases.nagaFederation })
    this.nagaCreep = new Faction({ alliance: bases.nagaCreepAlliance, federation: bases.nagaCreepFederation })
    this.murloc = new Faction({ alliance: bases.murlocAlliance, federation: bases.murlocFederation })
    this.orc = new Faction({ alliance: bases.orcAlliance, federation: bases.orcFederation })
    this.draenei = new Faction({ alliance: bases.draeneiAlliance, federation: bases.draeneiFederation })
    this.undead = new Faction({ alliance: bases.undeadAlliance, federation: bases.undeadFederation })
    this.wildhammer = new Faction({ alliance: bases.wildhammerAlliance, federation: bases.wildhammerFederation })
  }
}
