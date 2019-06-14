import Grid from "@material-ui/core/Grid"
import LinearProgress from "@material-ui/core/LinearProgress"
import gql from "graphql-tag"
import React, { FC, useState } from "react"
import { Query } from "react-apollo"
import { Route } from "type-route"
import {
  FighterDetail,
  fighterDetailFragment,
} from "../components/fighter-detail"
import { Layout } from "../components/layout"
import { WithData } from "../components/with-data"
import { routes } from "../routes"
import {
  FighterDetailPageQuery,
  FighterDetailPageQueryVariables,
} from "./__generated__/FighterDetailPageQuery"

interface Props {
  route: Route<typeof routes.fighterDetail>
}

const query = gql`
  query FighterDetailPageQuery(
    $fighterID: Int!
    $fightResultsCount: Int!
    $startsAt: DateTime
    $endsAt: DateTime!
  ) {
    fighter(id: $fighterID) {
      ...FighterDetailFragment
    }
  }
  ${fighterDetailFragment}
`

export const FighterDetailPage: FC<Props> = ({ route: { params } }) => {
  const [startsAt, setStartsAt] = useState<Date | null>(null)
  const [endsAt, setEndsAt] = useState<Date>(new Date())

  return (
    <Layout>
      <Grid item={true} xs={12}>
        <Query<FighterDetailPageQuery, FighterDetailPageQueryVariables>
          query={query}
          variables={{
            endsAt,
            fightResultsCount: 10,
            fighterID: params.fighterID,
            startsAt,
          }}
        >
          {({ error, loading, data }) => {
            if (error) {
              return <>!error: {JSON.stringify(error)}</>
            }
            if (loading) {
              return <LinearProgress />
            }
            return (
              <WithData data={data}>
                {({ data: { fighter } }) =>
                  fighter === null ? (
                    <>404</>
                  ) : (
                    <FighterDetail
                      fighter={fighter}
                      resultRangeInputProps={{
                        endsAt,
                        setEndsAt,
                        setStartsAt,
                        startsAt,
                      }}
                    />
                  )
                }
              </WithData>
            )
          }}
        </Query>
      </Grid>
    </Layout>
  )
}
