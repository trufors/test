import { store } from '../';

describe('Redux store tests', () => {
  it('Photo slice initial state must be correct', () => {
    const state = store.getState().photos;
    expect(state.ids).toEqual([]);
    expect(state.entities).toEqual({});
    expect(state.status).toEqual('');
  });
  it('Todo slice initial state must be correct', () => {
    const state = store.getState().todos;
    expect(state.ids).toEqual([]);
    expect(state.entities).toEqual({});
    expect(state.status).toEqual('');
  });
  it('Album slice initial state must be correct', () => {
    const state = store.getState().albums;
    expect(state.ids).toEqual([]);
    expect(state.entities).toEqual({});
    expect(state.status).toEqual('');
  });
  it('Board slice initial state must be correct', () => {
    const state = store.getState().boards;
    expect(state.status).toEqual('');
    expect(state.boards.length).toEqual(2);
    expect(state.boards[0].id).toEqual('1');
    expect(state.boards[1].id).toEqual('2');
    expect(state.boards[0].todos).toEqual([]);
    expect(state.boards[1].todos).toEqual([]);
  });
  it('Post slice initial state must be correct', () => {
    const state = store.getState().posts;
    expect(state.ids).toEqual([]);
    expect(state.entities).toEqual({});
    expect(state.status).toEqual('');
  });

  it('Comment slice initial state must be correct', () => {
    const state = store.getState().comments;
    expect(state.ids).toEqual([]);
    expect(state.entities).toEqual({});
    expect(state.status).toEqual('');
  });
});
