import Grid from "@material-ui/core/Grid"
import gql from "graphql-tag"
import React, { FC } from "react"
import { Query } from "react-apollo"
import { FighterSelectUnit } from "../components/fighter-select-unit"
import { Layout } from "../components/layout"
import { OnError } from "../components/on-error"
import { OnLoading } from "../components/on-loading"
import { WithData } from "../components/with-data"
import { MyPageQuery } from "./__generated__/MyPageQuery"

export const query = gql`
  query MyPageQuery {
    visitor {
      preference {
        defaultFighterID
      }
    }
  }
`

export const MyPage: FC = () => (
  <Query<MyPageQuery> query={query}>
    {result => (
      <Layout>
        <Grid item={true} xs={12} sm={6}>
          <Grid item={true} xs={12} sm={6}>
            <OnLoading {...result}>{() => <>loading ...</>}</OnLoading>
            <OnError {...result}>
              {({ error }) => <>error: {JSON.stringify(error)}</>}
            </OnError>
            <WithData {...result}>
              {({ data: { visitor } }) =>
                visitor ? (
                  <FighterSelectUnit
                    label="良く使うファイター"
                    fighterSelectorProps={{
                      defaultSelectedFighterID:
                        visitor.preference.defaultFighterID,
                    }}
                  />
                ) : (
                  <>not authenticated</>
                )
              }
            </WithData>
          </Grid>
        </Grid>
      </Layout>
    )}
  </Query>
)
