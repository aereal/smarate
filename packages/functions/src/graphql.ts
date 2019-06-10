import { ApolloServer } from "apollo-server-cloud-functions"
import { readFileSync } from "fs"
import { parse } from "graphql"
import { resolve } from "path"
import { withAuthenticationContext } from "./auth-context"
import { getDB } from "./firebase"
import { buildResolver } from "./resolvers"

const rawSchema = readFileSync(resolve(__dirname, "../schema.graphql"))
const typeDefs = parse(rawSchema.toString())

const apollo = new ApolloServer({
  context: withAuthenticationContext,
  introspection: true,
  playground: true,
  resolvers: buildResolver(getDB),
  typeDefs,
})

export const graphqlHandler = apollo.createHandler({
  cors: {
    credentials: true,
    origin: "*",
  },
})
