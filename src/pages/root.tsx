import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import React, { FunctionComponent } from "react"
import { Layout } from "../components/layout"
import { routes } from "../routes"

export const RootPage: FunctionComponent<{}> = () => (
  <Layout>
    <Grid item={true} xs={12} sm={6}>
      <Button {...routes.submitResult.link()}>試合結果を記録する</Button>
    </Grid>
  </Layout>
)
