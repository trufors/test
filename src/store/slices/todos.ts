import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { HttpService } from '../../api';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const todosAdapter = createEntityAdapter<Todo>();

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, thunkAPI) => {
  const { data } = await HttpService.get('/users/1/todos');
  return data as Todo[];
});
export const fetchDeleteTodos = createAsyncThunk(
  'todos/fetchDeleteTodos',
  async (id: number, thunkAPI) => {
    await HttpService.delete(`/users/1/todos?id=${id}`);
    return id as number;
  },
);
export const fetchCreateTodos = createAsyncThunk(
  'todos/fetchCreateTodos',
  async (todo: Todo, thunkAPI) => {
    const { data } = await HttpService.post('/todos', todo);
    return todo;
  },
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, () => {})
      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        todosAdapter.setMany(state, payload);
      })
      .addCase(fetchDeleteTodos.fulfilled, (state, { payload }) => {
        todosAdapter.removeOne(state, payload);
      })
      .addCase(fetchDeleteTodos.rejected, (state, { error }) => {
        console.log(error);
      })
      .addCase(fetchCreateTodos.fulfilled, (state, { payload }) => {
        todosAdapter.addOne(state, payload);
      });
  },
});

export const {} = todosSlice.actions;

export const selectTodosData = (state: RootState) => state.todos.entities;

export default todosSlice.reducer;
