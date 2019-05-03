/* tslint:disable:no-console */

import { RequestHandler } from "express"
import * as express from "express"
import admin from "firebase-admin"
import { region } from "firebase-functions"

interface AuthenticatedRequest extends express.Request {
  authenticatedUserInfo: admin.auth.DecodedIdToken
}

admin.initializeApp()

const cors: RequestHandler = (req, res, next) => {
  console.log(`---> start cors mw`)

  res.set("access-control-allow-origin", "http://localhost:3000")
  res.set("access-control-allow-methods", "GET, HEAD, OPTIONS, POST")
  res.set("access-control-allow-headers", "content-type,authorization")

  if (req.method === "OPTIONS") {
    console.log(`handling OPTIONS; finish`)
    res.end()
  } else {
    console.log(`passing next`)
    next()
  }
}

const authenticate: RequestHandler = async (req, res, next) => {
  console.log(`---> start authenticate mw`)

  const {
    headers: { authorization },
  } = req
  if (authorization === undefined) {
    console.log(`Authorization header not sent`)

    res.status(401)
    res.send("Authorization header not sent")
    return
  }

  const token = authorization.split(" ", 2)[1]
  if (!token) {
    console.log("Invalid authorization header")

    res.status(401)
    res.send("Invalid authorization header")
    return
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token)
    console.log(`---> decoded token = ${JSON.stringify(decoded)}`)
    ;((req as any) as AuthenticatedRequest).authenticatedUserInfo = decoded
    next()
  } catch (e) {
    console.log(`---> failed to authenticate: ${e}`)
    res.status(401)
    res.send(`authentication failed: ${e}`)
    return
  }
}

const exp = express()

exp.use(cors)
exp.use(authenticate)
exp.get("/", (req, res) => {
  const authenReq = (req as never) as AuthenticatedRequest
  res.send(`authenticated; uid = ${authenReq.authenticatedUserInfo.uid}`)
  return
})

export const echo = region("asia-northeast1").https.onRequest(exp)
