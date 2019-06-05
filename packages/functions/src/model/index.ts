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
