import React, { PropsWithChildren, useEffect, useState } from "react"
import { ApolloProvider } from "react-apollo"
import { createApolloClient } from "../create-apollo-client"
import { useCurrentUserIdToken } from "./current-user-id-token"

const useAuthenApollo = () => {
  const idToken = useCurrentUserIdToken()
  const [apolloClient, setApolloClient] = useState(createApolloClient())

  useEffect(() => {
    setApolloClient(createApolloClient(idToken))
  }, [idToken])

  return apolloClient
}

export const AuthenApolloProvider = (props: PropsWithChildren<{}>) => (
  <ApolloProvider client={useAuthenApollo()}>{props.children}</ApolloProvider>
)
