/**
 * Material-uiのテーマを設定
 */
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#add8e6",
      dark: "#82a5b1",
      light: "#cfeff9"
    },
    secondary: {
      main: "#fbe1a9"
    },
    text: {
      primary: "#444444",
      secondary: "#757575"
    }
  }
});

export default theme;