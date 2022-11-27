import { Flex, Heading, Input } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

import { TodoBoard } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createNewTodo } from '../../store/slices/boards/slice';
import { fetchCreateTodo, fetchTodos } from '../../store/slices/todos/asyncThunkTodos';
import { selectTodosIds } from '../../store/slices/todos/selectors';
import { TodoType } from '../../types';

export const TodosPage: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();
  const ids = useAppSelector(selectTodosIds);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const createTodo = () => {
    if (inputValue === '') return;

    const todo: TodoType = {
      userId: 1,
      id: ids.length + 1,
      title: inputValue,
      completed: false,
    };
    dispatch(createNewTodo(todo));
    dispatch(fetchCreateTodo(todo));
    setInputValue('');
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.code === 'Enter') createTodo();
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
        onKeyDown={onKeyDown}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
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
          Boards
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
