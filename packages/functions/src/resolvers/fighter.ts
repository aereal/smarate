import { GetDB } from "../firebase"
import { fetchFighterByID, fetchFighterFightResultsByFighterID } from "../repo"

export const buildFighterResolver = (getDB: GetDB) => ({
  fightResults: async (parent: { id: number }, args: { first: number }) => {
    const db = getDB()
    const results = await fetchFighterFightResultsByFighterID(
      db,
      parent.id,
      args.first
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
