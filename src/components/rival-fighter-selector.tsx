import Typography from "@material-ui/core/Typography"
import React from "react"
import { FighterSelector } from "./fighter-selector"

interface Props {}

export const RivalFighterSelector: React.FunctionComponent<Props> = () => (
  <>
    <Typography variant="headline">戦ったファイター</Typography>
    <FighterSelector />
  </>
)
