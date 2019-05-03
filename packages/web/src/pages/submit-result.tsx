import Grid from "@material-ui/core/Grid"
import React from "react"
import { ResultSwitch } from "../components//result-switch"
import { RivalFighterSelector } from "../components//rival-fighter-selector"
import { Layout } from "../components/layout"
import { MyFighterSelector } from "../components/my-fighter-selector"
import { SubmitButton } from "../components/submit-button"
import { useStoreAPI } from "../hooks/store-api"

export const SubmitResultPage: React.FunctionComponent<{}> = () => {
  const { doFetch } = useStoreAPI()

  return (
    <Layout>
      <Grid item={true} xs={12} sm={6}>
        <MyFighterSelector />
      </Grid>
      <Grid item={true} xs={12} sm={6}>
        <RivalFighterSelector />
      </Grid>
      <ResultSwitch />
      <SubmitButton
        onClick={e => {
          e.preventDefault()
          doFetch()
        }}
      />
    </Layout>
  )
}
