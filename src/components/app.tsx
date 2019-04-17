import Grid from "@material-ui/core/Grid"
import React from "react"
import { Layout } from "./layout"
import { MyFighterSelector } from "./my-fighter-selector"
import { ResultSwitch } from "./result-switch"
import { RivalFighterSelector } from "./rival-fighter-selector"

export const App: React.FunctionComponent<{}> = () => (
  <Layout>
    <Grid item={true} xs={12} sm={6}>
      <MyFighterSelector />
    </Grid>
    <Grid item={true} xs={12} sm={6}>
      <RivalFighterSelector />
    </Grid>
    <ResultSwitch />
  </Layout>
)
