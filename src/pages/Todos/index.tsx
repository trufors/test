import { CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Checkbox, Flex, Heading, IconButton, Input, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FC, useState, KeyboardEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchCreateTodo,
  fetchDeleteTodo,
  fetchTodos,
  fetchUpdateTodo,
  selectTodosData,
  TodoElement,
} from '../../store/slices/todos';
import { Todo } from './Todo';

const ScrollContainer = styled(Box)`
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Todos: FC = () => {
  const dispatch = useAppDispatch();
  const { entities, ids } = useAppSelector(selectTodosData);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  const keyDown = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      const { value } = e.target as HTMLInputElement;
      const id = Object.values(entities).length + 1;
      const todo: TodoElement = {
        id,
        userId: 1,
        title: value,
        completed: false,
      };
      dispatch(fetchCreateTodo(todo));
    }
  };

  return (
    <>
      <Heading as="h2" fontWeight="600" fontSize="28px" lineHeight="36px" mb="24px" color="#90a0b7">
        Todos
      </Heading>

      <Flex color="#90a0b7" justifyContent="space-between" mb="10px">
        <Heading
          as="h3"
          fontWeight="600"
          fontSize="16px"
          lineHeight="24px"
          mb="10px"
          color="#90a0b7">
          Create Todo
        </Heading>
      </Flex>
      <Input
        bgColor="white"
        placeholder="Insert your todos"
        boxShadow="xl"
        rounded="md"
        mb="20px"
        onKeyDown={(e) => keyDown(e)}></Input>
      <Flex color="#90a0b7" justifyContent="space-between" mb="10px">
        <Heading
          as="h3"
          fontWeight="600"
          fontSize="16px"
          lineHeight="24px"
          mb="10px"
          color="#90a0b7">
          Yours todos
        </Heading>
      </Flex>
      <Flex h="78%" boxShadow="xl" rounded="md" p="20px 25px" justifyContent="space-evenly">
        <ScrollContainer
          h="700px"
          w="500px"
          bgColor="white"
          overflow="scroll"
          boxShadow="xl"
          rounded="md"
          p="20px 25px">
          {ids.length &&
            ids
              .filter((id) => entities[id]!.completed === false)
              .map((id) => <Todo key={id} todo={entities[id]!} />)}
        </ScrollContainer>
        <ScrollContainer
          w="500px"
          h="700px"
          bgColor="white"
          overflow="scroll"
          boxShadow="xl"
          rounded="md"
          p="20px 25px">
          {ids.length &&
            ids
              .filter((id) => entities[id]!.completed === true)
              .map((id) => <Todo key={id} todo={entities[id]!} />)}
        </ScrollContainer>
      </Flex>
    </>
  );
};
