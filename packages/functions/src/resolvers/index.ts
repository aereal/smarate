import { GetDB } from "../firebase"
import { buildFightResultResolver } from "./fight-result"
import { buildFighterResolver } from "./fighter"
import { buildFighterFightResultResolver } from "./fighter-fight-result"
import { buildFighterFightResultConnection } from "./fighter-fight-result-connection"
import { buildMutationResolver } from "./mutation"
import { buildQueryResolver } from "./query"
import { buildUserResolver } from "./user"

export const buildResolver = (getDB: GetDB) => ({
  FightResult: buildFightResultResolver(),
  Fighter: buildFighterResolver(getDB),
  FighterFightResult: buildFighterFightResultResolver(),
  FighterFightResultConnection: buildFighterFightResultConnection(),
  Mutation: buildMutationResolver(getDB),
  Query: buildQueryResolver(getDB),
  User: buildUserResolver(getDB),
})
