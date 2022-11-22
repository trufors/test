import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface TodosState {
  data: any;
}

const initialState: TodosState = {
  data: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const { setTodos } = todosSlice.actions;

export const selectTodosData = (state: RootState) => state.todos.data;

export default todosSlice.reducer;
