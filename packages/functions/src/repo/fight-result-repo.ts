import { Timestamp } from "@google-cloud/firestore"
import { FighterFightResult } from "../model"

const GLOBAL_RESULTS = "global_results" as const

const USER_RESULTS = "user_results" as const

interface FighterDTO<ID extends string | number> {
  id: ID
}

interface GlobalFightResultDTO<ID extends string | number = number> {
  lostFighter: FighterDTO<ID>
  wonFighter: FighterDTO<ID>
  recordedAt: Timestamp
}

interface UserFightResultDTO<ID extends string | number = number> {
  myFighter: FighterDTO<ID>
  rivalFighter: FighterDTO<ID>
  recordedAt: Timestamp
  won: boolean
}

export const fetchFighterFightResultsByFighterID = async (
  db: FirebaseFirestore.Firestore,
  fighterID: number,
  first: number,
  startsAt: Date | null,
  endsAt: Date | null
): Promise<FighterFightResult[]> => {
  const [wonResultRefs, lostResultRefs] = await Promise.all([
    await fetchResults(db, fighterID, first, true, startsAt, endsAt),
    await fetchResults(db, fighterID, first, false, startsAt, endsAt),
  ])
  const reducedResultRefs = wonResultRefs.concat(lostResultRefs)
  reducedResultRefs.sort(
    (a, b) => (a.recordedAt.toMillis() - b.recordedAt.toMillis()) * -1
  )
  return reducedResultRefs.splice(0, first)
}

const fetchResults = async (
  db: FirebaseFirestore.Firestore,
  fighterID: number,
  first: number,
  won: boolean,
  startsAt: Date | null,
  endsAt: Date | null
): Promise<FighterFightResult[]> => {
  const whereFieldPath = won ? "wonFighter.id" : "lostFighter.id"
  let query = await db
    .collection(GLOBAL_RESULTS)
    .where(whereFieldPath, "==", fighterID)
    .orderBy("recordedAt", "desc")
    .limit(first)
  if (startsAt !== null) {
    query = query.where("recordedAt", ">", Timestamp.fromDate(startsAt))
  }
  if (endsAt !== null) {
    query = query.where("recordedAt", "<=", Timestamp.fromDate(endsAt))
  }
  const resultRefs = await query.get()
  return resultRefs.docs.map(snapshot =>
    globalFightResultToFighterFightResult(
      snapshot.data() as GlobalFightResultDTO<string | number>,
      fighterID
    )
  )
}

const globalFightResultToFighterFightResult = <
  ID extends string | number = number
>(
  from: GlobalFightResultDTO<ID>,
  fighterID: ID
): FighterFightResult => {
  const { wonFighter, lostFighter, recordedAt } = from
  const won = wonFighter.id.toString() === fighterID.toString()
  const myFighter = won ? wonFighter : lostFighter
  const rivalFighter = won ? lostFighter : wonFighter
  return {
    myFighter: normalizeFighterDTO(myFighter),
    recordedAt,
    rivalFighter: normalizeFighterDTO(rivalFighter),
    won,
  }
}

const normalizeFighterDTO = (
  input: FighterDTO<string | number>
): FighterDTO<number> => ({
  id: typeof input.id === "string" ? parseInt(input.id, 10) : input.id,
})

export const fetchGlobalFightResults = async (
  db: FirebaseFirestore.Firestore,
  first: number
): Promise<GlobalFightResultDTO[]> => {
  const query = await db
    .collection(GLOBAL_RESULTS)
    .orderBy("recordedAt", "desc")
    .limit(first)
  const globalResultRefs = await query.get()
  return globalResultRefs.docs.map(snapshot => {
    const data = snapshot.data() as GlobalFightResultDTO<string | number>
    return {
      ...data,
      lostFighter: normalizeFighterDTO(data.lostFighter),
      wonFighter: normalizeFighterDTO(data.wonFighter),
    }
  })
}

export const fetchUserFightResults = async (
  db: FirebaseFirestore.Firestore,
  first: number
): Promise<UserFightResultDTO[]> => {
  const query = await db
    .collection(USER_RESULTS)
    .orderBy("recordedAt", "desc")
    .limit(first)
  const userResultRefs = await query.get()
  return userResultRefs.docs.map(snapshot => {
    const data = snapshot.data() as UserFightResultDTO<string | number>
    return {
      ...data,
      myFighter: {
        id:
          typeof data.myFighter.id === "string"
            ? parseInt(data.myFighter.id, 10)
            : data.myFighter.id,
      },
      rivalFighter: {
        id:
          typeof data.rivalFighter.id === "string"
            ? parseInt(data.rivalFighter.id, 10)
            : data.rivalFighter.id,
      },
    }
  })
}

interface RecordFightResultInput
  extends Pick<
    UserFightResultDTO,
    Exclude<keyof UserFightResultDTO, "recordedAt">
  > {
  userID: string
}

export const recordFightResult = async (
  db: FirebaseFirestore.Firestore,
  input: RecordFightResultInput
): Promise<boolean> => {
  const { won, myFighter, rivalFighter } = input
  const recordedAt = new Date()
  const wonFighter = won ? myFighter : rivalFighter
  const lostFighter = won ? rivalFighter : myFighter

  const batch = db.batch()
  const globalResultRef = db.collection(GLOBAL_RESULTS).doc()
  batch.set(globalResultRef, {
    lostFighter,
    recordedAt,
    wonFighter,
  })

  const userResultRef = db.collection(USER_RESULTS).doc()
  batch.set(userResultRef, {
    myFighter,
    recordedAt,
    rivalFighter,
    won,
  })

  await batch.commit()
  return true
}
