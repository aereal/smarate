import { GetDB } from "../firebase"
import { fetchFighterByID, fetchFighterFightResultsByFighterID } from "../repo"

export const buildFighterResolver = (getDB: GetDB) => ({
  fightResults: async (
    parent: { id: number },
    args: { first: number; startsAt: Date | null; endsAt: Date | null }
  ) => {
    const db = getDB()
    const results = await fetchFighterFightResultsByFighterID(
      db,
      parent.id,
      args.first,
      args.startsAt,
      args.endsAt
    )
    return { nodes: results }
  },
  name: async (parent: { id: number }) => {
    const got = await fetchFighterByID(parent.id)
    if (!got) {
      return null
    }
    return got.name
  },
})
