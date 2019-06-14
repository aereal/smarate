import Grid from "@material-ui/core/Grid"
import { DatePicker } from "@material-ui/pickers"
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date"
import React, { FC } from "react"

export interface Props {
  startsAt: Date | null
  setStartsAt: (date: Date) => void
  endsAt: Date
  setEndsAt: (date: Date) => void
}

export const ResultRangeInput: FC<Props> = ({
  startsAt,
  setStartsAt,
  endsAt,
  setEndsAt,
}) => {
  const handleStartsAtChanged = (date: MaterialUiPickersDate) =>
    date && setStartsAt(date)
  const handleEndsAtChanged = (date: MaterialUiPickersDate) =>
    date && setEndsAt(date)
  return (
    <Grid container={true} xs={12} spacing={3}>
      <Grid item={true} xs={12} sm={6}>
        <DatePicker
          disableFuture={true}
          label="開始日"
          value={startsAt}
          onChange={handleStartsAtChanged}
        />
      </Grid>
      <Grid item={true} xs={12} sm={6}>
        <DatePicker
          disableFuture={true}
          label="終了日"
          value={endsAt}
          onChange={handleEndsAtChanged}
        />
      </Grid>
    </Grid>
  )
}
