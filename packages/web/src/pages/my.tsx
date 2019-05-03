import Grid from "@material-ui/core/Grid"
import React, { FunctionComponent } from "react"
import { FighterSelectUnit } from "../components/fighter-select-unit"
import { Layout } from "../components/layout"
import { useAuth } from "../contexts/authentication"
import { useMyConfigAPI } from "../hooks/store-api"
import { routes } from "../routes"

export const MyPage: FunctionComponent = () => {
  const { currentUser, loaded } = useAuth()
  const { doFetch, error, fetchState, response } = useMyConfigAPI()

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
          <FighterSelectUnit
            label="良く使うファイター"
            fighterSelectorProps={{
              onChange: fighterID => {
                if (fighterID === undefined) {
                  return
                }
                doFetch({ defaultFighterID: fighterID })
              },
            }}
          />
        </Grid>
        {fetchState === "started" ? "saving ..." : null}
        {error !== undefined ? <pre>error: {JSON.stringify(error)}</pre> : null}
        {response !== undefined ? (
          <pre>response: {JSON.stringify(response)}</pre>
        ) : null}
      </Grid>
    </Layout>
  )
}
