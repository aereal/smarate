import Button, { ButtonProps } from "@material-ui/core/Button"
import React, { FunctionComponent } from "react"
import { signOut } from "../auth"

type ButtonPropsOmittingOnClickHandler = Pick<
  ButtonProps,
  Exclude<keyof ButtonProps, "onClick">
>

export const SignOut: FunctionComponent<
  ButtonPropsOmittingOnClickHandler
> = props => (
  <Button variant="contained" color="primary" {...props} onClick={signOut}>
    ログアウト
  </Button>
)
