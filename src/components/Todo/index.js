import React, { useState, useEffect } from 'react'
import Todo from './todolist'

import uuid from 'uuid/v4'

import firebase from 'firebase'
import 'firebase/firestore'

import styled from 'styled-components'
import {
  Input,
  Button,
  Typography,
  Grid,
  Avatar
} from '@material-ui/core';

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

/**
 * タスクページ
 */
const TodoPage = (props) => {
  const user = props.user
  const [input, setInput] = useState('')
  const [todoList, setTodoList] = useState([])
  const [finishedList, setFinishedList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isChangedTodo, setIsChangedTodo] = useState(false)
  const [isChangedFinishedTodo, setIsChangedFinishedTodo] = useState(false)

  const db = firebase.firestore()

  // コレクションのデータをステータスに反映
  useEffect(() => {
    if (user == null) return
    (async () => {
      const resTodo = await db.collection('todolist').doc(user.uid).get()
      if (resTodo.data().todo.tasks) setTodoList(resTodo.data().todo.tasks)
      if (resTodo.data().finishedTodo.tasks) setFinishedList(resTodo.data().finishedTodo.tasks)
      setIsLoading(false)
    })()
  }, [db, user])

  // タスクを追加
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

  // 完了タスクを追加
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
      setTodoList([...todoList, {
        title: input,
        id: uuid(),
      }])
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

  const updateTodo = (todoList, type) => {
    setIsChangedTodo(true)
    setIsChangedFinishedTodo(true)
    if (type === 'todo') {
      setTodoList([...todoList])
    } else if (type === 'done') {
      setFinishedList([...todoList])
    }
  }
  
  const changeInput = (e) => {
    setInput(e.target.value)
  }

  return (
    <>
      <Typography variant="h2" component="h1">TODO!!</Typography>
      {!user
        ? <div>loading</div>
        : (
          <>
            <Avatar alt={user.displayName} src={user.photoURL} />
            <p>{user.displayName}さん</p>
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
                  <Todo todoList={todoList} deleteTodo={deleteTodo} changeTodoStatus={finishTodo} type="todo" updateTodo={updateTodo}/>
                </StyledSection>
                <StyledSection>
                  <Typography variant="h3" component="h2">COMPLETE</Typography>
                  <Todo todoList={finishedList} deleteTodo={deleteFinishTodo} changeTodoStatus={reopenTodo} type="done" updateTodo={updateTodo}/>
                </StyledSection>
              </TodoContainer>
            )}
          </>
        )}
    </>
  )
}

export default TodoPage