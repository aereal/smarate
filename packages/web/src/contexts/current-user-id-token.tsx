import React, { createContext, FunctionComponent, useEffect } from "react"
import { useState } from "react"
import { isSuccessfullySignedIn, useCurrentUser } from "./current-user"

export const CurrentUserIdTokenContext = createContext<{ idToken?: string }>({})
CurrentUserIdTokenContext.displayName = "CurrentUserIdTokenContext"

export const useCurrentUserIdToken = () => {
  const state = useCurrentUser()
  const [idToken, setIdToken] = useState<string>()

  useEffect(() => {
    const asyncGet = async () => {
      if (isSuccessfullySignedIn(state)) {
        const got = await state.currentUser.getIdToken()
        setIdToken(got)
      }
    }
    asyncGet()
  }, [isSuccessfullySignedIn(state)])

  return idToken
}

export const CurrentUserIdTokenProvider: FunctionComponent = ({ children }) => {
  return (
    <CurrentUserIdTokenContext.Provider
      value={{ idToken: useCurrentUserIdToken() }}
    >
      {children}
    </CurrentUserIdTokenContext.Provider>
  )
}
