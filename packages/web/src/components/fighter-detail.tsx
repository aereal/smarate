import Typography from "@material-ui/core/Typography"
import gql from "graphql-tag"
import React, { FC } from "react"
import { FighterDetailFragment } from "./__generated__/FighterDetailFragment"
import { MatchupRateList, matchupRateListFragment } from "./matchup-rate-list"

export const fighterDetailFragment = gql`
  fragment FighterDetailFragment on Fighter {
    name {
      ja
    }
    fightResults(first: $fightResultsCount) {
      winRatio
      ...MatchupRateListFragment
    }
  }
  ${matchupRateListFragment}
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
    <MatchupRateList {...fightResults} />
  </>
)
