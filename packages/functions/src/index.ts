import admin from "firebase-admin"
import { region } from "firebase-functions"

admin.initializeApp()

export const echo = region("asia-northeast1").https.onRequest((req, res) => {
  res.send("hi")
})
