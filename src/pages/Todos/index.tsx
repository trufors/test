import { CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Checkbox, Flex, Heading, IconButton, Input, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ChangeEvent, FC, KeyboardEvent, SyntheticEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchCreateTodos,
  fetchDeleteTodos,
  fetchTodos,
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
  const todos = useAppSelector(selectTodosData);
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
      dispatch(fetchCreateTodos(todo));
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
      <ScrollContainer
        bgColor="white"
        overflow="scroll"
        h="750px"
        boxShadow="xl"
        rounded="md"
        p="20px 25px">
        {Object.values(todos).length &&
          Object.values(todos).map((item) => (
            <Box
              border="1px"
              borderColor="grey.500"
              key={item!.id}
              mb="20px"
              boxShadow="xl"
              p="10px 15px"
              h="50px"
              alignItems="center"
              rounded="md"
              display="flex">
              <Checkbox colorScheme="green" mr="auto" />
              <Text m="0 auto">{item!.title}</Text>
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
                  onClick={() => dispatch(fetchDeleteTodos(item!.id))}
                  aria-label="delete todos"
                />
              </Box>
            </Box>
          ))}
      </ScrollContainer>
    </>
  );
};
