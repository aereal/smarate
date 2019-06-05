import { green } from "@material-ui/core/colors"
import SnackbarContent, {
  SnackbarContentProps,
} from "@material-ui/core/SnackbarContent"
import { makeStyles } from "@material-ui/core/styles"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import React, { FC } from "react"

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: 20,
    marginRight: theme.spacing(1),
    opacity: 0.9,
  },
  message: { display: "flex", alignItems: "center" },
  success: { backgroundColor: green[600] },
}))

export const SuccessfulSnackbarContent: FC<SnackbarContentProps> = ({
  message,
  ...rest
}) => {
  const classes = useStyles()
  return (
    <SnackbarContent
      className={classes.success}
      message={
        <span className={classes.message}>
          <CheckCircleIcon className={classes.icon} />
          {message}
        </span>
      }
      {...rest}
    />
  )
}
