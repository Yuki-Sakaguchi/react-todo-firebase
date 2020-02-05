import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import firebase from 'firebase'

// Material-uiとstyled-componentsのテーマを揃える
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import theme from "./theme";

const firebaseConfig = {
  apiKey: "AIzaSyBO874ssnsg1C7vS2QTd7pVgpiXea2C2H0",
  authDomain: "todolist-402ab.firebaseapp.com",
  databaseURL: "https://todolist-402ab.firebaseio.com",
  projectId: "todolist-402ab",
  storageBucket: "todolist-402ab.appspot.com",
  messagingSenderId: "83303513750",
  appId: "1:83303513750:web:c8503fcd40ba8b70554cb7"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <MaterialThemeProvider theme={theme}>
    <StyledThemeProvider theme={theme}>
      <App />
    </StyledThemeProvider>
  </MaterialThemeProvider>,
  document.getElementById('root')
)