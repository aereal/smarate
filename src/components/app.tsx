import Grid from "@material-ui/core/Grid"
import React from "react"
import { MyFighterSelector } from "./my-fighter-selector"
import { ResultSwitch } from "./result-switch"
import { RivalFighterSelector } from "./rival-fighter-selector"

const containerStyles: React.CSSProperties = {
  justifyContent: "center",
  paddingTop: 8 * 4,
}

export const App: React.FunctionComponent<{}> = () => (
  <Grid container={true} style={containerStyles}>
    <MyFighterSelector />
    <RivalFighterSelector />
    <ResultSwitch />
  </Grid>
)
