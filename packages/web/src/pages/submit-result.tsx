import Grid from "@material-ui/core/Grid"
import gql from "graphql-tag"
import React, { useState } from "react"
import { Mutation } from "react-apollo"
import { ResultSwitch } from "../components//result-switch"
import { RivalFighterSelector } from "../components//rival-fighter-selector"
import { Layout } from "../components/layout"
import { MyFighterSelector } from "../components/my-fighter-selector"
import { SubmitButton } from "../components/submit-button"
import { FightResult, Lose, Win } from "../models/result"
import {
  RecordResultMutation,
  RecordResultMutationVariables,
} from "./__generated__/RecordResultMutation"

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

export const SubmitResultPage: React.FunctionComponent<{}> = () => {
  const [rivalFighterID, setRivalFighterID] = useState<number>()
  const [myFighterID, setMyFighterID] = useState<number>()
  const [won, setWon] = useState(true)
  const onResultChange = (result: FightResult) => setWon(result === Win)
  return (
    <Layout>
      <Grid item={true} xs={12} sm={6}>
        <MyFighterSelector
          fighterSelectorProps={{
            onChange: id => setMyFighterID(id),
          }}
        />
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
              // tslint:disable-next-line:jsx-no-lambda
              onClick={() =>
                recordResult({
                  variables: {
                    myFighterID: myFighterID!,
                    rivalFighterID: rivalFighterID!,
                    won,
                  },
                })
              }
            />
          )}
        </Mutation>
      </Grid>
    </Layout>
  )
}
