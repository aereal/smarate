import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import React from "react"
import { FighterSelector } from "./fighter-selector"

export const MyFighterSelector: React.FunctionComponent<{}> = () => (
  <Grid md={12}>
    <Typography variant="headline">あなたのファイター</Typography>
    <FighterSelector defaultSelectedFighterID={62} />
  </Grid>
)
