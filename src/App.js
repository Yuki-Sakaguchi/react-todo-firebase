import React, { useState } from 'react'
import Todo from './pages/Todo'

import styled from 'styled-components'
import { Input, Button, Container, Typography, Grid } from '@material-ui/core';

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

const App = () => {
  const [input, setInput] = useState('')
  const [todoList, setTodoList] = useState([])
  const [finishedList, setFinishedList] = useState([])

  const addTodo = (e) => {
    e.preventDefault();
    if (!!input) {
      setTodoList([...todoList, input])
      setInput('')
    }
  }

  const deleteTodo = (index) => {
    setTodoList(todoList.filter((todo, i) => i !== index))
  }

  const deleteFinishTodo = (index) => {
    setFinishedList(finishedList.filter((todo, i) => i !== index))
  }

  const finishTodo = (index) => {
    deleteTodo(index)
    setFinishedList([...finishedList, todoList.find((todo, i) => i === index)])
  }

  const reopenTodo = (index) => {
    deleteFinishTodo(index)
    setTodoList([...todoList, finishedList.find((todo, i) => i === index)])
  }
  
  const changeInput = (e) => {
    setInput(e.target.value)
  }

  return (
    <Container maxWidth="1">
      <Typography variant="h2" component="h1">TODO</Typography>
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
    </Container>
  )
}

export default App