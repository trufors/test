import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { HttpService } from '../../api';
import { TodoElement } from './todos';

export interface PostsState {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const postsEntityAdapter = createEntityAdapter<PostsState>({
  sortComparer: (a, b) => b.id - a.id,
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, thunkAPI) => {
  const { data } = await HttpService.get('/users/1/posts');
  return data as PostsState[];
});

export const fetchDeletePost = createAsyncThunk(
  'posts/fetchDeletePost',
  async (id: number, thunkAPI) => {
    await HttpService.delete(`/posts/${id}`);
    return id as number;
  },
);

export const fetchCreateTodo = createAsyncThunk(
  'posts/fetchCreateTodos',
  async (todo: TodoElement, thunkAPI) => {
    const { data } = await HttpService.post('/todos', todo);
    return todo;
  },
);

export const fetchUpdateTodo = createAsyncThunk(
  'posts/fetchUpdateTodo',
  async (todo: TodoElement, thunkAPI) => {
    const response = await HttpService.put(`/todos/${todo.id}`, todo);
    console.log(response);
    return todo;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState: postsEntityAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        postsEntityAdapter.addMany(state, payload);
      })
      .addCase(fetchDeletePost.fulfilled, (state, { payload }) => {
        postsEntityAdapter.removeOne(state, payload);
      });
  },
});

export const {} = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
