import Link from "@material-ui/core/Link"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { makeStyles } from "@material-ui/core/styles"
import gql from "graphql-tag"
import React, { FC } from "react"
import { routes } from "../routes"
import { MatchupRateListFragment } from "./__generated__/MatchupRateListFragment"

export const matchupRateListFragment = gql`
  fragment MatchupRateListFragment on FighterFightResultConnection {
    mostWonFighters {
      nodes {
        rivalFighter {
          name {
            ja
          }
          id
        }
      }
    }
  }
`

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 360,
    width: "100%",
  },
}))

export const MatchupRateList: FC<MatchupRateListFragment> = ({
  mostWonFighters,
}) => (
  <List className={useStyles().root}>
    {mostWonFighters.nodes.map(({ rivalFighter }, key) => (
      <ListItem key={key}>
        <ListItemIcon>
          <span>{key + 1}</span>
        </ListItemIcon>
        <ListItemText
          primary={
            <Link
              variant="body1"
              color="inherit"
              {...routes.fighterDetail.link({ fighterID: rivalFighter.id })}
            >
              {rivalFighter.name.ja}
            </Link>
          }
        />
      </ListItem>
    ))}
  </List>
)
