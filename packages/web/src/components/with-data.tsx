import { ReactElement } from "react"

interface ChildProps<T> {
  data: T
}

interface Props<T> extends Partial<ChildProps<T>> {
  children: (props: ChildProps<T>) => ReactElement | null
}

export const WithData = <T extends {}>({ children, data }: Props<T>) =>
  data !== undefined && Object.keys(data).length > 0 ? children({ data }) : null
