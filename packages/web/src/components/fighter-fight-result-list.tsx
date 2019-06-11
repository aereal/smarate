import List from "@material-ui/core/List"
import { makeStyles } from "@material-ui/core/styles"
import gql from "graphql-tag"
import React, { FC } from "react"
import { FighterFightResultListFragment } from "./__generated__/FighterFightResultListFragment"
import {
  FighterFightResult,
  fighterFightResultFragment,
} from "./fighter-fight-result"

export const fighterFightResultListFragment = gql`
  fragment FighterFightResultListFragment on Fighter {
    fightResults(first: 10) {
      nodes {
        ...FighterFightResultFragment
      }
    }
  }
  ${fighterFightResultFragment}
`

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 360,
    width: "100%",
  },
}))

export const FighterFightResultList: FC<FighterFightResultListFragment> = ({
  fightResults,
}) => {
  const classes = useStyles()
  return (
    <List className={classes.root}>
      {fightResults.nodes.map((result, i) => (
        <FighterFightResult key={i} {...result} />
      ))}
    </List>
  )
}
