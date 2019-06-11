import green from "@material-ui/core/colors/green"
import red from "@material-ui/core/colors/red"
import Link from "@material-ui/core/Link"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"
import gql from "graphql-tag"
import React, { FC } from "react"
import { routes } from "../routes"
import { FighterFightResultFragment } from "./__generated__/FighterFightResultFragment"

export const fighterFightResultFragment = gql`
  fragment FighterFightResultFragment on FighterFightResult {
    rivalFighter {
      id
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

export const FighterFightResult: FC<FighterFightResultFragment> = ({
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
            <Link
              variant="body1"
              color="inherit"
              {...routes.fighterDetail.link({ fighterID: rivalFighter.id })}
            >
              {rivalFighter.name.ja}
            </Link>
          </>
        }
      />
    </ListItem>
  )
}
