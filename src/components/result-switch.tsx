import Switch from "@material-ui/core/Switch"
import React, { useState } from "react"
import { FightResult } from "../models/result"

interface Props {
  selectedResult?: FightResult
}

export const ResultSwitch: React.FunctionComponent<Props> = ({
  selectedResult,
}) => {
  const [result, changeResult] = useState<FightResult>(
    selectedResult !== undefined ? selectedResult : FightResult.Win
  )
  const toggleResult = () =>
    changeResult(prev =>
      prev === FightResult.Win ? FightResult.Lose : FightResult.Win
    )

  return (
    <>
      <Switch
        color="primary"
        checked={result === FightResult.Win}
        onChange={toggleResult}
      />
    </>
  )
}
