import { fetchFighterByID } from "../repo"

export const buildFighterResolver = () => ({
  name: async (parent: { id: number }) => {
    const got = await fetchFighterByID(parent.id)
    if (!got) {
      return null
    }
    return got.name
  },
})
