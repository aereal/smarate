interface UserPreferenceDTO {
  defaultFighterID?: number
}

const USER_PREFERENCES = "user_preferences" as const

export const fetchUserPreference = async (
  db: FirebaseFirestore.Firestore,
  userID: string
): Promise<UserPreferenceDTO | undefined> => {
  const ref = db.collection(USER_PREFERENCES).doc(userID)
  const got = await ref.get()
  return got.exists ? (got.data() as UserPreferenceDTO) : undefined
}

export const setUserPreference = async (
  db: FirebaseFirestore.Firestore,
  input: UserPreferenceDTO & { userID: string }
): Promise<boolean> => {
  if (input.defaultFighterID === undefined) {
    return false
  }

  const ref = db.collection(USER_PREFERENCES).doc(input.userID)
  await ref.set({
    defaultFighterID: input.defaultFighterID,
  })
  return true
}
