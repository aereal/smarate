import Typography from "@material-ui/core/Typography"
import React from "react"
import { FighterSelector } from "./fighter-selector"

export const MyFighterSelector: React.FunctionComponent<{}> = () => (
  <>
    <Typography variant="headline">あなたのファイター</Typography>
    <FighterSelector defaultSelectedFighterID={62} />
  </>
)
