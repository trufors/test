import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchCreateTodo, fetchDeleteTodo, fetchTodos, fetchUpdateTodo } from './asyncThunkTodos';
import { TodoType } from '../../../types';
import { LoadingStatuses } from '../../constants';

const todosEntityAdapter = createEntityAdapter<TodoType>({
  sortComparer: (a, b) => a.id - b.id,
});

export const todosSlice = createSlice({
  name: 'todos',
  initialState: todosEntityAdapter.getInitialState({
    status: '',
  }),
  reducers: {},
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
        todosEntityAdapter.addOne(state, payload);
      })
      .addCase(fetchCreateTodo.rejected, (state) => {
        state.status = LoadingStatuses.ERROR;
      })
      .addCase(fetchUpdateTodo.fulfilled, (state, { payload }) => {
        todosEntityAdapter.updateOne(state, { id: payload.id, changes: payload });
      })
      .addCase(fetchUpdateTodo.rejected, (state) => {
        state.status = LoadingStatuses.ERROR;
      });
  },
});

export const {} = todosSlice.actions;

export default todosSlice.reducer;
