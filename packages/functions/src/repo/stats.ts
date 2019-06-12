import { FighterFightResult } from "../model"

type FighterID = number
type WinRateAggregate = Map<FighterID, number>

interface IntermediateStats {
  winCount: number
  totalMatches: number
}

const calculateStats = (
  fightResults: FighterFightResult[]
): Map<FighterID, IntermediateStats> => {
  const ret: Map<number, IntermediateStats> = new Map()
  for (const { won, rivalFighter } of fightResults) {
    const updated = ret.get(rivalFighter.id) || { winCount: 0, totalMatches: 0 }
    updated.totalMatches++
    if (won) {
      updated.winCount++
    }
    ret.set(rivalFighter.id, updated)
  }
  return ret
}

export const calculateWinRate = (
  fightResults: FighterFightResult[]
): WinRateAggregate => {
  const rates: Map<number, number> = new Map()
  for (const [fighterID, { winCount, totalMatches }] of calculateStats(
    fightResults
  ).entries()) {
    const rate = winCount / totalMatches
    rates.set(fighterID, rate)
  }
  return rates
}
