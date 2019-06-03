import { ApolloServer } from "apollo-server-cloud-functions"
import { ContextFunction } from "apollo-server-core"
import admin from "firebase-admin"
import { readFileSync } from "fs"
import { parse } from "graphql"
import { IncomingMessage } from "http"
import { resolve } from "path"
import { db } from "./firebase"

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

        const batch = db.batch()

        const recordedAt = new Date()
        const globalResultRef = db.collection("global_results").doc()
        const wonFighterID = args.won ? args.myFighterID : args.rivalFighterID
        const lostFighterID = args.won ? args.rivalFighterID : args.myFighterID
        batch.set(globalResultRef, {
          lostFighter: {
            id: lostFighterID,
          },
          recordedAt,
          wonFighter: {
            id: wonFighterID,
          },
        })

        const userResultRef = db.collection("user_results").doc()
        batch.set(userResultRef, {
          myFighter: {
            id: args.myFighterID,
          },
          recordedAt,
          rivalFighter: {
            id: args.rivalFighterID,
          },
          won: args.won,
        })

        try {
          await batch.commit()
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
        const { defaultFighterID } = args
        if (defaultFighterID === undefined) {
          return false
        }

        const ref = db.collection("user_preferences").doc(user.id)
        try {
          await ref.set({
            defaultFighterID,
          })
          return true
        } catch (e) {
          return false
        }
      },
    },
    Query: {
      visitor: async (parent, args, context: AuthenticationContext) =>
        getUserFromContext(context),
    },
    User: {
      preference: async (parent: { id: string }) => {
        const ref = db.collection("user_preferences").doc(parent.id)
        try {
          const got = await ref.get()
          const data = got.data()
          if (data === undefined) {
            return null
          }
          return { defaultFighterID: data.defaultFighterID }
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
