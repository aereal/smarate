import admin from "firebase-admin"
import { config } from "firebase-functions"

export const getDB = () => {
  if (admin.apps.filter(a => a !== null).length === 0) {
    admin.initializeApp(config().firebase)
  }

  return admin.firestore()
}
export type GetDB = typeof getDB
