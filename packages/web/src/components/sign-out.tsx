import Button, { ButtonProps } from "@material-ui/core/Button"
import React, { FunctionComponent } from "react"
import { useFirebaseAuth } from "../auth"

type ButtonPropsOmittingOnClickHandler = Pick<
  ButtonProps,
  Exclude<keyof ButtonProps, "onClick">
>

export const SignOut: FunctionComponent<
  ButtonPropsOmittingOnClickHandler
> = props => {
  const { auth } = useFirebaseAuth()
  const doSignOut = () => auth.signOut()
  return (
    <Button variant="contained" color="primary" {...props} onClick={doSignOut}>
      ログアウト
    </Button>
  )
}
