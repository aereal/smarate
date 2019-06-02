import Grid from "@material-ui/core/Grid"
import gql from "graphql-tag"
import React, { FC } from "react"
import { Query } from "react-apollo"
import { FighterSelectUnit } from "../components/fighter-select-unit"
import { Layout } from "../components/layout"
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
            {result.error ? (
              <>error: {JSON.stringify(result.error)}</>
            ) : result.loading ? (
              <FighterSelectUnit
                label="良く使うファイター"
                fighterSelectorProps={{
                  disabled: true,
                }}
              />
            ) : result.data!.visitor ? (
              <FighterSelectUnit
                label="良く使うファイター"
                fighterSelectorProps={{
                  defaultSelectedFighterID: result.data!.visitor.preference
                    .defaultFighterID,
                }}
              />
            ) : (
              <>not authenticated</>
            )}
          </Grid>
        </Grid>
      </Layout>
    )}
  </Query>
)
