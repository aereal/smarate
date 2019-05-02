import firebase from "firebase"
import React, { createContext, FunctionComponent, useContext } from "react"

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
})

const defaultAuth = firebase.auth()

const FirebaseAuthContext = createContext({
  auth: defaultAuth,
})
FirebaseAuthContext.displayName = "FirebaseAuthContext"

export const FirebaseAuthProvider: FunctionComponent = ({ children }) => (
  <FirebaseAuthContext.Provider value={{ auth: defaultAuth }}>
    {children}
  </FirebaseAuthContext.Provider>
)

export const useFirebaseAuth = () => useContext(FirebaseAuthContext)

export const supportedAuthProviders = [
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
]
