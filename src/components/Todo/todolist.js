import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'

// テーマを設定しているので[${props => props.theme.palette.primary.main}]こんな感じで呼び出せる
const StyledListItem = styled(ListItem)`
  &:not(:first-child) {
    border-top: 1px solid ${props => props.theme.palette.primary.main};
  }
`

const StyledButton = styled(Button)`
  margin: 0 5px;
`

const Todo = ({ todoList, deleteTodo, changeTodoStatus, type }) => {
  return (
    <Grid container spacing={3}>
      {todoList.map((todo, index) => (
        <StyledListItem key={index}>
          <Grid item xs={8}>
            {todo}
          </Grid>
          <Grid item xs={4}>
            <StyledButton variant="contained" color="primary" onClick={() => changeTodoStatus(index)}>{type === 'todo' ? '済み' : '戻す'}</StyledButton>
            <StyledButton variant="contained" color="secondary" onClick={() => deleteTodo(index)}>削除</StyledButton>
          </Grid>
        </StyledListItem>
      ))}
    </Grid>
  )
}

export default Todo