import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import React, { ChangeEvent } from "react"
import { Fighter, fighters } from "../models/fighter"

export interface Props {
  candidates?: ReadonlyArray<Fighter>
  selectedFighterID?: number
  disabled?: boolean
  onChange?: (selectedFighterID: number | undefined) => void
}

const voidFighterID = -1

export const FighterSelector: React.FunctionComponent<Props> = ({
  candidates,
  selectedFighterID,
  disabled,
  onChange,
}) => {
  const candidateFighters = candidates || fighters
  const isSelected = (fighterID: number): boolean =>
    selectedFighterID === undefined ? false : selectedFighterID === fighterID
  const handleChange = (ev: ChangeEvent<{ value: unknown }>) => {
    const fighterID = parseInt(ev.target.value as string)
    if (onChange !== undefined) {
      onChange(fighterID)
    }
  }

  return (
    <>
      <Select
        disabled={disabled}
        value={
          selectedFighterID === undefined ? voidFighterID : selectedFighterID
        }
        onChange={handleChange}
      >
        {selectedFighterID === undefined ? (
          <MenuItem value={voidFighterID}>選んでください</MenuItem>
        ) : null}
        {candidateFighters.map((fighter, i) => (
          <MenuItem
            key={i}
            value={fighter.id}
            selected={isSelected(fighter.id)}
          >
            {fighter.name.ja}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}
