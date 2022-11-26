import { FC, useEffect } from 'react';

import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectTodoLists,
  selectTodosCompleted,
  selectTodosNonCompleted,
  selectTodosStatus,
} from '../../store/slices/todos/selectors';

import { fetchUpdateTodo } from '../../store/slices/todos/asyncThunkTodos';

import {
  changeCompletedTodo,
  setTodosLists,
  updateTodosCompleted,
  updateTodosInProgress,
  updateTodosListById,
} from '../../store/slices/todos/slice';
import { TodoListType, TodoType } from '../../types';
import { StrictModeDroppable } from '../StrictModeDroppable';
import styled from '@emotion/styled';
import { Box, Text } from '@chakra-ui/react';
import { Todo } from '../Todo';

const ScrollContainer = styled(Box)`
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TodoBoard: FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectTodosStatus);
  const todolist = useAppSelector(selectTodoLists) as TodoListType[];
  const completedTodos = useAppSelector(selectTodosCompleted) as TodoType[];
  const inProgressTodos = useAppSelector(selectTodosNonCompleted) as TodoType[];

  useEffect(() => {
    dispatch(updateTodosCompleted(completedTodos));
    dispatch(updateTodosInProgress(inProgressTodos));
  }, []);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = todolist!.findIndex((list) => list.id === source.droppableId);
      const destinationColIndex = todolist!.findIndex(
        (list) => list.id === destination.droppableId,
      );

      const sourceCol = todolist[sourceColIndex];
      const destinationCol = todolist[destinationColIndex];

      const sourceTask = [...sourceCol.todos];
      console.log(sourceTask);
      const destinationTask = [...destinationCol.todos];
      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);
      console.log(sourceColIndex);
      console.log(destinationColIndex);
      dispatch(updateTodosListById({ id: sourceColIndex.toString(), todos: sourceTask }));
      dispatch(updateTodosListById({ id: destinationColIndex.toString(), todos: destinationTask }));

      dispatch(fetchUpdateTodo({ id: removed.id.toString() }));
      dispatch(changeCompletedTodo(removed.id));
      setTodosLists(todolist);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {todolist.map((list) => (
        <StrictModeDroppable key={list.id} droppableId={list.id}>
          {(provided) => (
            <>
              <Text>{list.id === '1' ? 'Active' : 'Completed'}</Text>
              <ScrollContainer
                h="700px"
                w="500px"
                bgColor="white"
                overflow="scroll"
                boxShadow="xl"
                rounded="md"
                p="20px 25px"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {list.todos.map((todo, index) => (
                  <Draggable
                    key={todo.id.toString()}
                    draggableId={todo.id.toString()}
                    index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? '0.5' : '1',
                          marginBottom: '10px',
                        }}>
                        <Todo {...todo} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ScrollContainer>
            </>
          )}
        </StrictModeDroppable>
      ))}
    </DragDropContext>
  );
};
