import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import React, { useEffect, useState } from "react"
import { Fighter, fighters } from "../models/fighter"

export interface Props {
  candidates?: ReadonlyArray<Fighter>
  defaultSelectedFighterID?: number
  onChange?: (selectedFighterID: number | undefined) => void
}

const voidFighterID = -1

export const FighterSelector: React.FunctionComponent<Props> = ({
  candidates,
  defaultSelectedFighterID,
  onChange,
}) => {
  const [selectedFighterID, updateFighter] = useState(defaultSelectedFighterID)
  const candidateFighters = candidates || fighters
  const isSelected = (fighterID: number): boolean =>
    selectedFighterID === undefined ? false : selectedFighterID === fighterID

  useEffect(() => updateFighter(defaultSelectedFighterID), [
    defaultSelectedFighterID,
  ])

  return (
    <>
      <Select
        value={
          selectedFighterID === undefined ? voidFighterID : selectedFighterID
        }
        onChange={ev => {
          const fighterID = parseInt(ev.target.value as string)
          updateFighter(fighterID)
          if (onChange !== undefined) {
            onChange(fighterID)
          }
        }}
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
