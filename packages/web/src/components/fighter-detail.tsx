import Typography from "@material-ui/core/Typography"
import gql from "graphql-tag"
import React, { FC } from "react"
import { FighterDetailFragment } from "./__generated__/FighterDetailFragment"
import { MatchupRateList, matchupRateListFragment } from "./matchup-rate-list"
import {
  Props as ResultRangeInputProps,
  ResultRangeInput,
} from "./result-range-input"

export const fighterDetailFragment = gql`
  fragment FighterDetailFragment on Fighter {
    name {
      ja
    }
    fightResults(
      first: $fightResultsCount
      startsAt: $startsAt
      endsAt: $endsAt
    ) {
      winRatio
      ...MatchupRateListFragment
    }
  }
  ${matchupRateListFragment}
`

interface Props {
  fighter: FighterDetailFragment
  resultRangeInputProps: ResultRangeInputProps
}

export const FighterDetail: FC<Props> = ({
  fighter: { name, fightResults },
  resultRangeInputProps,
}) => {
  return (
    <>
      <Typography variant="h4">{name.ja}</Typography>
      <ResultRangeInput {...resultRangeInputProps} />
      <Typography variant="body1">
        最近の勝率: {fightResults.winRatio * 100}%
      </Typography>
      <MatchupRateList {...fightResults} />
    </>
  )
}
