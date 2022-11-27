import { FC, useEffect } from 'react';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Box, Text } from '@chakra-ui/react';
import {
  selectTodosCompleted,
  selectTodosNonCompleted,
  selectTodosStatus,
} from '../../store/slices/todos/selectors';

import { fetchUpdateTodo } from '../../store/slices/todos/asyncThunkTodos';
import {
  changeCompletedTodo,
  selectBoards,
  setTodosLists,
  updateTodosCompleted,
  updateTodosInProgress,
  updateTodosListById,
} from '../../store/slices/boards/slice';
import { TodoListType, TodoType } from '../../types';
import { StrictModeDroppable } from '../StrictModeDroppable';
import styled from '@emotion/styled';

import { Todo } from '../Todo';

const ScrollContainer = styled(Box)`
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TodoBoard: FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectTodosStatus);

  const completedTodos = useAppSelector(selectTodosCompleted) as TodoType[];
  const inProgressTodos = useAppSelector(selectTodosNonCompleted) as TodoType[];

  useEffect(() => {
    dispatch(updateTodosCompleted(completedTodos));
    dispatch(updateTodosInProgress(inProgressTodos));
  }, [status]);

  console.log(status);

  const todoboard = useAppSelector(selectBoards) as TodoListType[];

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColId = todoboard!.findIndex((board) => board.id === source.droppableId);
      const destinationColId = todoboard!.findIndex(
        (board) => board.id === destination.droppableId,
      );

      const sourceCol = todoboard[sourceColId];
      const destinationCol = todoboard[destinationColId];

      const sourceTodos = [...sourceCol.todos];

      const destinationTodos = [...destinationCol.todos];
      const [removed] = sourceTodos.splice(source.index, 1);
      destinationTodos.splice(destination.index, 0, removed);
      dispatch(updateTodosListById({ id: sourceColId.toString(), todos: sourceTodos }));
      dispatch(updateTodosListById({ id: destinationColId.toString(), todos: destinationTodos }));
      dispatch(changeCompletedTodo(removed.id));

      dispatch(fetchUpdateTodo({ id: removed.id.toString() }));
      setTodosLists(todoboard);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {todoboard.map((board) => (
        <StrictModeDroppable key={board.id} droppableId={board.id}>
          {(provided) => (
            <Box>
              <Text fontWeight="600" fontSize="16px" lineHeight="24px" mb="10px" color="#90a0b7">
                {board.id === '1' ? 'Active' : 'Completed'}
              </Text>
              <ScrollContainer
                h="650px"
                w="500px"
                bgColor="white"
                overflow="scroll"
                boxShadow="xl"
                rounded="md"
                p="20px 25px"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {board.todos.map((todo, index) => (
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
            </Box>
          )}
        </StrictModeDroppable>
      ))}
    </DragDropContext>
  );
};
