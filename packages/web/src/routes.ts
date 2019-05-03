import { createRouter, defineRoute } from "type-route"

const { routes, listen, getCurrentRoute } = createRouter({
  my: defineRoute("/my"),
  root: defineRoute("/"),
  submitResult: defineRoute("/submit-result"),
})

export { routes, listen, getCurrentRoute }
