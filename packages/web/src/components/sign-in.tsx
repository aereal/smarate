import Button from "@material-ui/core/Button"
import React, { FunctionComponent } from "react"
import { requestGoogleSignIn } from "../auth"

export const SignIn: FunctionComponent = () => (
  <Button variant="contained" color="primary" onClick={requestGoogleSignIn}>
    Sign in with Google
  </Button>
)
