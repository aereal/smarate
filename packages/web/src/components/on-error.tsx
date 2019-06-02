import { ApolloError } from "apollo-client"
import { FC, ReactElement } from "react"

interface ChildProps {
  error: ApolloError
}

interface Props extends Partial<ChildProps> {
  children: (props: ChildProps) => ReactElement | null
}

export const OnError: FC<Props> = ({ children, error }) =>
  error !== undefined ? children({ error }) : null
