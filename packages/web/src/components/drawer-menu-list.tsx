import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import AddIcon from "@material-ui/icons/Add"
import CloseIcon from "@material-ui/icons/Close"
import PersonIcon from "@material-ui/icons/Person"
import React, { FC } from "react"
import { signOut } from "../auth"
import { routes } from "../routes"

const signOutWithConfirmation = async () => {
  if (window.confirm("ログアウトしますか?")) {
    await signOut()
  }
}

export const DrawerMenuList: FC = () => (
  <>
    <List>
      <ListItem button={true} {...routes.submitResult.link()}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="試合結果を記録する" />
      </ListItem>
      <ListItem button={true} {...routes.my.link()}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="マイページ" />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem button={true} onClick={signOutWithConfirmation}>
        <ListItemIcon>
          <CloseIcon />
        </ListItemIcon>
        <ListItemText primary="ログアウト" />
      </ListItem>
    </List>
  </>
)
