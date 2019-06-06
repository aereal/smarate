import Drawer from "@material-ui/core/Drawer"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import React, { Dispatch, FC, SetStateAction } from "react"
import { DrawerMenuList } from "./drawer-menu-list"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    position: "relative",
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    whiteSpace: "nowrap",
    width: drawerWidth,
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  toolbarIcon: {
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
}))

const cls = (classes: Array<string | boolean>): string =>
  classes.filter(c => c !== false).join(" ")

export const DrawerMenu: FC<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}> = ({ open, setOpen }) => {
  const classes = useStyles()
  const handleDrawerClose = () => setOpen(false)

  return (
    <Drawer
      variant="permanent"
      open={open}
      classes={{
        paper: cls([classes.drawerPaper, !open && classes.drawerPaperClose]),
      }}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <DrawerMenuList />
    </Drawer>
  )
}
