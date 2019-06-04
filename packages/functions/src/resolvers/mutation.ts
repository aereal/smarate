import { AuthenticationContext, getUserFromContext } from "../auth-context"
import { recordFightResult, setUserPreference } from "../repo"

export const buildMutationResolver = (db: FirebaseFirestore.Firestore) => ({
  recordResult: async (
    parent,
    args: { myFighterID: number; rivalFighterID: number; won: boolean },
    context: AuthenticationContext
  ) => {
    const currentUser = await getUserFromContext(context)
    if (currentUser === null) {
      throw new Error("unauthenticated")
    }

    try {
      await recordFightResult(db, {
        myFighter: { id: args.myFighterID },
        rivalFighter: { id: args.rivalFighterID },
        userID: currentUser.id,
        won: args.won,
      })
      return true
    } catch (e) {
      console.error(`failed to write: ${e}`) // tslint:disable-line:no-console
      return false
    }
  },
  setPreference: async (
    parent,
    args: { defaultFighterID?: number },
    context: AuthenticationContext
  ) => {
    if (args.defaultFighterID === undefined) {
      return false
    }
    const user = await getUserFromContext(context)
    if (user === null) {
      throw new Error("unauthenticated")
    }

    try {
      return await setUserPreference(db, {
        defaultFighterID: args.defaultFighterID,
        userID: user.id,
      })
    } catch (e) {
      return false
    }
  },
})
