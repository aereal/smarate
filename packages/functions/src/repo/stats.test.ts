import { Timestamp } from "@google-cloud/firestore"
import { FighterFightResult } from "../model"
import { calculateWinRate } from "./stats"

describe("repos.calculateWinRate", () => {
  test("empty results", () => {
    const got = calculateWinRate([])
    expect(got).toStrictEqual(new Map())
  })

  test("with only one rival fighters", () => {
    const mario = { id: 1 }
    const got = calculateWinRate([
      {
        myFighter: { id: 62 },
        recordedAt: Timestamp.now(),
        rivalFighter: mario,
        won: true,
      },
      {
        myFighter: { id: 62 },
        recordedAt: Timestamp.now(),
        rivalFighter: mario,
        won: false,
      },
    ])
    expect(got).toStrictEqual(new Map<number, number>([[mario.id, 0.5]]))
  })

  test("with multiple rival fighters", () => {
    const mario = { id: 1 }
    const link = { id: 3 }
    const got = calculateWinRate([
      {
        myFighter: { id: 62 },
        recordedAt: Timestamp.now(),
        rivalFighter: mario,
        won: true,
      },
      {
        myFighter: { id: 62 },
        recordedAt: Timestamp.now(),
        rivalFighter: mario,
        won: false,
      },
      {
        myFighter: { id: 62 },
        recordedAt: Timestamp.now(),
        rivalFighter: link,
        won: false,
      },
    ])
    expect(got).toStrictEqual(
      new Map<number, number>([[mario.id, 0.5], [link.id, 0]])
    )
  })
})
