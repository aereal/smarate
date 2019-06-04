import { FightResult } from "../model"

export const buildFightResultResolver = () => ({
  recordedAt: (parent: FightResult) => parent.recordedAt.toISOString(),
})
