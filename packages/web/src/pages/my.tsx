import Grid from "@material-ui/core/Grid"
import Snackbar from "@material-ui/core/Snackbar"
import gql from "graphql-tag"
import React, { FC, useState } from "react"
import { Mutation, Query } from "react-apollo"
import { withDelay } from "../async"
import { FighterSelectUnit } from "../components/fighter-select-unit"
import { Layout } from "../components/layout"
import {
  MyFightResultList,
  myFightResultListFragment,
} from "../components/my-fight-result-list"
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
      ...MyFightResultListFragment
    }
  }
  ${myFightResultListFragment}
`

export const mutation = gql`
  mutation UpdateMyPreferenceMutation($fighterID: Int!) {
    setPreference(defaultFighterID: $fighterID)
  }
`

export const MyPage: FC = () => {
  const [updateResult, setUpdateResult] = useState<
    "idle" | "started" | "success" | "error"
  >("idle")
  const handleChanged = async (callback: () => Promise<void>) => {
    setUpdateResult("started")
    try {
      await callback()
      setUpdateResult("success")
      await Promise.all([
        setUpdateResult("success"),
        withDelay(() => setUpdateResult("idle"), 5000),
      ])
    } catch {
      await Promise.all([
        setUpdateResult("error"),
        withDelay(() => setUpdateResult("idle"), 5000),
      ])
    }
  }

  return (
    <Query<MyPageQuery> query={query}>
      {result => (
        <Layout>
          <Grid item={true} xs={12} md={6}>
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
          <Grid item={true} xs={12} md={6}>
            <MyFightResultList
              __typename="User"
              fightResults={{
                __typename: "UserFightResultConnection",
                nodes:
                  result.loading ||
                  result.error ||
                  !(result.data && result.data.visitor)
                    ? []
                    : result.data.visitor.fightResults.nodes,
              }}
            />
          </Grid>
          <Snackbar open={updateResult === "success"}>
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
