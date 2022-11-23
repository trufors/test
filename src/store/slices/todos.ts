import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { HttpService } from '../../api';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const todosAdapter = createEntityAdapter<Todo>({
  sortComparer: (a, b) => b.id - a.id,
});

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, thunkAPI) => {
  const { data } = await HttpService.get('/users/1/todos');
  return data as Todo[];
});

export const fetchDeleteTodo = createAsyncThunk(
  'todos/fetchDeleteTodos',
  async (id: number, thunkAPI) => {
    await HttpService.delete(`/todos/${id}`);
    return id as number;
  },
);

export const fetchCreateTodo = createAsyncThunk(
  'todos/fetchCreateTodos',
  async (todo: Todo, thunkAPI) => {
    const { data } = await HttpService.post('/todos', todo);
    return todo;
  },
);

export const fetchUpdateTodo = createAsyncThunk(
  'todos/fetchUpdateTodo',
  async (todo: Todo, thunkAPI) => {
    const response = await HttpService.put(`/todos/${todo.id}`, todo);
    console.log(response);
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
        todosAdapter.addMany(state, payload);
        console.log(todosAdapter);
      })
      .addCase(fetchDeleteTodo.fulfilled, (state, { payload }) => {
        todosAdapter.removeOne(state, payload);
      })
      .addCase(fetchDeleteTodo.rejected, (state, { error }) => {
        console.log(error);
      })
      .addCase(fetchCreateTodo.fulfilled, (state, { payload }) => {
        todosAdapter.addOne(state, payload);
      })
      .addCase(fetchUpdateTodo.fulfilled, (state, { payload }) => {
        todosAdapter.updateOne(state, { id: payload.id, changes: payload });
      });
  },
});

export const {} = todosSlice.actions;

export const selectTodosData = (state: RootState) => state.todos;

export default todosSlice.reducer;
