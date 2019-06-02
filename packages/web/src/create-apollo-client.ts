import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"

export const createApolloClient = (idToken?: string) => {
  const { REACT_APP_GRAPHQL_ENDPOINT } = process.env
  if (REACT_APP_GRAPHQL_ENDPOINT === undefined) {
    throw new Error("REACT_APP_GRAPHQL_ENDPOINT not defined")
  }

  const uri = REACT_APP_GRAPHQL_ENDPOINT!
  const link = new HttpLink({
    headers: {
      authorization: idToken === undefined ? undefined : `token ${idToken}`,
    },
    uri,
  })
  const cache = new InMemoryCache()
  const client = new ApolloClient({
    cache,
    link,
  })
  return client
}
