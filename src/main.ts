
// const BUILD_DATE = compiletime(() => new Date().toUTCString())
// const TS_VERSION = compiletime(() => require("typescript").version)
// const TSTL_VERSION = compiletime(() => require("typescript-to-lua").version)

import { Logger, LogLevel } from 'app/log'
import { Game } from 'app/game'
import { Timer, addScriptHook, W3TS_HOOK } from 'lib/w3ts/index'

const tsMain = () => {
	// Run at map Init
	try {
		Game.init()
	} catch (e) {
		Logger.Fatal("Game.init()", e)
	}

	// Run at Game Start
	const mapStart = new Timer()
	mapStart.start(0.1, false, () => {
		try {
			Logger.Level = LogLevel.Debug
			Game.start()
		} catch (e) {
			Logger.Fatal("Game.start()", e)
		}
	})
}

addScriptHook(W3TS_HOOK.MAIN_AFTER, tsMain)
