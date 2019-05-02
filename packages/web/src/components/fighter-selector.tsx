import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import React, { useState } from "react"
import { Fighter, fighters } from "../models/fighter"

export interface Props {
  candidates?: ReadonlyArray<Fighter>
  defaultSelectedFighterID?: number
}

const voidFighterID = -1

export const FighterSelector: React.FunctionComponent<Props> = ({
  candidates,
  defaultSelectedFighterID,
}) => {
  const [selectedFighterID, updateFighter] = useState(defaultSelectedFighterID)
  const candidateFighters = candidates || fighters
  const isSelected = (fighterID: number): boolean =>
    selectedFighterID === undefined ? false : selectedFighterID === fighterID
  return (
    <>
      <Select
        value={
          selectedFighterID === undefined ? voidFighterID : selectedFighterID
        }
        onChange={ev => updateFighter(parseInt(ev.target.value))}
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
