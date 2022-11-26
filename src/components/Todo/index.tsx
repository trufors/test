import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Checkbox, IconButton, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchDeleteTodo } from '../../store/slices/todos/asyncThunkTodos';
import { TodoType } from '../../types';

export const Todo: FC<TodoType> = ({ completed, id, title }) => {
  const dispatch = useAppDispatch();

  return (
    <Box
      draggable="true"
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
      <Checkbox isChecked={completed} colorScheme="green" mr="auto" />
      <Text m="0 auto">{title}</Text>
      <Box ml="auto">
        <IconButton
          size="xl"
          cursor="pointer"
          as={CloseIcon}
          onClick={() => dispatch(fetchDeleteTodo({ id: id.toString() }))}
          aria-label="delete todos"
        />
      </Box>
    </Box>
  );
};
