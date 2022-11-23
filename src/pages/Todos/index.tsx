import { CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Checkbox, Flex, Heading, IconButton, Input, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ChangeEvent, FC, KeyboardEvent, SyntheticEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchCreateTodo,
  fetchDeleteTodo,
  fetchTodos,
  fetchUpdateTodo,
  selectTodosData,
  Todo,
} from '../../store/slices/todos';

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
      const id = Object.values(todos).length + 1;
      const todo: Todo = {
        id,
        userId: 1,
        title: value,
        completed: false,
      };
      dispatch(fetchCreateTodo(todo));
    }
  };
  const editTodo = (update: Todo, method: string): void => {
    console.log(method);
    const todo: Todo = {
      ...update,
      completed: !update.completed,
    };
    dispatch(fetchUpdateTodo(todo));
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
      <ScrollContainer
        bgColor="white"
        overflow="scroll"
        h="750px"
        boxShadow="xl"
        rounded="md"
        p="20px 25px">
        {ids.length &&
          ids.map((id) => (
            <Box
              border="1px"
              borderColor="grey.500"
              key={id}
              mb="20px"
              boxShadow="xl"
              p="10px 15px"
              h="50px"
              alignItems="center"
              rounded="md"
              display="flex">
              <Checkbox
                isChecked={entities[id]!.completed}
                onChange={() => editTodo(entities[id]!, 'completed')}
                colorScheme="green"
                mr="auto"
              />
              <Text m="0 auto">{entities[id]!.title}</Text>
              <Box ml="auto">
                <IconButton
                  size="xl"
                  cursor="pointer"
                  as={EditIcon}
                  aria-label="edit todos"
                  mr="10px"
                />
                <IconButton
                  size="xl"
                  cursor="pointer"
                  as={CloseIcon}
                  onClick={() => dispatch(fetchDeleteTodo(entities[id]!.id))}
                  aria-label="delete todos"
                />
              </Box>
            </Box>
          ))}
      </ScrollContainer>
    </>
  );
};
