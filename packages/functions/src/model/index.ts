import { Timestamp } from "@google-cloud/firestore"

export interface Fighter {
  id: number
  name: LocalizedName
}

export interface LocalizedName {
  ja: string
}

export interface FightResult {
  wonFighter: Fighter
  lostFighter: Fighter
  recordedAt: Date
}

export interface FighterFightResult {
  myFighter: { id: number }
  rivalFighter: { id: number }
  recordedAt: Timestamp
  won: boolean
}
