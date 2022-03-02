import { TalentData } from '../Models/Talent'

export interface ITalentBuilder {
    NextRank: (next: TalentData) => ITalentBuilder
}
