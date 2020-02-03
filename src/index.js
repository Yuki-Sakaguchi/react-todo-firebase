import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// Material-uiとstyled-componentsのテーマを揃える
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import theme from "./theme";

ReactDOM.render(
  <MaterialThemeProvider theme={theme}>
    <StyledThemeProvider theme={theme}>
      <App />
    </StyledThemeProvider>
  </MaterialThemeProvider>,
  document.getElementById('root')
)