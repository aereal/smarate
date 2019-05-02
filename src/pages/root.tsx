import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import React, { FunctionComponent } from "react"
import { AuthRequired } from "../components/auth"
import { Layout } from "../components/layout"
import { SignOut } from "../components/sign-out"
import { routes } from "../routes"

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
              <SignOut />
            </>
          )}
        </AuthRequired>
      </Grid>
    </Layout>
  )
}
