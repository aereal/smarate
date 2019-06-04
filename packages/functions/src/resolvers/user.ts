import { fetchUserFightResults, fetchUserPreference } from "../repo"

export const buildUserResolver = (db: FirebaseFirestore.Firestore) => ({
  fightResults: async (_, args: { first: number }) => {
    try {
      const userFightResults = await fetchUserFightResults(db, args.first)
      return { nodes: userFightResults }
    } catch (e) {
      throw e
    }
  },
  preference: async (parent: { id: string }) => {
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
