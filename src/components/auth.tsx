import firebase from "firebase"
import React, {
  createContext,
  FunctionComponent,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react"
import { StyledFirebaseAuth } from "react-firebaseui"
import { User } from "../models/user"

interface AuthContextValue {
  currentUser: User | undefined
  loaded: boolean
}

const AuthContext = createContext<AuthContextValue>({
  currentUser: undefined,
  loaded: false,
})
AuthContext.displayName = "AuthContext"

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUser({ uid: user.uid })
        setLoaded(true)
      } else {
        setCurrentUser(undefined)
        setLoaded(true)
      }
      return
    })
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, loaded }}>
      {children}
    </AuthContext.Provider>
  )
}

interface Props {
  children: (user: User) => ReactElement
}

const uiConfig: firebaseui.auth.Config = {
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
}

export const AuthRequired: FunctionComponent<Props> = ({ children }) => {
  const { currentUser, loaded } = useContext(AuthContext)
  if (!loaded) {
    return null
  }
  return currentUser === undefined ? (
    <StyledFirebaseAuth firebaseAuth={firebase.auth()} uiConfig={uiConfig} />
  ) : (
    children(currentUser)
  )
}
