import { ContextFunction } from "apollo-server-core"
import admin from "firebase-admin"
import { IncomingMessage } from "http"

export interface AuthenticationContext {
  token?: string
}

export const withAuthenticationContext: ContextFunction<
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

export const getUserFromContext = async (ctx: AuthenticationContext) => {
  const { token } = ctx
  if (token === undefined) {
    return null
  }
  const decoded = await admin.auth().verifyIdToken(token)
  return { id: decoded.uid }
}
