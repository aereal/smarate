export const withDelay = async <R>(f: () => R, delay: number): Promise<R> =>
  new Promise(ok =>
    setTimeout(() => {
      ok(f())
    }, delay)
  )
