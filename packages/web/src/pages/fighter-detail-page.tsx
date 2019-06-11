import Grid from "@material-ui/core/Grid"
import gql from "graphql-tag"
import React, { FC } from "react"
import { Query } from "react-apollo"
import { Route } from "type-route"
import {
  FighterDetail,
  fighterDetailFragment,
} from "../components/fighter-detail"
import { Layout } from "../components/layout"
import { OnError } from "../components/on-error"
import { OnLoading } from "../components/on-loading"
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
  query FighterDetailPageQuery($fighterID: Int!) {
    fighter(id: $fighterID) {
      ...FighterDetailFragment
    }
  }
  ${fighterDetailFragment}
`

export const FighterDetailPage: FC<Props> = ({ route: { params } }) => (
  <Layout>
    <Grid item={true} xs={12}>
      <Query<FighterDetailPageQuery, FighterDetailPageQueryVariables>
        query={query}
        variables={{ fighterID: params.fighterID }}
      >
        {result => (
          <>
            <OnLoading loading={result.loading}>{() => null}</OnLoading>
            <OnError error={result.error}>
              {error => <>! error: {JSON.stringify(error)}</>}
            </OnError>
            <WithData data={result.data}>
              {({ data }) =>
                data.fighter === null ? (
                  <>404</>
                ) : (
                  <FighterDetail {...data.fighter} />
                )
              }
            </WithData>
          </>
        )}
      </Query>
    </Grid>
  </Layout>
)
