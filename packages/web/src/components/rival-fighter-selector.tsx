import React from "react"
import {
  FighterSelectUnit,
  Props as FighterSelectUnitProps,
} from "./fighter-select-unit"

type Props = Pick<
  FighterSelectUnitProps,
  Exclude<keyof FighterSelectUnitProps, "label">
>

export const RivalFighterSelector = (props: Props) => (
  <FighterSelectUnit label="戦ったファイター" {...props} />
)
