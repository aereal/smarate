import Grid from "@material-ui/core/Grid"
import React, { FunctionComponent } from "react"
import { FighterSelectUnit } from "../components/fighter-select-unit"
import { Layout } from "../components/layout"
import { useAuth } from "../contexts/authentication"
import { routes } from "../routes"

export const MyPage: FunctionComponent = () => {
  const { currentUser, loaded } = useAuth()

  if (!loaded) {
    return null
  }

  if (currentUser === undefined) {
    routes.root.push()
    return null
  }

  return (
    <Layout>
      <Grid item={true} xs={12} sm={6}>
        <Grid item={true} xs={12} sm={6}>
          <FighterSelectUnit label="良く使うファイター" />
        </Grid>
      </Grid>
    </Layout>
  )
}
