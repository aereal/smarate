import AppBar from "@material-ui/core/AppBar"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Link from "@material-ui/core/Link"
import { makeStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import MenuIcon from "@material-ui/icons/Menu"
import clsx from "clsx"
import React, { FC, useState } from "react"
import { routes } from "../routes"
import { DrawerMenu } from "./drawer-menu"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(["width", "margin"], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
}))

export const Layout: FC = ({ children }) => {
  const classes = useStyles()
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const handleDrawerOpen = () => setOpenDrawer(true)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="primary"
        className={clsx(classes.appBar, openDrawer && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open Menu"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              openDrawer && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Link variant="h6" color="inherit" {...routes.root.link()}>
            Smarate
          </Link>
        </Toolbar>
      </AppBar>
      <DrawerMenu open={openDrawer} setOpen={setOpenDrawer} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container={true} spacing={3}>
            {children}
          </Grid>
        </Container>
      </main>
    </div>
  )
}
