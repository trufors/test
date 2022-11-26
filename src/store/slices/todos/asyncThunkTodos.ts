import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { HttpService } from '../../../api';
import { IdParams, TodoType } from '../../../types';
import { LoadingStatuses } from '../../constants';
import { selectTodoById, selectTodosIds } from './selectors';

export const fetchTodos = createAsyncThunk<TodoType[]>('todos/fetchTodos', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  if (selectTodosIds(state).length > 0) {
    return thunkAPI.rejectWithValue(LoadingStatuses.EARLYADDED);
  }
  const { data } = await HttpService.get('/users/1/todos');
  return data;
});

export const fetchDeleteTodo = createAsyncThunk<number, IdParams>(
  'todos/fetchDeleteTodos',
  async ({ id }, thunkAPI) => {
    await HttpService.delete(`/todos/${id}`);
    return parseInt(id);
  },
);

export const fetchCreateTodo = createAsyncThunk<TodoType, TodoType>(
  'todos/fetchCreateTodos',
  async (todo, thunkAPI) => {
    const { data } = await HttpService.post('/todos', todo);
    return todo;
  },
);

export const fetchUpdateTodo = createAsyncThunk<TodoType, IdParams>(
  'todos/fetchUpdateTodo',
  async ({ id }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const newTodo = selectTodoById(state, id) as TodoType;
    newTodo!.completed = !newTodo!.completed;
    const response = await HttpService.put(`/todos/${newTodo!.id}`, newTodo);
    console.log(response);
    return newTodo;
  },
);
