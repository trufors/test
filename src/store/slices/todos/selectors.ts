import { RootState } from '../..';

export const selectTodosData = (state: RootState) => state.todos;

export const selectTodosIds = (state: RootState) => state.todos.ids;

export const selectTodosEntities = (state: RootState) => state.todos.entities;

export const selectTodosStatus = (state: RootState) => state.todos.status;

export const selectTodoById = (state: RootState, id: string) =>
  Object.values(state.todos.entities).find((todo) => todo!.id === parseInt(id));

export const selectTodosCompleted = (state: RootState) =>
  Object.values(selectTodosEntities(state)).filter((todo) => todo!.completed);

export const selectTodosNonCompleted = (state: RootState) =>
  Object.values(selectTodosEntities(state)).filter((todo) => !todo!.completed);
