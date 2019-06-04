import { createStyles, withStyles, WithStyles } from "@material-ui/core"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import React, { FunctionComponent, useState } from "react"
import { FightResult, Lose, Win } from "../models/result"

interface Props {
  selectedResult?: FightResult
  onChange: (result: FightResult) => void
}

const styles = createStyles({
  flatFormGroup: {
    flexDirection: "row",
  },
})

export const ResultSwitch = withStyles(styles)<
  FunctionComponent<Props & WithStyles<keyof typeof styles>>
>(({ selectedResult, classes, onChange }) => {
  const [result, changeResult] = useState<FightResult>(
    selectedResult !== undefined ? selectedResult : Win
  )
  const toggleResult = () =>
    changeResult(prev => {
      const nextResult = prev === Win ? Lose : Win
      onChange(nextResult)
      return nextResult
    })

  return (
    <RadioGroup
      className={classes.flatFormGroup}
      value={result}
      onChange={toggleResult}
    >
      <FormControlLabel label="勝ち" value={Win} control={<Radio />} />
      <FormControlLabel label="負け" value={Lose} control={<Radio />} />
    </RadioGroup>
  )
})
