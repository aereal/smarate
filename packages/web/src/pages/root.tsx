import Grid from "@material-ui/core/Grid"
import React, { FunctionComponent } from "react"
import { Layout } from "../components/layout"
import { SignIn } from "../components/sign-in"
import {
  isSuccessfullySignedIn,
  useCurrentUser,
} from "../contexts/current-user"

export const RootPage: FunctionComponent<{}> = () => {
  const state = useCurrentUser()
  return (
    <Layout>
      <Grid item={true} xs={12} sm={6}>
        {isSuccessfullySignedIn(state) ? (
          <>
            <p>Hi, {state.currentUser.uid}</p>
          </>
        ) : (
          <SignIn />
        )}
      </Grid>
    </Layout>
  )
}
