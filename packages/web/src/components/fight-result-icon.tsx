import green from "@material-ui/core/colors/green"
import red from "@material-ui/core/colors/red"
import { makeStyles } from "@material-ui/core/styles"
import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"
import React, { FC } from "react"

const useStyles = makeStyles(() => ({
  loseColor: {
    color: red[400],
  },
  winIcon: {
    color: green[400],
  },
}))

export const FightResultIcon: FC<{ won: boolean }> = ({ won }) => {
  const classes = useStyles()
  return won ? (
    <CheckIcon className={classes.winIcon} />
  ) : (
    <CloseIcon className={classes.loseColor} />
  )
}
