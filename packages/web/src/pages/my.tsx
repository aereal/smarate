import Grid from "@material-ui/core/Grid"
import Snackbar from "@material-ui/core/Snackbar"
import gql from "graphql-tag"
import React, { FC, useState } from "react"
import { Mutation, Query } from "react-apollo"
import { FighterSelectUnit } from "../components/fighter-select-unit"
import { Layout } from "../components/layout"
import {
  ErrorSnackbarContent,
  SuccessfulSnackbarContent,
} from "../components/state-snackbar-content"
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

export const MyPage: FC = () => {
  const [updateResult, setUpdateResult] = useState<
    "undetermined" | "error" | "completed"
  >("undetermined")
  const handleChanged = async (callback: () => Promise<void>) => {
    setUpdateResult("undetermined")
    try {
      await callback()
      setUpdateResult("completed")
    } catch (e) {
      setUpdateResult("error")
    }
    setTimeout(() => setUpdateResult("undetermined"), 5000)
  }

  return (
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
                        defaultSelectedFighterID: result.data!.visitor!
                          .preference.defaultFighterID,
                        onChange: fighterID =>
                          handleChanged(async () => {
                            if (fighterID === undefined) {
                              return
                            }
                            setPreference({ variables: { fighterID } })
                          }),
                      }}
                    />
                  )}
                </Mutation>
              ) : (
                <>not authenticated</>
              )}
            </Grid>
          </Grid>
          <Snackbar open={updateResult === "completed"}>
            <SuccessfulSnackbarContent message="保存しました" />
          </Snackbar>
          <Snackbar open={updateResult === "error"}>
            <ErrorSnackbarContent message="保存に失敗しました" />
          </Snackbar>
        </Layout>
      )}
    </Query>
  )
}
