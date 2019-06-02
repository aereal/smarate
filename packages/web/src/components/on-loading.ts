import { FC, ReactElement } from "react"

interface ChildProps {
  loading: boolean
}

interface Props extends ChildProps {
  children: (props: ChildProps) => ReactElement | null
}

export const OnLoading: FC<Props> = ({ loading, children }) =>
  loading ? children({ loading }) : null
