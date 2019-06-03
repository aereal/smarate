export interface Fighter {
  id: number
  // name: string
}

export interface FightResult {
  wonFighter: Fighter
  lostFighter: Fighter
  recordedAt: Date
}
