import admin from "firebase-admin"
import { region } from "firebase-functions"

admin.initializeApp()

export const echo = region("asia-northeast1").https.onRequest(
  async (req, res) => {
    res.set("access-control-allow-origin", "http://localhost:3000")
    res.set("access-control-allow-methods", "GET, HEAD, OPTIONS, POST")
    res.set("access-control-allow-headers", "content-type,authorization")

    if (req.method === "OPTIONS") {
      return
    }

    const {
      headers: { authorization },
    } = req
    if (authorization === undefined) {
      res.status(401)
      res.send("Authorization header not sent")
      return
    }
    const token = authorization.split(" ", 2)[1]
    if (!token) {
      res.status(401)
      res.send("Invalid authorization header")
      return
    }

    try {
      const decoded = await admin.auth().verifyIdToken(token)
      res.send(`authenticated: uid=${decoded.uid}`)
    } catch (e) {
      res.status(401)
      res.send(`authentication failed: ${e}`)
    }
  }
)
