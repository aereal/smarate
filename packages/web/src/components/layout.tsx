import { createStyles, withStyles, WithStyles } from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import React, { FunctionComponent } from "react"

const styles = createStyles({
  root: {
    flexGrow: 1,
  },
})

export const Layout = withStyles(styles)<
  FunctionComponent<WithStyles<keyof typeof styles>>
>(({ children, classes }) => (
  <>
    <CssBaseline />
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Smarate
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.root}>
      <Grid container={true} spacing={10}>
        {children}
      </Grid>
    </div>
  </>
))
