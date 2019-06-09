import Typography from "@material-ui/core/Typography"
import gql from "graphql-tag"
import React, { FC } from "react"
import { FighterDetailFragment } from "./__generated__/FighterDetailFragment"

export const fighterDetailFragment = gql`
  fragment FighterDetailFragment on Fighter {
    name {
      ja
    }
  }
`

export const FighterDetail: FC<FighterDetailFragment> = ({ name }) => (
  <Typography variant="h4">{name.ja}</Typography>
)
