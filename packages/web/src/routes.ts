import { createRouter, defineRoute } from "type-route"

const { routes, listen, getCurrentRoute } = createRouter({
  fighterDetail: defineRoute(
    {
      fighterID: "path.param.number",
    },
    params => `/fighters/${params.fighterID}`
  ),
  my: defineRoute("/my"),
  root: defineRoute("/"),
  submitResult: defineRoute("/submit-result"),
})

export { routes, listen, getCurrentRoute }
