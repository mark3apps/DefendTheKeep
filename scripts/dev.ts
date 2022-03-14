/** @format */

import * as fs from "fs-extra"
import { loadJsonFile, logger } from "./utils"

const types: { [name: string]: string } = {
  cam: "camerasetup",
  dest: "destructable",
  item: "item",
  rct: "rect",
  snd: "sound",
  trg: "trigger",
  unit: "unit",
  grp: "group",
  force: "force",
  timer: "timer",
  boolean: "boolean",
}

const typesReverse: { [name: string]: string } = {
  camerasetup: "cam",
  destructable: "dest",
  item: "item",
  rect: "rct",
  sound: "snd",
  trigger: "trg",
  unit: "unit",
  group: "grp",
  force: "force",
  timer: "timer",
  boolean: "boolean",
}

export class War3TSTLHelper {
  contents: string
  varTypes: { [name: string]: string } = {}

  constructor(luaCode: string) {
    this.contents = luaCode
  }

  genTSDefinitions(): string {
    const lines = this.contents.split("\n")

    let output = ""

    lines.forEach((line) => {
      line = line.replace(/\s+/g, "")

      if (line.startsWith("gg_")) {
        const parts = line.split("_", 2)

        if (parts && parts.length >= 2) {
          let type = types[parts[1]]
          const name = line.indexOf("=") != -1 ? line.split("=")[0] : line

          // Generated sound variables can be strings as well as sounds
          if (type === "sound" && line.indexOf(`"`) !== -1) {
            type = "string"
          }

          if (name in this.varTypes == false) {
            output += `declare const ${name}: ${type};\n`

            this.varTypes[name] = type
          }
        }
      } else if (line.startsWith("udg_")) {
        const parts = line.split("_", 2)

        if (parts && parts.length >= 2) {
          let type = types[parts[1]]
          const name = line.indexOf("=") != -1 ? line.split(/(?:\[i\])?=/g)[0] : line

          // Generated sound variables can be strings as well as sounds
          if (type === "sound" && line.indexOf(`"`) !== -1) {
            type = "string"
          }

          if (name in this.varTypes == false && type != undefined) {
            output += `declare let ${name}: ${type};\n`

            this.varTypes[name] = type
          }
        }
      }
    })

    return output
  }

  getGlobals(): string {
    if (!this.contents) return ""
    const source = this.contents.match(/function InitGlobals\(\).+?(?=\nend)/gs)
    if (!source) return ""
    const lines = source[0].split("\n")
    let output = ""

    lines.forEach((line) => {
      line = line.replace(/\s+/g, "")

      if (line.startsWith("udg_")) {
        const parts = line.split(/(?:\[(?:[0-9]|[A-z])+\])?=/g, 2)

        if (parts.length >= 2) {
          const name = line.indexOf("=") != -1 ? parts[0] : line
          let type = ""

          switch (parts[1]) {
            case "CreateForce()":
              type = "force"
              break
            case "CreateGroup()":
              type = "group"
              break
            case "CreateTimer()":
              type = "group"
              break
            default:
              if (parts[1].match(/(true|false)/g) != null) {
                type = "boolean"
              } else if (parts[1].match(/[0-9]\.?[0-9]?/g) != null) {
                type = "number"
              }

              break
          }

          const extra = line.match(/\[(?:[0-9]|[A-z])+\]/g) != null ? "[]" : ""

          if (name in this.varTypes == false && type != "") {
            output += `declare let ${name}: ${type}${extra};\n`

            this.varTypes[name] = type
          }
        }
      }
    })
    return output
  }

  getDefinitions(source: string, filterType: string, searchValue: { [Symbol.replace](string: string, replaceValue: string): string }, replaceClass: string) {
    try {
      const definitions = fs.readFileSync("src/war3map.d.ts", "utf8")
      const lines = definitions.split("\n")
      let defineText = ""
      let staticText = ""

      lines.forEach((line) => {
        line = line.replace(/(;|:)/g, "")
        const parts = line.split(" ")

        if (parts.length >= 2 && parts[1] == "const") {
          const varName = parts[2]
          const varType = parts[3]

          if (filterType == varType) {
            const shortName = varName.replace(`gg_${typesReverse[varType]}_`, "")

            staticText += `  ${shortName}: ${replaceClass}\n`
            defineText += `    this.${shortName} = ${replaceClass}.fromHandle(${varName})\n`
          }
        }
      })

      const outputFull = `/// AUTO DEFINE\n${staticText}\n  private constructor() {\n${defineText}  }\n  /// AUTO DEFINE`

      const unitPath = source
      const unitData = fs.readFileSync(unitPath, "utf8")
      const newUnitData = unitData.replace(/\/\/\/ AUTO DEFINE(.){0,}\/\/\/ AUTO DEFINE/gs, outputFull)
      return newUnitData
    } catch (error) {
      logger.error(error.toString())
    }
    return ""
  }
}

const config = loadJsonFile("config.json")

// Create definitions file for generated globals
const luaFile = `./maps/${config.mapFolder}/war3map.lua`

try {
  const contents = fs.readFileSync(luaFile, "utf8")
  const parser = new War3TSTLHelper(contents)
  const result = `${parser.getGlobals()}${parser.genTSDefinitions()}`
  fs.writeFileSync("src/war3map.d.ts", result)

  const resultUnit = parser.getDefinitions("src/app/define/units/Units.ts", "unit", /gg_unit_/g, "Unit")
  const resultRect = parser.getDefinitions("src/app/define/rectangles/Rectangles.ts", "rect", /gg_rct_/g, "Rectangle")
  const resultCam = parser.getDefinitions("src/app/define/cameraSetups/CameraSetups.ts", "camerasetup", /gg_cam_/g, "CameraSetup")
  const resultTrig = parser.getDefinitions("src/app/define/triggers/Triggers.ts", "trigger", /gg_trg_/g, "Trigger")
  fs.writeFileSync("src/app/define/units/Units.ts", resultUnit)
  fs.writeFileSync("src/app/define/rectangles/Rectangles.ts", resultRect)
  fs.writeFileSync("src/app/define/cameraSetups/CameraSetups.ts", resultCam)
  fs.writeFileSync("src/app/define/triggers/Triggers.ts", resultTrig)
} catch (err) {
  logger.error(err.toString())
  logger.error(`There was an error generating the definition file for '${luaFile}'`)
}
