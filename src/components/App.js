import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Link as RouterLink } from 'react-router-dom';
import Todo from '../containers/TodoContainer'
import About from './About/'

import styled from 'styled-components'
import {
  Button,
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';

const FixedWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
`

const ListStyled = styled(List)`
  width: 260px;
`

const Main = styled(Container)`
  width: calc(100% - 300px) !important;
  margin-right: 0 !important;
  margin-left: auto !important;
`

const ListItemLink = ({ icon, primary, to, onClick }) => {
  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );
  return (
    <ListItem button component={renderLink} onClick={onClick}>
      <ListItemText primary={primary}/>
    </ListItem>
  );
}

/**
 * アプリケーションのメイン
 */
const App = ({ user, login, refLogin, logout }) => {
  const [isLoading, setIsLoading] = useState(true)
  
  // ログイン情報を元にコレクションを取得する。なければ作成する
  useEffect(() => {
    refLogin(() => setIsLoading(false))
  }, [refLogin])

  if (user == null) {
    // ロード中
    if (isLoading) {
      return (
        <FixedWrapper>
          <CircularProgress />
        </FixedWrapper>
      )
    }
    // ユーザー情報がなければログインボタンを表示
    return (
      <FixedWrapper>
        <Card>
          <CardContent>
            <Typography variant="h3" component="h2" color="textSecondary" gutterBottom>TODO</Typography>
            <Typography variant="body2" component="p">
              Googleアカウントでログインしてください。
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: "center" }}>
            <Button variant="contained" color="primary" onClick={() => login()}>
              Gooele Login
            </Button>
          </CardActions>
        </Card>
      </FixedWrapper>
    )
  }

  // ユーザー情報があれば画面を構築
  return (
    <BrowserRouter>
      <Drawer
        variant="permanent"
        open
        >
        <ListStyled aria-label="secondary mailbox folders">
          <ListItem button key="1">
            <ListItemLink to="/" primary="TODO" />
          </ListItem>
          <ListItem button key="2">
            <ListItemLink to="/about" primary="ABOUT" />
          </ListItem>
          <ListItem button key="3">
            <ListItemLink to="/" primary="LOGOUT" onClick={() => logout()} />
          </ListItem>
        </ListStyled>
      </Drawer>
      <Main>
        <Route exact path="/">
          <Todo />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Main>
    </BrowserRouter>
  )
}

export default App