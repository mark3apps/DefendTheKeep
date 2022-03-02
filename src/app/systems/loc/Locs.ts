/** @format */

import { ILocsDepend } from "./interfaces/ILocsDepend"
import { Loc } from "./loc"
import { ILocPair } from "./interfaces/ILocPair"
import { UnitType } from "app/classes"
import { Region, Unit, Order } from "lib/w3ts"

export class Locs {
  private static instance?: Locs

  static getInstance(depend: ILocsDepend) {
    if (!Locs.instance) Locs.instance = new Locs(depend)
    return Locs.instance
  }

  castle: ILocPair
  arcane: ILocPair
  start: ILocPair
  elf: ILocPair
  everything: ILocPair
  bottom: ILocPair
  middle: ILocPair
  top: ILocPair
  sArcane: ILocPair
  sArcaneHero: ILocPair
  sNightElf: ILocPair
  sCamp: ILocPair
  sHighCity: ILocPair
  sCityElf: ILocPair
  sCityFront: ILocPair
  sElementalTop: ILocPair
  sElementalBottom: ILocPair
  sElf: ILocPair
  sWildhammer: ILocPair
  sElfShipyard: ILocPair
  sHero: ILocPair
  sHumanShipyard: ILocPair
  sDraenei: ILocPair
  sMurloc: ILocPair
  sNaga: ILocPair
  sOrc: ILocPair
  sTree: ILocPair
  sDwarf: ILocPair
  sUndead: ILocPair
  cForest: ILocPair
  cForestMid: ILocPair
  cTides: ILocPair
  cDeath: ILocPair
  cStorm: ILocPair
  cRock: ILocPair

  constructor(depend: ILocsDepend) {
    const triggers = depend.triggers
    const armies = depend.armies
    const rects = depend.rects

    this.castle = {
      alliance: new Loc(depend, { rect: rects.Left_Hero }),
      federation: new Loc(depend, { rect: rects.Right_Hero }),
    }
    this.arcane = {
      alliance: new Loc(depend, { rect: rects.Left_Mage_Base, forward: [{ loc: this.castle.alliance, army: armies.Federation }] }),
      federation: new Loc(depend, { rect: rects.Right_Mage_Base, forward: [{ loc: this.castle.federation, army: armies.Alliance }] }),
    }
    this.start = {
      alliance: new Loc(depend, { rect: rects.Left_Start, forward: [{ loc: this.castle.alliance, army: armies.Federation }] }),
      federation: new Loc(depend, { rect: rects.Right_Start, forward: [{ loc: this.castle.federation, army: armies.Alliance }] }),
    }
    this.elf = {
      alliance: new Loc(depend, { rect: rects.Elf_Base_Left, forward: [{ loc: this.castle.alliance, army: armies.Federation }] }),
      federation: new Loc(depend, { rect: rects.Elf_Base_Right, forward: [{ loc: this.castle.federation, army: armies.Alliance }] }),
    }

    // Pathing Rects
    this.everything = {
      alliance: new Loc(depend, { rect: rects.Left_Everything, forward: [{ loc: this.castle.alliance, army: armies.Federation }] }),
      federation: new Loc(depend, { rect: rects.Right_Everything, forward: [{ loc: this.castle.federation, army: armies.Alliance }] }),
    }
    this.bottom = {
      alliance: new Loc(depend, { rect: rects.Left_Start_Bottom, forward: [{ loc: this.arcane.alliance, army: armies.Federation }] }),
      federation: new Loc(depend, { rect: rects.Right_Start_Bottom, forward: [{ loc: this.elf.federation, army: armies.Alliance }] }),
    }
    this.middle = {
      alliance: new Loc(depend, { rect: rects.Left_Start_Middle, forward: [{ loc: this.start.alliance, army: armies.Federation }] }),
      federation: new Loc(depend, { rect: rects.Right_Start_Middle, forward: [{ loc: this.start.federation, army: armies.Alliance }] }),
    }
    this.top = {
      alliance: new Loc(depend, { rect: rects.Left_Start_Top, forward: [{ loc: this.elf.alliance, army: armies.Federation }] }),
      federation: new Loc(depend, { rect: rects.Right_Start_Top, forward: [{ loc: this.arcane.federation, army: armies.Alliance }] }),
    }

    // Spawn Rects
    this.sArcane = {
      alliance: new Loc(depend, { rect: rects.Left_Arcane }),
      federation: new Loc(depend, { rect: rects.Right_Arcane }),
    }
    this.sArcaneHero = {
      alliance: new Loc(depend, { rect: rects.Arcane_Hero_Left }),
      federation: new Loc(depend, { rect: rects.Arcane_Hero_Right }),
    }
    this.sCamp = {
      alliance: new Loc(depend, { rect: rects.Camp_Bottom }),
      federation: new Loc(depend, { rect: rects.Camp_Top }),
    }
    this.sHighCity = {
      alliance: new Loc(depend, { rect: rects.Blacksmith_Left }),
      federation: new Loc(depend, { rect: rects.Blacksmith_Right }),
    }
    this.sCityElf = {
      alliance: new Loc(depend, { rect: rects.City_Elves_Left }),
      federation: new Loc(depend, { rect: rects.City_Elves_Right }),
    }
    this.sCityFront = {
      alliance: new Loc(depend, { rect: rects.Front_Town_Left, forward: [{ loc: this.middle.federation, army: armies.Alliance }] }),
      federation: new Loc(depend, { rect: rects.Front_City_Right, forward: [{ loc: this.middle.alliance, army: armies.Federation }] }),
    }
    this.sElementalTop = {
      alliance: new Loc(depend, { rect: rects.Arcane_Left_Top }),
      federation: new Loc(depend, { rect: rects.Arcane_Right_Top }),
    }
    this.sElementalBottom = {
      alliance: new Loc(depend, { rect: rects.Arcane_Left_Bottom }),
      federation: new Loc(depend, { rect: rects.Arcane_Right_Bottom }),
    }
    this.sElf = {
      alliance: new Loc(depend, { rect: rects.Left_High_Elves }),
      federation: new Loc(depend, { rect: rects.Right_High_Elves }),
    }
    this.sElfShipyard = {
      alliance: new Loc(depend, { rect: rects.Left_Shipyard }),
      federation: new Loc(depend, { rect: rects.Right_Shipyard }),
    }
    this.sHero = {
      alliance: new Loc(depend, { rect: rects.Left_Hero }),
      federation: new Loc(depend, { rect: rects.Right_Hero }),
    }
    this.sHumanShipyard = {
      alliance: new Loc(depend, { rect: rects.Human_Shipyard_Left }),
      federation: new Loc(depend, { rect: rects.Human_Shipyard_Right }),
    }
    this.sDraenei = {
      alliance: new Loc(depend, { rect: rects.Draenei_Left }),
      federation: new Loc(depend, { rect: rects.Draenei_Right }),
    }
    this.sMurloc = {
      alliance: new Loc(depend, { rect: rects.Murloc_Spawn_Left }),
      federation: new Loc(depend, { rect: rects.Murloc_Spawn_Right }),
    }
    this.sNaga = {
      alliance: new Loc(depend, { rect: rects.Naga_Left }),
      federation: new Loc(depend, { rect: rects.Naga_Right }),
    }
    this.sOrc = {
      alliance: new Loc(depend, { rect: rects.Left_Orc }),
      federation: new Loc(depend, { rect: rects.Right_Orc }),
    }
    this.sTree = {
      alliance: new Loc(depend, { rect: rects.Left_Tree }),
      federation: new Loc(depend, { rect: rects.Right_Tree }),
    }
    this.sNightElf = {
      alliance: new Loc(depend, { rect: rects.Night_Elf_Left }),
      federation: new Loc(depend, { rect: rects.Night_Elf_Right }),
    }
    this.sDwarf = {
      alliance: new Loc(depend, { rect: rects.Left_Workshop }),
      federation: new Loc(depend, { rect: rects.Right_Workshop }),
    }
    this.sUndead = {
      alliance: new Loc(depend, { rect: rects.Undead_Left }),
      federation: new Loc(depend, { rect: rects.Undead_Right }),
    }
    this.sWildhammer = {
      alliance: new Loc(depend, { rect: rects.wildhammerLeft }),
      federation: new Loc(depend, { rect: rects.wildhammerRight }),
    }

    // Creep Rects
    this.cForest = {
      alliance: new Loc(depend, { rect: rects.Aspect_of_Forest_Left, forward: [{ loc: this.top.federation, army: armies.Alliance }] }),
      federation: new Loc(depend, { rect: rects.Aspect_of_Forest_Right, forward: [{ loc: this.bottom.alliance, army: armies.Federation }] }),
    }
    this.cForestMid = {
      alliance: new Loc(depend, { rect: rects.Aspect_of_Forest_Left_Mid, forward: [{ loc: this.cForest.alliance, army: armies.Alliance }] }),
      federation: new Loc(depend, { rect: rects.Aspect_of_Forest_Right_Mid, forward: [{ loc: this.cForest.federation, army: armies.Federation }] }),
    }
    this.cTides = {
      alliance: new Loc(depend, { rect: rects.Murloc_Left, forward: [{ loc: this.top.federation, army: armies.Alliance }] }),
      federation: new Loc(depend, { rect: rects.Murloc_Right, forward: [{ loc: this.bottom.alliance, army: armies.Federation }] }),
    }
    this.cDeath = {
      alliance: new Loc(depend, { rect: rects.Zombie_End_Left, forward: [{ loc: this.middle.federation, army: armies.Alliance }] }),
      federation: new Loc(depend, { rect: rects.Zombie_End_Right, forward: [{ loc: this.middle.alliance, army: armies.Federation }] }),
    }
    this.cStorm = {
      alliance: new Loc(depend, { rect: rects.Left_Elemental_Start, forward: [{ loc: this.bottom.federation, army: armies.Alliance }] }),
      federation: new Loc(depend, { rect: rects.Right_Elemental_Start, forward: [{ loc: this.top.alliance, army: armies.Federation }] }),
    }
    this.cRock = {
      alliance: new Loc(depend, { rect: rects.Rock_Left, forward: [{ loc: this.bottom.federation, army: armies.Alliance }] }),
      federation: new Loc(depend, { rect: rects.Rock_Right, forward: [{ loc: this.top.alliance, army: armies.Federation }] }),
    }

    // Unit Enters a Loc Forwarding Region
    triggers.unitEntersRegion.addAction(() => {
      const eventRegion = Region.fromEvent()
      const eventLoc = Loc.get(eventRegion)

      if (eventLoc != null) {
        const eventUnit = Unit.fromEvent()
        if (UnitType.order.has(eventUnit.typeId)) {
          for (let i = 0; i < eventLoc.forward.length; i++) {
            const element = eventLoc.forward[i]

            if (eventUnit.inForce(element.army.force)) {
              const dest = element.loc.randomCoordinate

              eventUnit.issueCoordinateOrder(Order.Attack, dest)
            }
          }
        }
      }
    })
  }
}
