import Button, { ButtonProps } from "@material-ui/core/Button"
import React from "react"

export const SubmitButton: React.FunctionComponent<
  Pick<ButtonProps, "onClick">
> = ({ onClick }) => (
  <Button variant="contained" color="primary" onClick={onClick}>
    結果を提出
  </Button>
)
