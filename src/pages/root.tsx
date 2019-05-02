import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import firebase from "firebase"
import React, { FunctionComponent } from "react"
import { AuthRequired } from "../components/auth"
import { Layout } from "../components/layout"
import { routes } from "../routes"

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
})

export const RootPage: FunctionComponent<{}> = () => {
  return (
    <Layout>
      <Grid item={true} xs={12} sm={6}>
        <AuthRequired>
          {currentUser => (
            <>
              <Button {...routes.submitResult.link()}>
                試合結果を記録する
              </Button>
              <p>Hi, {currentUser.uid}</p>
            </>
          )}
        </AuthRequired>
      </Grid>
    </Layout>
  )
}
