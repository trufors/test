import { Box, Flex, Heading, Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FC, useEffect } from 'react';
import { TodoBoard } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchTodos } from '../../store/slices/todos/asyncThunkTodos';
import { selectTodosCompleted, selectTodosNonCompleted } from '../../store/slices/todos/selectors';
import { Todo } from './Todo';

const ScrollContainer = styled(Box)`
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Todos: FC = () => {
  const dispatch = useAppDispatch();
  const completedTodos = useAppSelector(selectTodosCompleted);
  const inProgressTodos = useAppSelector(selectTodosNonCompleted);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

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
        mb="20px"></Input>
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
      <Flex
        border="1px solid lightgrey"
        h="78%"
        boxShadow="xl"
        rounded="md"
        p="20px 25px"
        justifyContent="space-evenly">
        <TodoBoard />
      </Flex>
    </>
  );
};
