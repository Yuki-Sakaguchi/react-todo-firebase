import React, { useState, useEffect } from 'react'
import Todo from './pages/Todo'
import styled from 'styled-components'
import { Input, Button, Container, Typography, Grid } from '@material-ui/core';
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
  const [input, setInput] = useState('')
  const [todoList, setTodoList] = useState([])
  const [finishedList, setFinishedList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isChangedTodo, setIsChangedTodo] = useState(false)
  const [isChangedFinishedTodo, setIsChangedFinishedTodo] = useState(false)

  const db = firebase.firestore()

  useEffect(() => {
    (async () => {
      const resTodo = await db.collection('todolist').doc('todo').get()
      if (resTodo.data()) setTodoList(resTodo.data().tasks)
      
      const resFinishedTodo = await db.collection('todolist').doc('finishedTodo').get()
      if (resFinishedTodo.data()) setFinishedList(resFinishedTodo.data().tasks)

      setIsLoading(false)
    })()
  }, [db])

  useEffect(() => {
    if (isChangedTodo) {
      (async () => {
        setIsLoading(true)
        const docRef = await db.collection('todolist').doc('todo')
        docRef.update({ tasks: todoList })
        setIsLoading(false)
      })()
    }
  }, [todoList, isChangedTodo, db])

  useEffect(() => {
    if (isChangedFinishedTodo) {
      (async () => {
        setIsLoading(true)
        const docRef = await db.collection('todolist').doc('finishedTodo')
        docRef.update({ tasks: finishedList })
        setIsLoading(false)
      })()
    }
    setIsChangedFinishedTodo(false)
  }, [db, finishedList, isChangedFinishedTodo])

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

  return (
    <Container maxWidth="xl">
      <Typography variant="h2" component="h1">TODO!!</Typography>
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
      {isLoading
        ? <Loading>loading</Loading>
        : <TodoContainer>
            <StyledSection>
              <Typography variant="h3" component="h2">TASK</Typography>
              <Todo todoList={todoList} deleteTodo={deleteTodo} changeTodoStatus={finishTodo} type="todo"/>
            </StyledSection>
            <StyledSection>
              <Typography variant="h3" component="h2">COMPLETE</Typography>
              <Todo todoList={finishedList} deleteTodo={deleteFinishTodo} changeTodoStatus={reopenTodo} type="done"/>
            </StyledSection>
          </TodoContainer>
      }
    </Container>
  )
}

export default App