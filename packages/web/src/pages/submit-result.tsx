import Grid from "@material-ui/core/Grid"
import Snackbar from "@material-ui/core/Snackbar"
import gql from "graphql-tag"
import React, { useState } from "react"
import { Mutation, Query } from "react-apollo"
import { ResultSwitch } from "../components//result-switch"
import { RivalFighterSelector } from "../components//rival-fighter-selector"
import { Layout } from "../components/layout"
import { MyFighterSelector } from "../components/my-fighter-selector"
import { SubmitButton } from "../components/submit-button"
import { SuccessfulSnackbarContent } from "../components/successful-snackbar-content"
import { FightResult, Lose, Win } from "../models/result"
import {
  RecordResultMutation,
  RecordResultMutationVariables,
} from "./__generated__/RecordResultMutation"
import { RecordResultQuery } from "./__generated__/RecordResultQuery"

const mutation = gql`
  mutation RecordResultMutation(
    $myFighterID: Int!
    $rivalFighterID: Int!
    $won: Boolean!
  ) {
    recordResult(
      myFighterID: $myFighterID
      rivalFighterID: $rivalFighterID
      won: $won
    )
  }
`

const query = gql`
  query RecordResultQuery {
    visitor {
      preference {
        defaultFighterID
      }
    }
  }
`

export const SubmitResultPage: React.FunctionComponent<{}> = () => {
  const [rivalFighterID, setRivalFighterID] = useState<number>()
  const [myFighterID, setMyFighterID] = useState<number>()
  const [won, setWon] = useState(true)
  const [completed, setCompleted] = useState(false)
  const onResultChange = (result: FightResult) => setWon(result === Win)
  const onSubmit = (callback: () => Promise<void>) => async () => {
    setCompleted(false)
    await callback()
    setCompleted(true)
    setRivalFighterID(undefined)
    setTimeout(() => {
      setCompleted(false)
    }, 5000)
  }

  return (
    <Layout>
      <Grid item={true} xs={12} sm={6}>
        <Query<RecordResultQuery> query={query}>
          {({ data, loading, error }) => {
            const loaded = !error && !loading
            const defaultFighterID =
              data && data.visitor && data.visitor.preference.defaultFighterID
            if (defaultFighterID !== null && defaultFighterID !== undefined) {
              setMyFighterID(defaultFighterID)
            }
            return (
              <MyFighterSelector
                fighterSelectorProps={{
                  ...(defaultFighterID
                    ? { defaultSelectedFighterID: defaultFighterID }
                    : {}),
                  disabled: !loaded,
                  onChange: id => setMyFighterID(id),
                }}
              />
            )
          }}
        </Query>
      </Grid>
      <Grid item={true} xs={12} sm={6}>
        <RivalFighterSelector
          fighterSelectorProps={{
            onChange: id => setRivalFighterID(id),
          }}
        />
      </Grid>
      <Grid item={true} xs={6}>
        <ResultSwitch
          selectedResult={won ? Win : Lose}
          onChange={onResultChange}
        />
      </Grid>
      <Grid item={true} xs={6}>
        <Mutation<RecordResultMutation, RecordResultMutationVariables>
          mutation={mutation}
        >
          {recordResult => (
            <SubmitButton
              disabled={
                rivalFighterID === undefined || myFighterID === undefined
              }
              onClick={onSubmit(
                // tslint:disable-next-line:jsx-no-lambda
                async () => {
                  await recordResult({
                    variables: {
                      myFighterID: myFighterID!,
                      rivalFighterID: rivalFighterID!,
                      won,
                    },
                  })
                }
              )}
            />
          )}
        </Mutation>
      </Grid>
      <Snackbar open={completed}>
        <SuccessfulSnackbarContent message="Completed" />
      </Snackbar>
    </Layout>
  )
}
