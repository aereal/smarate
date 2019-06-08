import List from "@material-ui/core/List"
import { makeStyles } from "@material-ui/core/styles"
import gql from "graphql-tag"
import React, { FC } from "react"
import { MyFightResultListFragment } from "./__generated__/MyFightResultListFragment"
import { MyFightResult, myFightResultFragment } from "./my-fight-result"

export const myFightResultListFragment = gql`
  fragment MyFightResultListFragment on User {
    fightResults(first: 10) {
      nodes {
        ...MyFightResultFragment
      }
    }
  }
  ${myFightResultFragment}
`

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 360,
    width: "100%",
  },
}))

export const MyFightResultList: FC<MyFightResultListFragment> = ({
  fightResults,
}) => {
  const classes = useStyles()
  return (
    <List className={classes.root}>
      {fightResults.nodes.map((result, i) => (
        <MyFightResult key={i} {...result} />
      ))}
    </List>
  )
}
