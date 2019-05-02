import firebase from "firebase"
import React, {
  createContext,
  FunctionComponent,
  ReactElement,
  useContext,
  useEffect,
} from "react"
import { useState } from "react"
import { useAuth } from "./components/auth"

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

export const CurrentUserIdTokenContext = createContext<{ idToken?: string }>({})
CurrentUserIdTokenContext.displayName = "CurrentUserIdTokenContext"

export const CurrentUserIdTokenProvider: FunctionComponent = ({ children }) => {
  const { currentUser } = useAuth()
  const [idToken, setIdToken] = useState<string>()

  useEffect(() => {
    const asyncGet = async () => {
      if (currentUser === undefined) {
        return
      }
      const got = await currentUser.getIdToken()
      setIdToken(got)
    }
    asyncGet()
  })

  return (
    <CurrentUserIdTokenContext.Provider value={{ idToken }}>
      {children}
    </CurrentUserIdTokenContext.Provider>
  )
}
