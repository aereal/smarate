import { ApolloServer } from "apollo-server-cloud-functions"
import { ContextFunction } from "apollo-server-core"
import admin from "firebase-admin"
import { readFileSync } from "fs"
import { parse } from "graphql"
import { IncomingMessage } from "http"
import { resolve } from "path"
import { db } from "./firebase"
import { FightResult } from "./model"
import {
  fetchGlobalFightResults,
  fetchUserFightResults,
  fetchUserPreference,
  recordFightResult,
  setUserPreference,
} from "./repo"

const rawSchema = readFileSync(resolve(__dirname, "../schema.graphql"))
const typeDefs = parse(rawSchema.toString())

interface AuthenticationContext {
  token?: string
}

const withAuthenticationContext: ContextFunction<
  { req: IncomingMessage },
  AuthenticationContext
> = ({ req }) => {
  const {
    headers: { authorization },
  } = req
  if (authorization === undefined) {
    return {}
  }
  const [_, token] = authorization.split(" ", 2)
  return { token }
}

const getUserFromContext = async (ctx: AuthenticationContext) => {
  const { token } = ctx
  if (token === undefined) {
    return null
  }
  const decoded = await admin.auth().verifyIdToken(token)
  return { id: decoded.uid }
}

const apollo = new ApolloServer({
  context: withAuthenticationContext,
  introspection: true,
  playground: true,
  resolvers: {
    FightResult: {
      recordedAt: (parent: FightResult) => parent.recordedAt.toISOString(),
    },
    Mutation: {
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
    },
    Query: {
      fightResults: async (_, args: { first: number }) => {
        try {
          const dtos = await fetchGlobalFightResults(db, args.first)
          return {
            nodes: dtos.map(dto => ({
              ...dto,
              recordedAt: dto.recordedAt.toDate(),
            })),
          }
        } catch (e) {
          throw e
        }
      },
      visitor: async (parent, args, context: AuthenticationContext) =>
        getUserFromContext(context),
    },
    User: {
      fightResults: async (parent: { id: string }, args: { first: number }) => {
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
    },
  },
  typeDefs,
})

export const graphqlHandler = apollo.createHandler({
  cors: {
    credentials: true,
    origin: "*",
  },
})
