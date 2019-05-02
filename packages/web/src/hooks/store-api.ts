import { useContext, useEffect, useState } from "react"
import { CurrentUserIdTokenContext } from "../auth"

type FetchState = "undetermined" | "successful" | "error"

interface Credentials {
  token: string
}

interface ResponseData {
  body: string
}

const endpoint = process.env.REACT_APP_STORE_API_ENDPOINT!

export const useStoreAPI = (credentials?: Credentials) => {
  const { idToken } = useContext(CurrentUserIdTokenContext)
  const [fetchState, setFetchState] = useState<FetchState>("undetermined")
  const [responseData, setResponseData] = useState<ResponseData>()
  const [queue, enqueue] = useState(0)

  useEffect(() => {
    const sendRequest = async () => {
      // do not send request on componentDidMount
      if (queue < 1) {
        return
      }

      if (idToken === undefined) {
        return
      }

      try {
        const res = await window.fetch(endpoint, {
          headers: {
            Authorization: `token ${idToken}`,
          },
        })
        const body = await res.text()
        setResponseData({ body })
      } catch (e) {
        setFetchState("error")
      }
    }

    sendRequest()
  }, [queue])

  const doFetch = (): void => enqueue(prev => prev + 1)

  return {
    doFetch,
    fetchState,
    responseData,
  }
}
