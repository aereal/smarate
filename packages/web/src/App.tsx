import React, { FunctionComponent, useEffect, useState } from "react"
import { Route } from "type-route"
import { DefaultCurrentUserProvider } from "./contexts/current-user"
import { CurrentUserIdTokenProvider } from "./contexts/current-user-id-token"
import { MyPage } from "./pages/my"
import { RootPage } from "./pages/root"
import { SubmitResultPage } from "./pages/submit-result"
import { getCurrentRoute, listen, routes } from "./routes"

const Page: FunctionComponent<{ route: Route<typeof routes> }> = ({
  route,
}) => {
  switch (route.name) {
    case routes.root.name:
      return <RootPage />
    case routes.submitResult.name:
      return <SubmitResultPage />
    case routes.my.name:
      return <MyPage />
    default:
      return <>Not Found</>
  }
}

export const App: FunctionComponent<{}> = () => {
  const [route, setRoute] = useState(getCurrentRoute())

  useEffect(() => listen(setRoute), [])

  return (
    <DefaultCurrentUserProvider>
      <CurrentUserIdTokenProvider>
        <Page route={route} />
      </CurrentUserIdTokenProvider>
    </DefaultCurrentUserProvider>
  )
}
