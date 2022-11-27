import { store } from '../';
import { fetchDeleteTodo } from '../slices/todos/asyncThunkTodos';

describe('Redux boards tests', () => {
  test('update completed board', async () => {
    const state = store.getState().todos;
    const result = await store.dispatch(fetchDeleteTodo({ id: '1' }));
    expect(result.type).toBe('todos/fetchDeleteTodos/fulfilled');
  });
});
