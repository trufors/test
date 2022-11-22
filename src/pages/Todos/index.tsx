import { CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Checkbox, Flex, Heading, IconButton, Input, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import axios from 'axios';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectTodosData, setTodos } from '../../store/slices/todos';

const ScrollContainer = styled(Box)`
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Todos: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.todos);
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/1/todos`)
      .then((res) => dispatch(setTodos(res.data)));
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
      <ScrollContainer
        bgColor="white"
        overflow="scroll"
        h="750px"
        boxShadow="xl"
        rounded="md"
        p="20px 25px">
        {data.length &&
          data.map((item) => (
            <Box key={item.id} mb="20px" boxShadow="xl" rounded="md" display="flex">
              <Checkbox colorScheme="green" defaultChecked mr="auto" />
              <Text m="0 auto">{item.title}</Text>
              <Box ml="auto">
                <IconButton as={EditIcon} aria-label="edit todos" />
                <IconButton as={CloseIcon} aria-label="delete todos" />
              </Box>
            </Box>
          ))}
      </ScrollContainer>
    </>
  );
};
