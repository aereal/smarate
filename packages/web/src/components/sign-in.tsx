import React, { FunctionComponent } from "react"
import { StyledFirebaseAuth } from "react-firebaseui"
import { supportedAuthProviders, useFirebaseAuth } from "../auth"

const uiConfig: firebaseui.auth.Config = {
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
  signInFlow: "popup",
  signInOptions: supportedAuthProviders,
}

export const SignIn: FunctionComponent = () => {
  const { auth } = useFirebaseAuth()
  return <StyledFirebaseAuth firebaseAuth={auth} uiConfig={uiConfig} />
}
