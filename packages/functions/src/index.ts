import { region } from "firebase-functions"
import { graphqlHandler } from "./graphql"

export const graphql = region("asia-northeast1").https.onRequest(graphqlHandler)
