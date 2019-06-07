import pink from "@material-ui/core/colors/pink"
import teal from "@material-ui/core/colors/teal"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import React, { FC } from "react"

const customizedTheme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: teal,
  },
})

export const CustomizedThemeProvider: FC = ({ children }) => (
  <MuiThemeProvider theme={customizedTheme}>{children}</MuiThemeProvider>
)
