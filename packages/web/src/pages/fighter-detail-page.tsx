import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import React, { FC } from "react"
import { Route } from "type-route"
import { Layout } from "../components/layout"
import { routes } from "../routes"

interface Props {
  route: Route<typeof routes.fighterDetail>
}

export const FighterDetailPage: FC<Props> = ({ route: { params } }) => (
  <Layout>
    <Grid item={true} xs={12}>
      <Typography variant="h4">Fighter: {params.fighterID}</Typography>
    </Grid>
  </Layout>
)
