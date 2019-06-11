import { FightResult } from "../model"

export const buildGlobalFightResultResolver = () => ({
  recordedAt: (parent: FightResult) => parent.recordedAt.toISOString(),
})
