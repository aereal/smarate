import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import React, { FunctionComponent } from "react"
import { Layout } from "../components/layout"
import { SignIn } from "../components/sign-in"
import { SignOut } from "../components/sign-out"
import {
  isSuccessfullySignedIn,
  useCurrentUser,
} from "../contexts/current-user"
import { routes } from "../routes"

export const RootPage: FunctionComponent<{}> = () => {
  const state = useCurrentUser()
  return (
    <Layout>
      <Grid item={true} xs={12} sm={6}>
        {isSuccessfullySignedIn(state) ? (
          <>
            <Button {...routes.submitResult.link()}>試合結果を記録する</Button>
            <Button {...routes.my.link()}>マイページ</Button>
            <p>Hi, {state.currentUser.uid}</p>
            <SignOut />
          </>
        ) : (
          <SignIn />
        )}
      </Grid>
    </Layout>
  )
}
