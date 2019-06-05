import { Fighter } from "../model"
import fighters from "../model/fighters.json"

type RawFighter = (typeof fighters)[number]

const byJaName = fighters.reduce<Record<string, RawFighter>>((a, f) => {
  a[f.name.ja] = f
  return a
}, {})

export const fetchFighterByNameJa = async (
  jaName: string
): Promise<Fighter | undefined> => byJaName[jaName]
