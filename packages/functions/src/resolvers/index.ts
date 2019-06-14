import { GetDB } from "../firebase"
import { DateTime } from "./date-time"
import { buildFighterResolver } from "./fighter"
import { buildFighterFightResultResolver } from "./fighter-fight-result"
import { buildFighterFightResultConnection } from "./fighter-fight-result-connection"
import { buildGlobalFightResultResolver } from "./global-fight-result"
import { buildMutationResolver } from "./mutation"
import { buildQueryResolver } from "./query"
import { buildUserResolver } from "./user"

export const buildResolver = (getDB: GetDB) => ({
  DateTime,
  Fighter: buildFighterResolver(getDB),
  FighterFightResult: buildFighterFightResultResolver(),
  FighterFightResultConnection: buildFighterFightResultConnection(),
  GlobalFightResult: buildGlobalFightResultResolver(),
  Mutation: buildMutationResolver(getDB),
  Query: buildQueryResolver(getDB),
  User: buildUserResolver(getDB),
})
