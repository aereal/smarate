import Grid from "@material-ui/core/Grid"
import gql from "graphql-tag"
import React, { FC } from "react"
import { Mutation, Query } from "react-apollo"
import { FighterSelectUnit } from "../components/fighter-select-unit"
import { Layout } from "../components/layout"
import { MyPageQuery } from "./__generated__/MyPageQuery"
import {
  UpdateMyPreferenceMutation,
  UpdateMyPreferenceMutationVariables,
} from "./__generated__/UpdateMyPreferenceMutation"

export const query = gql`
  query MyPageQuery {
    visitor {
      preference {
        defaultFighterID
      }
    }
  }
`

export const mutation = gql`
  mutation UpdateMyPreferenceMutation($fighterID: Int!) {
    setPreference(defaultFighterID: $fighterID)
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
              <Mutation<
                UpdateMyPreferenceMutation,
                UpdateMyPreferenceMutationVariables
              >
                mutation={mutation}
              >
                {setPreference => (
                  <FighterSelectUnit
                    label="良く使うファイター"
                    fighterSelectorProps={{
                      defaultSelectedFighterID: result.data!.visitor!.preference
                        .defaultFighterID,
                      onChange: fighterID =>
                        fighterID === undefined
                          ? null
                          : setPreference({ variables: { fighterID } }),
                    }}
                  />
                )}
              </Mutation>
            ) : (
              <>not authenticated</>
            )}
          </Grid>
        </Grid>
      </Layout>
    )}
  </Query>
)
