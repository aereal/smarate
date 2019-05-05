import Grid from "@material-ui/core/Grid"
import React, { FunctionComponent, useEffect } from "react"
import { FighterSelectUnit } from "../components/fighter-select-unit"
import { Layout } from "../components/layout"
import { useAuth } from "../contexts/authentication"
import { useGetMyConfigAPI, useUpdateMyConfigAPI } from "../hooks/store-api"
import { routes } from "../routes"

export const MyPage: FunctionComponent = () => {
  const { currentUser, loaded } = useAuth()
  const {
    doFetch: doUpdateMyConfig,
    response: updateResponse,
  } = useUpdateMyConfigAPI()
  const {
    doFetch: doGetMyConfig,
    response: getMyConfigResponse,
  } = useGetMyConfigAPI()

  useEffect(() => {
    doGetMyConfig(undefined)
  }, [])

  if (!loaded) {
    return null
  }

  if (currentUser === undefined) {
    routes.root.push()
    return null
  }

  const defaultSelectedFighterID =
    getMyConfigResponse &&
    (getMyConfigResponse as { defaultFighterID: number }).defaultFighterID

  return (
    <Layout>
      <Grid item={true} xs={12} sm={6}>
        <Grid item={true} xs={12} sm={6}>
          <FighterSelectUnit
            label="良く使うファイター"
            fighterSelectorProps={{
              defaultSelectedFighterID,
              onChange: fighterID => {
                if (fighterID === undefined) {
                  return
                }
                doUpdateMyConfig({ defaultFighterID: fighterID })
              },
            }}
          />
        </Grid>
        {updateResponse !== undefined ? (
          <pre>response: {JSON.stringify(updateResponse)}</pre>
        ) : null}
        {getMyConfigResponse !== undefined ? (
          <pre>response: {JSON.stringify(getMyConfigResponse)}</pre>
        ) : null}
      </Grid>
    </Layout>
  )
}
