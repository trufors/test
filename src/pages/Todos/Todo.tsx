import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Checkbox, IconButton, Input, Text } from '@chakra-ui/react';
import { FC, DragEvent, SetStateAction, Dispatch, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchDeleteTodo,
  fetchUpdateTodo,
  selectTodosData,
  TodoElement,
  updateTodos,
} from '../../store/slices/todos';

type TodoProps = {
  todo: TodoElement;
};

export const Todo: FC<TodoProps> = ({ todo }) => {
  const [currentTodo, setCurrentTodo] = useState<TodoElement | null>(null);
  const { completed, id, title } = todo;
  const { ids, entities } = useAppSelector(selectTodosData);
  const dispatch = useAppDispatch();
  const editTodo = (update: TodoElement, method: string): void => {
    console.log(method);
    const todo: TodoElement = {
      ...update,
      completed: !update.completed,
    };
    dispatch(fetchUpdateTodo(todo));
  };

  const dragStartHendler = (e: DragEvent<HTMLDivElement>, todo: TodoElement) => {
    console.log('start', todo);
    setCurrentTodo(todo);
  };

  const dragLeaveHendler = (e: DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.background = 'white';
  };

  const dragEndHendler = (e: DragEvent<HTMLDivElement>) => {};

  const dragOverHendler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    target.style.background = 'grey';
  };

  const dropHendler = (e: DragEvent<HTMLDivElement>, todo: TodoElement) => {
    console.log('drop', todo);
    e.preventDefault();
    const newArray = ids.map((id) => {
      const result = { ...entities[id]! };
      if (id === todo.id) {
        id = currentTodo!.id;
        entities[id] = { ...result };
      }
      if (id === currentTodo!.id) {
        id = todo.id;
        entities[id] = { ...result };
      }
    });
    dispatch(updateTodos(entities));
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
      h="50px"
      alignItems="center"
      rounded="md"
      display="flex"
      onDragStart={(e) => dragStartHendler(e, todo)}
      onDragLeave={(e) => dragLeaveHendler(e)}
      onDragEnd={(e) => dragEndHendler(e)}
      onDragOver={(e) => dragOverHendler(e)}
      onDrop={(e) => dropHendler(e, todo)}>
      <Checkbox
        isChecked={completed}
        onChange={() => editTodo(todo, 'completed')}
        colorScheme="green"
        mr="auto"
      />
      <Text m="0 auto">{title}</Text>
      <Box ml="auto">
        <IconButton size="xl" cursor="pointer" as={EditIcon} aria-label="edit todos" mr="10px" />
        <IconButton
          size="xl"
          cursor="pointer"
          as={CloseIcon}
          onClick={() => dispatch(fetchDeleteTodo(id))}
          aria-label="delete todos"
        />
      </Box>
    </Box>
  );
};
