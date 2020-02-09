import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// Material-uiとstyled-componentsのテーマを揃える
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import theme from "./theme";

// Firebaseの設定
import firebase from 'firebase'
import 'firebase/auth'
import firebaseConfig from './config'
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <MaterialThemeProvider theme={theme}>
    <StyledThemeProvider theme={theme}>
      <App />
    </StyledThemeProvider>
  </MaterialThemeProvider>,
  document.getElementById('root')
)