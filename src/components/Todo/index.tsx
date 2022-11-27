import { CloseIcon, DragHandleIcon, EditIcon, Icon } from '@chakra-ui/icons';
import { Box, Checkbox, CloseButton, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { changeCompletedTodo, deleteBoardTodo } from '../../store/slices/boards/slice';
import { fetchDeleteTodo, fetchUpdateTodo } from '../../store/slices/todos/asyncThunkTodos';
import { TodoType } from '../../types';

export const Todo: FC<TodoType> = ({ completed, id, title }) => {
  const dispatch = useAppDispatch();

  const DeleteTodo = () => {
    dispatch(fetchDeleteTodo({ id: id.toString() }));
    dispatch(deleteBoardTodo(id));
  };

  return (
    <Box
      draggable="true"
      border="1px"
      borderColor="grey.500"
      key={id}
      mb="20px"
      boxShadow="xl"
      p="10px 15px"
      alignItems="center"
      rounded="md"
      display="flex">
      {completed ? (
        <Checkbox isChecked={completed} colorScheme="green" mr="auto" />
      ) : (
        <Icon as={DragHandleIcon} mr="auto" />
      )}

      <Text fontSize="14px" textAlign="center" m="0 auto">
        {title}
      </Text>
      <Box ml="auto">
        <CloseButton size="xl" cursor="pointer" onClick={DeleteTodo} />
      </Box>
    </Box>
  );
};
