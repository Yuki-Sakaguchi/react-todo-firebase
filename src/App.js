import React, { useState, useEffect } from 'react'
import Todo from './pages/Todo'
import styled from 'styled-components'
import { Input, Button, Container, Typography, Grid, Avatar } from '@material-ui/core';
import firebase from 'firebase'
import 'firebase/firestore'

const StyledSection = styled.section`
  margin: 40px 0;
`

const TodoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  > * {
    width: 48%;
  }
`;

const Loading = styled.div`
  margin: 40px auto;
`;

const App = () => {
  const [user, setUser] = useState(null)
  const [input, setInput] = useState('')
  const [todoList, setTodoList] = useState([])
  const [finishedList, setFinishedList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isChangedTodo, setIsChangedTodo] = useState(false)
  const [isChangedFinishedTodo, setIsChangedFinishedTodo] = useState(false)

  const db = firebase.firestore()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      // 対象のコレクションがなければ作る
      if (user != null) {
        const collection = await db.collection('todolist').doc(user.uid).get();
        if (!collection.exists) {
          db.collection('todolist').doc(user.uid).set({
            todo: {
              tasks: []
            },
            finishedTodo: {
              tasks: []
            },
          })
        }
      }
      setUser(user)
    })
  }, [db, user])

  useEffect(() => {
    if (user == null) return
    (async () => {
      const resTodo = await db.collection('todolist').doc(user.uid).get()
      if (resTodo.data().todo.tasks) setTodoList(resTodo.data().todo.tasks)
      if (resTodo.data().finishedTodo.tasks) setFinishedList(resTodo.data().finishedTodo.tasks)
      setIsLoading(false)
    })()
  }, [db, user])

  useEffect(() => {
    if (user == null) return
    if (isChangedTodo) {
      (async () => {
        setIsLoading(true)
        const docRef = await db.collection('todolist').doc(user.uid)
        docRef.update({ todo: { tasks: todoList }})
        setIsLoading(false)
      })()
    }
  }, [todoList, isChangedTodo, db, user])

  useEffect(() => {
    if (user == null) return
    if (isChangedFinishedTodo) {
      (async () => {
        setIsLoading(true)
        const docRef = await db.collection('todolist').doc(user.uid)
        docRef.update({ finishedTodo: { tasks: finishedList }})
        setIsLoading(false)
      })()
    }
    setIsChangedFinishedTodo(false)
  }, [db, finishedList, isChangedFinishedTodo, user])

  const addTodo = async (e) => {
    e.preventDefault();
    if (!!input) {
      setIsChangedTodo(true)
      setTodoList([...todoList, input])
      setInput('')
    }
  }

  const deleteTodo = (index) => {
    setIsChangedTodo(true)
    setTodoList(todoList.filter((todo, i) => i !== index))
  }

  const deleteFinishTodo = (index) => {
    setIsChangedFinishedTodo(true)
    setFinishedList(finishedList.filter((todo, i) => i !== index))
  }

  const finishTodo = (index) => {
    setIsChangedTodo(true)
    setIsChangedFinishedTodo(true)
    deleteTodo(index)
    setFinishedList([...finishedList, todoList.find((todo, i) => i === index)])
  }

  const reopenTodo = (index) => {
    setIsChangedTodo(true)
    setIsChangedFinishedTodo(true)
    deleteFinishTodo(index)
    setTodoList([...todoList, finishedList.find((todo, i) => i === index)])
  }
  
  const changeInput = (e) => {
    setInput(e.target.value)
  }

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }

  const logout = () => {
    firebase.auth().signOut()
  }

  if (user == null) {
    return <button onClick={() => login()}>Gooele Login</button>
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h2" component="h1">TODO!!</Typography>
      <Avatar alt={user.displayName} src={user.photoURL} />
      <p>{user.displayName}さん</p>
      <button onClick={() => logout()}>Logout</button>
      <form onSubmit={(e) => addTodo(e)}>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <Input fullWidth={true} onChange={(e) => changeInput(e)} value={input}/>
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" color="primary" onClick={(e) => addTodo(e)} type="submit">追加</Button>
          </Grid>
        </Grid>
      </form>
      {isLoading ? (
        <Loading>loading</Loading>
      ) : (
        <TodoContainer>
          <StyledSection>
            <Typography variant="h3" component="h2">TASK</Typography>
            <Todo todoList={todoList} deleteTodo={deleteTodo} changeTodoStatus={finishTodo} type="todo"/>
          </StyledSection>
          <StyledSection>
            <Typography variant="h3" component="h2">COMPLETE</Typography>
            <Todo todoList={finishedList} deleteTodo={deleteFinishTodo} changeTodoStatus={reopenTodo} type="done"/>
          </StyledSection>
        </TodoContainer>
      )}
    </Container>
  )
}

export default App