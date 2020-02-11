import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from './containers/AppContainer'

// Redux
import { createStore } from 'redux'
import Reducer from './reducers'
import { Provider } from 'react-redux'

// Material-uiとstyled-componentsのテーマを揃える
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import theme from "./theme";

// Firebaseの設定
import firebase from 'firebase'
import 'firebase/auth'
import firebaseConfig from './firebase/config'
const store = createStore(Reducer)
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <MaterialThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <AppContainer />
      </StyledThemeProvider>
    </MaterialThemeProvider>
  </Provider>,
  document.getElementById('root')
)