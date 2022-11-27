import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  BoardsState,
  CreateTodoParams,
  DragTodoBoard,
  TodoListType,
  TodoType,
} from '../../../types';
import { RootState } from '../..';
import { todosSlice } from '../todos/slice';

const initialState: BoardsState = {
  status: '',
  boards: [
    { id: '1', todos: [] as TodoType[] },
    { id: '2', todos: [] as TodoType[] },
  ],
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    updateTodosCompleted(state, { payload }: PayloadAction<TodoType[]>) {
      const completedTodos = state.boards.find((list) => list.id === '2') as TodoListType;
      completedTodos.todos = payload;
    },
    updateTodosInProgress(state, { payload }: PayloadAction<TodoType[]>) {
      const activeTodos = state.boards.find((list) => list.id === '1') as TodoListType;
      activeTodos.todos = payload;
    },
    changeCompletedTodo(state, { payload }: PayloadAction<number>) {
      const result = state.boards.find((list) =>
        list.todos!.find((todo) => todo.id === payload),
      ) as TodoListType;
      const todo = result.todos.find((todo) => todo.id === payload) as TodoType;
      if (result) {
        todo.completed = !todo.completed;
      }
    },
    updateTodosListById(state, { payload }: PayloadAction<TodoListType>) {
      const board = state.boards[parseInt(payload.id)];
      board.todos = payload.todos;
    },
    deleteBoardTodo(state, { payload }: PayloadAction<number>) {
      const board = state.boards.find((list) =>
        list.todos!.find((todo) => todo.id === payload),
      ) as TodoListType;
      const id = board.id === '1' ? 0 : 1;
      const result = board.todos.filter((todo) => todo.id !== payload);
      state.boards[id].todos = result;
    },
    createNewTodo(state, { payload }: PayloadAction<TodoType>) {
      state.boards[0].todos = [payload, ...state.boards[0].todos];
    },
  },
});

export const {
  createNewTodo,
  deleteBoardTodo,
  changeCompletedTodo,
  updateTodosListById,
  updateTodosInProgress,
  updateTodosCompleted,
} = boardsSlice.actions;

export const selectBoards = (state: RootState) => {
  return state.boards.boards;
};

export default boardsSlice.reducer;
