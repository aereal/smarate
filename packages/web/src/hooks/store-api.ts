import { useContext, useEffect, useState } from "react"
import { CurrentUserIdTokenContext } from "../contexts/current-user-id-token"

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
        const res = await window.fetch(endpoint + "/", {
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

interface ErrorResponse {
  errors: ReadonlyArray<{ message: string; extra?: any }>
}

export const isError = (res: object): res is ErrorResponse =>
  "errors" in res && Array.isArray((res as { errors: any }).errors)

type FState = "uninitialized" | "started" | "completed"

const createAPIEffect = <I, O>(url: string, method: string) => {
  return () => {
    const { idToken } = useContext(CurrentUserIdTokenContext)
    const [fetchState, setFetchState] = useState<FState>("uninitialized")
    const [error, setError] = useState<Error>()
    const [response, setResponse] = useState<O | ErrorResponse>()
    const [request, setRequest] = useState<I>()
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
          setFetchState("started")
          setError(undefined)
          const res = await window.fetch(url, {
            body: JSON.stringify(request),
            headers: {
              ["content-type"]: "application/json",
              authorization: `token ${idToken}`,
            },
            method,
          })
          const resBody = await res.json()
          setResponse(resBody)
        } catch (e) {
          setError(e)
        }
        setFetchState("completed")
      }
      sendRequest()
    }, [queue, request])

    const doFetch = (r: I) => {
      enqueue(prev => prev + 1)
      setRequest(r)
    }

    return {
      doFetch,
      error,
      fetchState,
      response,
    }
  }
}

export const useMyConfigAPI = createAPIEffect<
  MyConfigAPIRequest,
  MyConfigAPIResponse
>(`${endpoint}/my`, "POST")

interface MyConfigAPIRequest {
  defaultFighterID: number | undefined
}

interface MyConfigAPIResponse {
  ok: boolean
}
