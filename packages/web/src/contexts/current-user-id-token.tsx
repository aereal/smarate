import React, { createContext, FunctionComponent, useEffect } from "react"
import { useState } from "react"
import { useAuth } from "./authentication"

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
  }, [currentUser])

  return (
    <CurrentUserIdTokenContext.Provider value={{ idToken }}>
      {children}
    </CurrentUserIdTokenContext.Provider>
  )
}
