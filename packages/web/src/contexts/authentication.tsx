import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react"
import { useFirebaseAuth } from "../auth"
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
  const { auth } = useFirebaseAuth()
  const [currentUser, setCurrentUser] = useState<User>()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user)
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

export const useAuth = () => useContext(AuthContext)
