import Typography from "@material-ui/core/Typography"
import gql from "graphql-tag"
import React, { FC } from "react"
import { FighterDetailFragment } from "./__generated__/FighterDetailFragment"

export const fighterDetailFragment = gql`
  fragment FighterDetailFragment on Fighter {
    name {
      ja
    }
    fightResults(first: 10) {
      winRatio
    }
  }
`

export const FighterDetail: FC<FighterDetailFragment> = ({
  name,
  fightResults: { winRatio },
}) => (
  <>
    <Typography variant="h4">{name.ja}</Typography>
    <div>{winRatio * 100}%</div>
  </>
)
