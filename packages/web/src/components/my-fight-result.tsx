import green from "@material-ui/core/colors/green"
import red from "@material-ui/core/colors/red"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"
import gql from "graphql-tag"
import React, { FC } from "react"
import { MyFightResultFragment } from "./__generated__/MyFightResultFragment"

export const myFightResultFragment = gql`
  fragment MyFightResultFragment on UserFightResult {
    myFighter {
      name {
        ja
      }
    }
    rivalFighter {
      name {
        ja
      }
    }
    won
  }
`

const useStyles = makeStyles(() => ({
  loseColor: {
    color: red[400],
  },
  winIcon: {
    color: green[400],
  },
}))

export const MyFightResult: FC<MyFightResultFragment> = ({
  myFighter,
  rivalFighter,
  won,
}) => {
  const classes = useStyles()
  return (
    <ListItem>
      <ListItemIcon>
        {won ? (
          <CheckIcon className={classes.winIcon} />
        ) : (
          <CloseIcon className={classes.loseColor} />
        )}
      </ListItemIcon>
      <ListItemText
        primary={
          <>
            <Typography variant="body2" color="textSecondary" component="span">
              {"VS "}
            </Typography>
            <Typography variant="body1" component="span">
              {rivalFighter.name.ja}
            </Typography>
          </>
        }
        secondary={myFighter.name.ja}
      />
    </ListItem>
  )
}
