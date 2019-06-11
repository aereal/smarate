import { AuthenticationContext, getUserFromContext } from "../auth-context"
import { GetDB } from "../firebase"
import { Fighter } from "../model"
import { fetchFighterByID, fetchGlobalFightResults } from "../repo"

export const buildQueryResolver = (getDB: GetDB) => ({
  fightResults: async (_: any, args: { first: number }) => {
    const db = getDB()
    try {
      const dtos = await fetchGlobalFightResults(db, args.first)
      const conn = {
        nodes: dtos.map(dto => ({
          ...dto,
          recordedAt: dto.recordedAt.toDate(),
        })),
      }
      return conn
    } catch (e) {
      throw e
    }
  },
  fighter: async (_: any, args: { id: number }): Promise<Fighter | undefined> =>
    await fetchFighterByID(args.id),
  visitor: async (parent: any, args: any, context: AuthenticationContext) =>
    getUserFromContext(context),
})
