import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { fetchCreateTodo, fetchDeleteTodo, fetchTodos, fetchUpdateTodo } from './asyncThunkTodos';
import { TodoListType, TodoType } from '../../../types';
import { LoadingStatuses } from '../../constants';

const todosEntityAdapter = createEntityAdapter<TodoType>({
  sortComparer: (a, b) => b.id - a.id,
});

export const todosSlice = createSlice({
  name: 'todos',
  initialState: todosEntityAdapter.getInitialState({
    status: '',
    todolist: [
      { id: '1', todos: [] as TodoType[] },
      { id: '2', todos: [] as TodoType[] },
    ] as TodoListType[],
  }),
  reducers: {
    updateTodosCompleted(state, { payload }: PayloadAction<TodoType[]>) {
      const completed = state.todolist.find((list) => list.id === '2') as TodoListType;
      completed.todos = payload;
    },
    updateTodosInProgress(state, { payload }: PayloadAction<TodoType[]>) {
      const completed = state.todolist.find((list) => list.id === '1') as TodoListType;
      completed.todos = payload;
    },
    changeCompletedTodo(state, { payload }: PayloadAction<number>) {
      const result = state.todolist.find((list) =>
        list.todos!.find((todo) => todo.id === payload),
      ) as TodoListType;
      const todo = result.todos.find((todo) => todo.id === payload) as TodoType;
      if (result) {
        todo.completed = !todo.completed;
      }
    },
    setTodosLists(state, { payload }: PayloadAction<TodoListType[]>) {
      state.todolist = payload;
    },
    updateTodosListById(state, { payload }: PayloadAction<TodoListType>) {
      const list = state.todolist[parseInt(payload.id)];
      list.todos = payload.todos;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = LoadingStatuses.LOADING;
      })
      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        state.status = LoadingStatuses.SUCCESS;
        todosEntityAdapter.addMany(state, payload);
      })
      .addCase(fetchTodos.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.EARLYADDED
            ? LoadingStatuses.EARLYADDED
            : LoadingStatuses.ERROR;
      })
      .addCase(fetchDeleteTodo.fulfilled, (state, { payload }) => {
        state.status = LoadingStatuses.SUCCESS;
        todosEntityAdapter.removeOne(state, payload);
      })
      .addCase(fetchDeleteTodo.rejected, (state) => {
        state.status = LoadingStatuses.ERROR;
      })
      .addCase(fetchCreateTodo.fulfilled, (state, { payload }) => {
        state.status = LoadingStatuses.SUCCESS;
        todosEntityAdapter.addOne(state, payload);
      })
      .addCase(fetchCreateTodo.rejected, (state) => {
        state.status = LoadingStatuses.ERROR;
      })
      .addCase(fetchUpdateTodo.fulfilled, (state, { payload }) => {
        state.status = LoadingStatuses.SUCCESS;
        todosEntityAdapter.updateOne(state, { id: payload.id, changes: payload });
      })
      .addCase(fetchUpdateTodo.rejected, (state) => {
        state.status = LoadingStatuses.ERROR;
      });
  },
});

export const {
  changeCompletedTodo,
  updateTodosListById,
  updateTodosInProgress,
  updateTodosCompleted,
  setTodosLists,
} = todosSlice.actions;

export default todosSlice.reducer;
