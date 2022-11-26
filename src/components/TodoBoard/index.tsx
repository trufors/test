import { FC, useState, useEffect } from 'react';

import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable } from '../StrictModeDroppable';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectTodosCompleted,
  selectTodosEntities,
  selectTodosIds,
  selectTodosNonCompleted,
  selectTodosStatus,
} from '../../store/slices/todos/selectors';

import { fetchUpdateTodo } from '../../store/slices/todos/asyncThunkTodos';
import { TodoList } from '../TodoList';

export const TodoBoard: FC = () => {
  const dispatch = useAppDispatch();
  const completedTodos = useAppSelector(selectTodosCompleted);
  const inProgressTodos = useAppSelector(selectTodosNonCompleted);
  const status = useAppSelector(selectTodosStatus);
  console.log(completedTodos, inProgressTodos);
  const entities = useAppSelector(selectTodosEntities);
  const ids = useAppSelector(selectTodosIds);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      console.log(source.droppableId, destination.droppableId);
      const sourceColIndex = ids!.findIndex((id) => id === source.droppableId);

      const destinationColIndex = ids!.findIndex((id) => id === destination.droppableId);
      const sourceCol = parseInt(source.droppableId) ? completedTodos : inProgressTodos;
      const destinationCol = parseInt(source.droppableId) ? inProgressTodos : completedTodos;
      console.log(sourceCol, destinationCol);
      const sourceTask = [...sourceCol];
      const destinationTask = [...destinationCol];
      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);
      console.log(removed);
      if (source.droppableId === '0') {
        console.log(2);
      }
      if (destination.droppableId === '0') {
        console.log(2);
      }
      // data[sourceColIndex].tasks = sourceTask;
      // data[destinationColIndex].tasks = destinationTask;
      // dispatch(fetchUpdateTodo({ id: removed.id }));
      // setData(data);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {status === 'loading' ? '' : <TodoList todos={inProgressTodos!} id={'0'} />}
      {status === 'loading' ? '' : <TodoList todos={completedTodos!} id={'1'} />}
    </DragDropContext>
  );
};
