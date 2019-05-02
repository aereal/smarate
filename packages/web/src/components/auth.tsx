import React, { FunctionComponent, ReactElement } from "react"
import { StyledFirebaseAuth } from "react-firebaseui"
import { supportedAuthProviders, useFirebaseAuth } from "../auth"
import { useAuth } from "../contexts/authentication"
import { User } from "../models/user"

interface Props {
  children: (user: User) => ReactElement
}

const uiConfig: firebaseui.auth.Config = {
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
  signInFlow: "popup",
  signInOptions: supportedAuthProviders,
}

export const AuthRequired: FunctionComponent<Props> = ({ children }) => {
  const { auth } = useFirebaseAuth()
  const { currentUser, loaded } = useAuth()
  if (!loaded) {
    return null
  }
  return currentUser === undefined ? (
    <StyledFirebaseAuth firebaseAuth={auth} uiConfig={uiConfig} />
  ) : (
    children(currentUser)
  )
}
