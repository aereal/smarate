import { FighterFightResult } from "../model"

export const buildFighterFightResultConnection = () => ({
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
