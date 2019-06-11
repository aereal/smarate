import Link from "@material-ui/core/Link"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import gql from "graphql-tag"
import React, { FC } from "react"
import { routes } from "../routes"
import { FighterFightResultFragment } from "./__generated__/FighterFightResultFragment"
import { FightResultIcon } from "./fight-result-icon"

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

export const FighterFightResult: FC<FighterFightResultFragment> = ({
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
    />
  </ListItem>
)
