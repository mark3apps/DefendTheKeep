import { Triggers } from 'app/define/triggers/triggers'
import { ArcTagEngine } from '..'

export interface IDamageEngineDepend {
	triggers: Triggers,
	arcTagEngine: ArcTagEngine
}
