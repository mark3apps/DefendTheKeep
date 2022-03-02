/** @format */

import { Base } from "../../systems/base/base"
import { Faction } from "../../systems/faction/faction"
import { IBasesDepend } from "./IBasesDepend"

export class Bases {
  private static instance?: Bases

  static getInstance(depend: IBasesDepend) {
    if (!Bases.instance) Bases.instance = new Bases(depend)
    return Bases.instance
  }

  arcaneAlliance
  arcaneFederation
  arcaneCreepAlliance
  arcaneCreepFederation
  arcaneHeroAlliance
  arcaneHeroFederation
  arcaneTopAlliance
  arcaneTopFederation
  arcaneBottomAlliance
  arcaneBottomFederation
  castleAlliance
  castleFederation
  highCityAlliance
  highCityFederation
  cityElvesAlliance
  cityElvesFederation
  cityFrontAlliance
  cityFrontFederation
  humanShipyardAlliance
  humanShipyardFederation
  highElvesAlliance
  highElvesFederation
  highElvesCreepAlliance
  highElvesCreepFederation
  treeAlliance
  treeFederation
  nightElfAlliance
  nightElfFederation
  nightElfShipyardAlliance
  nightElfShipyardFederation
  mercAlliance
  mercFederation
  dwarfAlliance
  dwarfFederation
  dwarfCreepAlliance
  dwarfCreepFederation
  nagaAlliance
  nagaFederation
  nagaCreepAlliance
  nagaCreepFederation
  murlocAlliance
  murlocFederation
  orcAlliance
  orcFederation
  draeneiAlliance
  draeneiFederation
  undeadAlliance
  undeadFederation
  wildhammerAlliance
  wildhammerFederation

  constructor(depend: IBasesDepend) {
    const units = depend.units
    const armies = depend.armies
    const locs = depend.locs

    this.arcaneAlliance = new Base({
      base: units.h003_0015,
      army: armies.Alliance,
      start: locs.arcane.alliance,
      end: locs.bottom.federation,
      importance: 4,
      update: true,
      teleport: true,
      healing: true,
    })
    this.arcaneFederation = new Base({
      base: units.h003_0007,
      army: armies.Federation,
      start: locs.arcane.federation,
      end: locs.top.alliance,
      importance: 4,
      update: true,
      teleport: true,
      healing: true,
    })

    this.arcaneCreepAlliance = new Base({
      base: units.h003_0015,
      army: armies.Alliance,
      start: locs.sArcane.alliance,
      end: locs.cStorm.alliance,
      importance: 1,
      update: false,
      teleport: false,
      healing: false,
    })
    this.arcaneCreepFederation = new Base({
      base: units.h003_0007,
      army: armies.Federation,
      start: locs.sArcane.federation,
      end: locs.cStorm.federation,
      importance: 1,
      update: false,
      teleport: false,
      healing: false,
    })

    this.arcaneHeroAlliance = new Base({
      base: units.h014_0017,
      army: armies.Alliance,
      start: locs.sArcaneHero.alliance,
      end: locs.bottom.federation,
      importance: 2,
      update: true,
      teleport: true,
      healing: false,
    })
    this.arcaneHeroFederation = new Base({
      base: units.h014_0158,
      army: armies.Federation,
      start: locs.sArcaneHero.federation,
      end: locs.top.alliance,
      importance: 2,
      update: true,
      teleport: true,
      healing: false,
    })

    this.arcaneTopAlliance = new Base({
      base: units.hars_0355,
      army: armies.Alliance,
      start: locs.sElementalTop.alliance,
      end: locs.bottom.federation,
      importance: 2,
      update: true,
      teleport: true,
      healing: false,
    })
    this.arcaneTopFederation = new Base({
      base: units.hars_0293,
      army: armies.Federation,
      start: locs.sElementalTop.federation,
      end: locs.top.alliance,
      importance: 2,
      update: true,
      teleport: true,
      healing: false,
    })

    this.arcaneBottomAlliance = new Base({
      base: units.hars_0292,
      army: armies.Alliance,
      start: locs.sElementalBottom.alliance,
      end: locs.bottom.federation,
      importance: 2,
      update: true,
      teleport: true,
      healing: true,
    })
    this.arcaneBottomFederation = new Base({
      base: units.hars_0303,
      army: armies.Federation,
      start: locs.sElementalBottom.federation,
      end: locs.top.alliance,
      importance: 2,
      update: true,
      teleport: true,
      healing: true,
    })

    this.castleAlliance = new Base({
      base: units.h00E_0033,
      army: armies.Alliance,
      start: locs.sHero.alliance,
      end: locs.everything.federation,
      importance: 6,
      update: true,
      teleport: true,
      healing: true,
    })
    this.castleFederation = new Base({
      base: units.h00E_0081,
      army: armies.Federation,
      start: locs.sHero.federation,
      end: locs.everything.alliance,
      importance: 6,
      update: true,
      teleport: true,
      healing: true,
    })

    this.highCityAlliance = new Base({
      base: units.n00K_0802,
      army: armies.Alliance,
      start: locs.sHighCity.alliance,
      end: locs.cDeath.alliance,
      importance: 2,
      update: true,
      teleport: true,
      healing: true,
    })
    this.highCityFederation = new Base({
      base: units.n00K_0477,
      army: armies.Federation,
      start: locs.sHighCity.federation,
      end: locs.cDeath.federation,
      importance: 2,
      update: true,
      teleport: true,
      healing: true,
    })

    this.cityElvesAlliance = new Base({
      base: units.hvlt_0207,
      army: armies.Alliance,
      start: locs.sCityElf.alliance,
      end: locs.everything.federation,
      importance: 2,
      update: true,
      teleport: true,
      healing: true,
    })
    this.cityElvesFederation = new Base({
      base: units.hvlt_0406,
      army: armies.Federation,
      start: locs.sCityElf.federation,
      end: locs.everything.alliance,
      importance: 2,
      update: true,
      teleport: true,
      healing: true,
    })

    this.cityFrontAlliance = new Base({
      base: units.h01S_0553,
      army: armies.Alliance,
      start: locs.sCityFront.alliance,
      end: locs.middle.federation,
      importance: 3,
      update: true,
      teleport: true,
      healing: true,
    })
    this.cityFrontFederation = new Base({
      base: units.h01S_0352,
      army: armies.Federation,
      start: locs.sCityFront.federation,
      end: locs.middle.alliance,
      importance: 3,
      update: true,
      teleport: true,
      healing: true,
    })

    this.humanShipyardAlliance = new Base({
      base: units.hshy_0011,
      army: armies.Alliance,
      start: locs.sHumanShipyard.alliance,
      end: locs.sHumanShipyard.federation,
      importance: 1,
      update: true,
      teleport: true,
      healing: true,
    })
    this.humanShipyardFederation = new Base({
      base: units.hshy_0212,
      army: armies.Federation,
      start: locs.sHumanShipyard.federation,
      end: locs.sHumanShipyard.alliance,
      importance: 1,
      update: true,
      teleport: true,
      healing: true,
    })

    this.highElvesAlliance = new Base({
      base: units.nheb_0109,
      army: armies.Alliance,
      start: locs.sElf.alliance,
      end: locs.top.federation,
      importance: 4,
      update: true,
      teleport: true,
      healing: true,
    })
    this.highElvesFederation = new Base({
      base: units.nheb_0036,
      army: armies.Federation,
      start: locs.sElf.federation,
      end: locs.bottom.alliance,
      importance: 4,
      update: true,
      teleport: true,
      healing: true,
    })

    this.highElvesCreepAlliance = new Base({
      base: units.nheb_0109,
      army: armies.Alliance,
      start: locs.sElf.alliance,
      end: locs.cForestMid.alliance,
      importance: 1,
      update: false,
      teleport: false,
      healing: false,
    })
    this.highElvesCreepFederation = new Base({
      base: units.nheb_0036,
      army: armies.Federation,
      start: locs.sElf.federation,
      end: locs.cForestMid.federation,
      importance: 1,
      update: false,
      teleport: false,
      healing: false,
    })

    this.treeAlliance = new Base({
      base: units.e003_0058,
      army: armies.Alliance,
      start: locs.sTree.alliance,
      end: locs.top.federation,
      importance: 1,
      update: true,
      teleport: true,
      healing: false,
    })
    this.treeFederation = new Base({
      base: units.e003_0014,
      army: armies.Federation,
      start: locs.sTree.federation,
      end: locs.bottom.alliance,
      importance: 1,
      update: true,
      teleport: true,
      healing: false,
    })

    this.nightElfAlliance = new Base({
      base: units.edob_0315,
      army: armies.Alliance,
      start: locs.sNightElf.alliance,
      end: locs.top.federation,
      importance: 1,
      update: true,
      teleport: true,
      healing: false,
    })
    this.nightElfFederation = new Base({
      base: units.edob_0304,
      army: armies.Federation,
      start: locs.sNightElf.federation,
      end: locs.bottom.alliance,
      importance: 1,
      update: true,
      teleport: true,
      healing: false,
    })

    this.nightElfShipyardAlliance = new Base({
      base: units.eshy_0120,
      army: armies.Alliance,
      start: locs.sElfShipyard.alliance,
      end: locs.sHumanShipyard.federation,
      importance: 1,
      update: true,
      teleport: true,
      healing: true,
    })
    this.nightElfShipyardFederation = new Base({
      base: units.eshy_0047,
      army: armies.Federation,
      start: locs.sElfShipyard.federation,
      end: locs.sHumanShipyard.alliance,
      importance: 1,
      update: true,
      teleport: true,
      healing: true,
    })

    this.mercAlliance = new Base({
      base: units.n001_0048,
      army: armies.Alliance,
      start: locs.sCamp.alliance,
      end: locs.bottom.federation,
      importance: 2,
      update: true,
      teleport: true,
      healing: false,
    })
    this.mercFederation = new Base({
      base: units.n001_0049,
      army: armies.Federation,
      start: locs.sCamp.federation,
      end: locs.top.alliance,
      importance: 2,
      update: true,
      teleport: true,
      healing: false,
    })

    this.dwarfAlliance = new Base({
      base: units.h006_0074,
      army: armies.Alliance,
      start: locs.sDwarf.alliance,
      end: locs.bottom.federation,
      importance: 3,
      update: true,
      teleport: true,
      healing: true,
    })
    this.dwarfFederation = new Base({
      base: units.h006_0055,
      army: armies.Federation,
      start: locs.sDwarf.federation,
      end: locs.top.alliance,
      importance: 3,
      update: true,
      teleport: true,
      healing: true,
    })

    this.dwarfCreepAlliance = new Base({
      base: units.h006_0074,
      army: armies.Alliance,
      start: locs.sDwarf.alliance,
      end: locs.cRock.alliance,
      importance: 1,
      update: false,
      teleport: false,
      healing: false,
    })
    this.dwarfCreepFederation = new Base({
      base: units.h006_0055,
      army: armies.Federation,
      start: locs.sDwarf.federation,
      end: locs.cRock.federation,
      importance: 1,
      update: false,
      teleport: false,
      healing: false,
    })

    this.nagaAlliance = new Base({
      base: units.nntt_0135,
      army: armies.Alliance,
      start: locs.sNaga.alliance,
      end: locs.top.federation,
      importance: 3,
      update: true,
      teleport: true,
      healing: true,
    })
    this.nagaFederation = new Base({
      base: units.nntt_0132,
      army: armies.Federation,
      start: locs.sNaga.federation,
      end: locs.bottom.alliance,
      importance: 3,
      update: true,
      teleport: true,
      healing: true,
    })

    this.nagaCreepAlliance = new Base({
      base: units.nntt_0135,
      army: armies.Alliance,
      start: locs.sNaga.alliance,
      end: locs.cTides.alliance,
      importance: 1,
      update: false,
      teleport: false,
      healing: false,
    })
    this.nagaCreepFederation = new Base({
      base: units.nntt_0132,
      army: armies.Federation,
      start: locs.sNaga.federation,
      end: locs.cTides.federation,
      importance: 1,
      update: false,
      teleport: false,
      healing: false,
    })

    this.murlocAlliance = new Base({
      base: units.nmh1_0735,
      army: armies.Alliance,
      start: locs.sMurloc.alliance,
      end: locs.top.federation,
      importance: 2,
      update: true,
      teleport: true,
      healing: true,
    })
    this.murlocFederation = new Base({
      base: units.nmh1_0783,
      army: armies.Federation,
      start: locs.sMurloc.federation,
      end: locs.bottom.alliance,
      importance: 2,
      update: true,
      teleport: true,
      healing: true,
    })

    this.orcAlliance = new Base({
      base: units.o001_0075,
      army: armies.Alliance,
      start: locs.sOrc.alliance,
      end: locs.top.federation,
      importance: 1,
      update: true,
      teleport: true,
      healing: true,
    })
    this.orcFederation = new Base({
      base: units.o001_0078,
      army: armies.Federation,
      start: locs.sOrc.federation,
      end: locs.bottom.alliance,
      importance: 1,
      update: true,
      teleport: true,
      healing: true,
    })

    this.draeneiAlliance = new Base({
      base: units.ndh2_0359,
      army: armies.Alliance,
      start: locs.sDraenei.alliance,
      end: locs.top.federation,
      importance: 2,
      update: true,
      teleport: true,
      healing: true,
    })
    this.draeneiFederation = new Base({
      base: units.ndh2_0876,
      army: armies.Federation,
      start: locs.sDraenei.federation,
      end: locs.bottom.alliance,
      importance: 2,
      update: true,
      teleport: true,
      healing: true,
    })

    this.undeadAlliance = new Base({
      base: units.u001_0097,
      army: armies.Alliance,
      start: locs.sUndead.alliance,
      end: locs.middle.federation,
      importance: 1,
      update: true,
      teleport: true,
      healing: true,
    })
    this.undeadFederation = new Base({
      base: units.u001_0098,
      army: armies.Federation,
      start: locs.sUndead.federation,
      end: locs.middle.alliance,
      importance: 1,
      update: true,
      teleport: true,
      healing: true,
    })

    this.wildhammerAlliance = new Base({
      base: units.h01X_0707,
      army: armies.Alliance,
      start: locs.sWildhammer.alliance,
      end: locs.bottom.federation,
      importance: 1,
      update: true,
      teleport: true,
      healing: true,
    })
    this.wildhammerFederation = new Base({
      base: units.h01X_0750,
      army: armies.Federation,
      start: locs.sWildhammer.federation,
      end: locs.top.alliance,
      importance: 1,
      update: true,
      teleport: true,
      healing: true,
    })
  }
}
