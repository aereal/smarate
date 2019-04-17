import React from "react"
import { FighterSelectUnit } from "./fighter-select-unit"

export const MyFighterSelector = () => (
  <FighterSelectUnit
    label="あなたのファイター"
    fighterSelectorProps={{ defaultSelectedFighterID: 62 }}
  />
)
