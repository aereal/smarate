import Button, { ButtonProps } from "@material-ui/core/Button"
import React from "react"

type Props = Pick<ButtonProps, Exclude<keyof ButtonProps, "variant" | "color">>

export const SubmitButton: React.FunctionComponent<Props> = props => (
  <Button variant="contained" color="primary" {...props}>
    結果を提出
  </Button>
)
