import Link from "@material-ui/core/Link"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import gql from "graphql-tag"
import React, { FC } from "react"
import { routes } from "../routes"
import { MyFightResultFragment } from "./__generated__/MyFightResultFragment"
import { FightResultIcon } from "./fight-result-icon"

export const myFightResultFragment = gql`
  fragment MyFightResultFragment on UserFightResult {
    myFighter {
      id
      name {
        ja
      }
    }
    rivalFighter {
      id
      name {
        ja
      }
    }
    won
  }
`

export const MyFightResult: FC<MyFightResultFragment> = ({
  myFighter,
  rivalFighter,
  won,
}) => (
  <ListItem>
    <ListItemIcon>
      <FightResultIcon won={won} />
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
      secondary={
        <Link
          color="inherit"
          {...routes.fighterDetail.link({ fighterID: myFighter.id })}
        >
          {myFighter.name.ja}
        </Link>
      }
    />
  </ListItem>
)
