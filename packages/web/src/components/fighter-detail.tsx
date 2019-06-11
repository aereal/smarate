import Typography from "@material-ui/core/Typography"
import gql from "graphql-tag"
import React, { FC } from "react"
import {
  FighterFightResultList,
  fighterFightResultListFragment,
} from "../components/fighter-fight-result-list"
import { FighterDetailFragment } from "./__generated__/FighterDetailFragment"

export const fighterDetailFragment = gql`
  fragment FighterDetailFragment on Fighter {
    name {
      ja
    }
    fightResults(first: 10) {
      winRatio
    }
    ...FighterFightResultListFragment
  }
  ${fighterFightResultListFragment}
`

export const FighterDetail: FC<FighterDetailFragment> = ({
  name,
  fightResults,
}) => (
  <>
    <Typography variant="h4">{name.ja}</Typography>
    <Typography variant="body1">
      最近の勝率: {fightResults.winRatio * 100}%
    </Typography>
    <FighterFightResultList __typename="Fighter" fightResults={fightResults} />
  </>
)
