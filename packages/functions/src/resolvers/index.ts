import { buildFightResultResolver } from "./fight-result"
import { buildMutationResolver } from "./mutation"
import { buildQueryResolver } from "./query"
import { buildUserResolver } from "./user"

export const buildResolver = (db: FirebaseFirestore.Firestore) => ({
  FightResult: buildFightResultResolver(),
  Mutation: buildMutationResolver(db),
  Query: buildQueryResolver(db),
  User: buildUserResolver(db),
})
