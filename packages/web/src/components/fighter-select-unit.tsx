import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import React, { FunctionComponent } from "react"
import {
  FighterSelector,
  Props as FighterSelectorProps,
} from "./fighter-selector"

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      ...theme.mixins.gutters,
      padding: theme.spacing(2),
    },
  })

interface Props {
  label: string
  fighterSelectorProps?: FighterSelectorProps
}

export const FighterSelectUnit = withStyles(styles)<
  FunctionComponent<Props & WithStyles<keyof ReturnType<typeof styles>>>
>(({ classes, label, fighterSelectorProps }) => (
  <Paper className={classes.paper}>
    <Typography variant="subtitle1">{label}</Typography>
    <FighterSelector {...fighterSelectorProps} />
  </Paper>
))
