import { ApolloServer, gql } from "apollo-server-cloud-functions"
import { ContextFunction } from "apollo-server-core"
import admin from "firebase-admin"
import { IncomingMessage } from "http"
import { db } from "./firebase"

const typeDefs = gql`
  type Query {
    visitor: User
  }

  type User {
    id: String!
    preference: UserPreference!
  }

  type UserPreference {
    defaultFighterID: Int!
  }
`

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

const apollo = new ApolloServer({
  context: withAuthenticationContext,
  resolvers: {
    Query: {
      visitor: async (parent, args, context: AuthenticationContext) => {
        const { token } = context
        if (token === undefined) {
          return null
        }
        const decoded = await admin.auth().verifyIdToken(token)
        return { id: decoded.uid }
      },
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
