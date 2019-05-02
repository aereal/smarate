import { createRouter, defineRoute } from "type-route"

const { routes, listen, getCurrentRoute } = createRouter({
  root: defineRoute("/"),
  submitResult: defineRoute("/submit-result"),
})

export { routes, listen, getCurrentRoute }
