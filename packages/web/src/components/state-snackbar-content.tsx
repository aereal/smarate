import { green } from "@material-ui/core/colors"
import SnackbarContent, {
  SnackbarContentProps,
} from "@material-ui/core/SnackbarContent"
import { makeStyles } from "@material-ui/core/styles"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import ErrorIcon from "@material-ui/icons/Error"
import React, { FC } from "react"

const icons = {
  error: ErrorIcon,
  success: CheckCircleIcon,
}

const useStyles = makeStyles(theme => ({
  error: { backgroundColor: theme.palette.error.dark },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing(1),
    opacity: 0.9,
  },
  message: { display: "flex", alignItems: "center" },
  success: { backgroundColor: green[600] },
}))

const StateSnackbarContent: FC<
  SnackbarContentProps & { variant: "success" | "error" }
> = ({ message, variant, ...rest }) => {
  const classes = useStyles()
  const VariantIcon = icons[variant]
  return (
    <SnackbarContent
      className={classes[variant]}
      message={
        <span className={classes.message}>
          <VariantIcon className={classes.icon} />
          {message}
        </span>
      }
      {...rest}
    />
  )
}

export const SuccessfulSnackbarContent: FC<SnackbarContentProps> = props => (
  <StateSnackbarContent variant="success" {...props} />
)

export const ErrorSnackbarContent: FC<SnackbarContentProps> = props => (
  <StateSnackbarContent variant="error" {...props} />
)
