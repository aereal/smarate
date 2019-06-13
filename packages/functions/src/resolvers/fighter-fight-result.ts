import { Timestamp } from "@google-cloud/firestore"

export const buildFighterFightResultResolver = () => ({
  recordedAt: (parent: { recordedAt: Timestamp }) => parent.recordedAt.toDate(),
})
