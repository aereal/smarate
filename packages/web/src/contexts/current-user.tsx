import firebase from "firebase/app"
import React, { createContext, useEffect, useState } from "react"
import { PropsWithChildren } from "react"

interface SuccessfullySignedInState {
  currentUser: firebase.User
  state: "signed-in"
}

interface UnauthenticatedState {
  state: "unauthenticated"
}

interface UninitializedState {
  state: "uninitialized"
}

type CurrentUserState =
  | SuccessfullySignedInState
  | UnauthenticatedState
  | UninitializedState

export const isSuccessfullySignedIn = (
  state: CurrentUserState
): state is SuccessfullySignedInState => state.state === "signed-in"

export const isUnauthenticated = (
  state: CurrentUserState
): state is UnauthenticatedState => state.state === "unauthenticated"

export const isUninitialized = (
  state: CurrentUserState
): state is UninitializedState => state.state === "uninitialized"

export const CurrentUserContext = createContext<CurrentUserState>({
  state: "uninitialized",
})

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUserState>({
    state: "uninitialized",
  })

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async user => {
      if (user === null) {
        setCurrentUser({ state: "unauthenticated" })
        return
      }

      setCurrentUser({ state: "signed-in", currentUser: user })
    })
  }, [])

  return currentUser
}

export const DefaultCurrentUserProvider = (props: PropsWithChildren<{}>) => (
  <CurrentUserContext.Provider value={useCurrentUser()}>
    {props.children}
  </CurrentUserContext.Provider>
)
