import AppBar from "@material-ui/core/AppBar"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import React, { FC } from "react"

export const Layout: FC = ({ children }) => (
  <>
    <CssBaseline />
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Smarate
        </Typography>
      </Toolbar>
    </AppBar>
    <Container maxWidth="md">{children}</Container>
  </>
)
