import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// テーマを設定しているので[${props => props.theme.palette.primary.main}]こんな感じで呼び出せる
const StyledListItem = styled(ListItem)`
  &:not(:first-child) {
    border-top: 1px solid ${props => props.theme.palette.primary.main};
  }
`

const StyledButton = styled(Button)`
  margin: 0 5px;
`

const onDragEnd = (result, todoList, updateTodo, type) => {
  if (!result.destination) return;
  const { source, destination } = result;
  const _todoList = [...todoList]
  const [removed] = _todoList.splice(source.index, 1)
  _todoList.splice(destination.index, 0, removed)
  updateTodo(_todoList, type);
}

const Todo = ({ todoList, deleteTodo, changeTodoStatus, type , updateTodo}) => {
  return (
    <Grid container spacing={3}>
      <DragDropContext onDragEnd={result => onDragEnd(result, todoList, updateTodo, type)}>
        <Droppable droppableId={type}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  opacity: snapshot.isDraggingOver ? '0.5' : '1'
                }}
              >
                {todoList.map((todo, index) => {
                  console.log(todo, index)
                  return (
                    <Draggable key={todo.id} draggableId={todo.id} index={index}>
                      {(provided, snapshot) => {
                        return (
                          <StyledListItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: 'none',
                              opacity: snapshot.isDragging ? '0.5' : 1,
                              ...provided.draggableProps.style
                            }}
                          >
                            <Grid item xs={8}>
                              {todo.title}
                            </Grid>
                            <Grid item xs={4}>
                              <StyledButton variant="contained" color="primary" onClick={() => changeTodoStatus(index)}>{type === 'todo' ? '済み' : '戻す'}</StyledButton>
                              <StyledButton variant="contained" color="secondary" onClick={() => deleteTodo(index)}>削除</StyledButton>
                            </Grid>
                          </StyledListItem>
                        )
                      }}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
    </Grid>
  )
}

export default Todo