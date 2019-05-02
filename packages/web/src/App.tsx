import React, { FunctionComponent, useEffect, useState } from "react"
import { Route } from "type-route"
import { CurrentUserIdTokenProvider, FirebaseAuthProvider } from "./auth"
import { AuthProvider } from "./components/auth"
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
    default:
      return <>Not Found</>
  }
}

export const App: FunctionComponent<{}> = () => {
  const [route, setRoute] = useState(getCurrentRoute())

  useEffect(() => {
    const listener = listen(nextRoute => {
      setRoute(nextRoute)
    })

    return () => listener.remove()
  }, [])

  return (
    <FirebaseAuthProvider>
      <AuthProvider>
        <CurrentUserIdTokenProvider>
          <Page route={route} />
        </CurrentUserIdTokenProvider>
      </AuthProvider>
    </FirebaseAuthProvider>
  )
}
