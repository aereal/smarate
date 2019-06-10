import { GetDB } from "../firebase"
import { buildFightResultResolver } from "./fight-result"
import { buildFighterResolver } from "./fighter"
import { buildMutationResolver } from "./mutation"
import { buildQueryResolver } from "./query"
import { buildUserResolver } from "./user"

export const buildResolver = (getDB: GetDB) => ({
  FightResult: buildFightResultResolver(),
  Fighter: buildFighterResolver(),
  Mutation: buildMutationResolver(getDB),
  Query: buildQueryResolver(getDB),
  User: buildUserResolver(getDB),
})
