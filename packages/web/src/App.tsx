import React, { FunctionComponent, useEffect, useState } from "react"
import { Route } from "type-route"
import { AuthenApolloProvider } from "./contexts/authen-apollo"
import { DefaultCurrentUserProvider } from "./contexts/current-user"
import { CurrentUserIdTokenProvider } from "./contexts/current-user-id-token"
import { FighterDetailPage } from "./pages/fighter-detail-page"
import { MyPage } from "./pages/my"
import { RootPage } from "./pages/root"
import { SubmitResultPage } from "./pages/submit-result"
import { getCurrentRoute, listen, routes } from "./routes"
import { CustomizedThemeProvider } from "./theme"

const Page: FunctionComponent<{ route: Route<typeof routes> }> = ({
  route,
}) => {
  switch (route.name) {
    case routes.fighterDetail.name:
      return <FighterDetailPage route={route} />
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
        <AuthenApolloProvider>
          <CustomizedThemeProvider>
            <Page route={route} />
          </CustomizedThemeProvider>
        </AuthenApolloProvider>
      </CurrentUserIdTokenProvider>
    </DefaultCurrentUserProvider>
  )
}
