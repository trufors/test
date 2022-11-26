import { Box, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TodoType } from '../../types';
import { StrictModeDroppable } from '../StrictModeDroppable';
import { Todo } from '../Todo';

type TodoListProps = {
  todos: TodoType[];
  id: string;
};

const ScrollContainer = styled(Box)`
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TodoList: FC<TodoListProps> = ({ todos, id }) => {
  return (
    <StrictModeDroppable droppableId={id}>
      {(provided) => (
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
          <Text>Title</Text>

          {todos.map((todo, index) => (
            <Draggable key={todo.id.toString()} draggableId={todo.id.toString()} index={index}>
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
      )}
    </StrictModeDroppable>
  );
};
