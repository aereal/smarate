import firebase from "firebase"

export const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
})

export const requestGoogleSignIn = async () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  try {
    await firebase.auth().signInWithPopup(provider)
  } catch (e) {
    console.error(e) // tslint:disable-line:no-console
  }
}

export const signOut = async () => {
  await firebase.auth().signOut()
}
