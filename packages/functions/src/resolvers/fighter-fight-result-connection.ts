import { FighterFightResult } from "../model"
import { calculateWinRate } from "../repo"

export const buildFighterFightResultConnection = () => ({
  mostWonFighters: (parent: { nodes: FighterFightResult[] }) => {
    const rates = calculateWinRate(parent.nodes)
    return {
      nodes: Array.from(rates.entries()).map(([rivalFighterID, rate]) => ({
        rivalFighter: { id: rivalFighterID },
        winRatio: rate,
      })),
    }
  },
  winRatio: (parent: { nodes: FighterFightResult[] }) => {
    let wins = 0
    for (const result of parent.nodes) {
      if (result.won) {
        wins++
      }
    }
    return wins / parent.nodes.length
  },
})
