import { Timestamp } from "@google-cloud/firestore"

const GLOBAL_RESULTS = "global_results" as const

const USER_RESULTS = "user_results" as const

interface FighterDTO {
  id: number
}

interface FightResultDTO {
  lostFighter: FighterDTO
  wonFighter: FighterDTO
  recordedAt: Timestamp
}

interface UserFightResultDTO {
  myFighter: FighterDTO
  rivalFighter: FighterDTO
  recordedAt: Timestamp
  won: boolean
}

export const fetchGlobalFightResults = async (
  db: FirebaseFirestore.Firestore,
  first: number
): Promise<FightResultDTO[]> => {
  const query = await db
    .collection(GLOBAL_RESULTS)
    .orderBy("recordedAt", "desc")
    .limit(first)
  const globalResultRefs = await query.get()
  return globalResultRefs.docs.map(
    snapshot => snapshot.data() as FightResultDTO
  )
}

export const fetchUserFightResults = async (
  db: FirebaseFirestore.Firestore,
  first: number
): Promise<FightResultDTO[]> => {
  const query = await db
    .collection(USER_RESULTS)
    .orderBy("recordedAt", "desc")
    .limit(first)
  const userResultRefs = await query.get()
  return userResultRefs.docs.map(snapshot =>
    userResultToGlobalResult(snapshot.data() as UserFightResultDTO)
  )
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

const userResultToGlobalResult = (dto: UserFightResultDTO): FightResultDTO => ({
  lostFighter: dto.won ? dto.rivalFighter : dto.myFighter,
  recordedAt: dto.recordedAt,
  wonFighter: dto.won ? dto.myFighter : dto.rivalFighter,
})
