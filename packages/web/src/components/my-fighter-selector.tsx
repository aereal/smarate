import React from "react"
import {
  FighterSelectUnit,
  Props as FighterSelectUnitProps,
} from "./fighter-select-unit"

type Props = Pick<
  FighterSelectUnitProps,
  Exclude<keyof FighterSelectUnitProps, "label">
>

export const MyFighterSelector = (props: Props) => (
  <FighterSelectUnit label="あなたのファイター" {...props} />
)
