import { GetDB } from "../firebase"
import { fetchUserFightResults, fetchUserPreference } from "../repo"

export const buildUserResolver = (getDB: GetDB) => ({
  fightResults: async (_: any, args: { first: number }) => {
    const db = getDB()
    try {
      const userFightResults = await fetchUserFightResults(db, args.first)
      return { nodes: userFightResults }
    } catch (e) {
      throw e
    }
  },
  preference: async (parent: { id: string }) => {
    const db = getDB()
    try {
      const pref = await fetchUserPreference(db, parent.id)
      if (pref === undefined) {
        return null
      }
      return pref
    } catch (e) {
      return null
    }
  },
})
