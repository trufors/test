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
    const response = await HttpService.delete(`/posts/${id}`);
    return id as number;
  },
);

export const fetchCreatePost = createAsyncThunk<PostsState, undefined, { state: RootState }>(
  'posts/fetchCreatePost',
  async (_, thunkAPI) => {
    const { postForm } = thunkAPI.getState().posts;
    const response = await HttpService.post(`/posts`, postForm);
    return postForm as PostsState;
  },
);
export const fetchUpdatePost = createAsyncThunk<PostsState, undefined, { state: RootState }>(
  'posts/fetchUpdatePost',
  async (_, thunkAPI) => {
    const { postForm } = thunkAPI.getState().posts;
    const response = await HttpService.put(`/posts/${postForm.id}`, postForm);
    console.log(response);
    return postForm as PostsState;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState: postsEntityAdapter.getInitialState({
    postForm: { userId: 1, id: 0, title: '', body: '' },
  }),
  reducers: {
    editPostBody: (state, { payload }: PayloadAction<string>) => {
      state.postForm.body = payload;
    },
    editPostTitle: (state, { payload }: PayloadAction<string>) => {
      state.postForm.title = payload;
    },
    setPostForm: (state, { payload }: PayloadAction<number | undefined>) => {
      state.postForm = { userId: 1, id: 0, title: '', body: '' };
      if (payload) {
        const editPost = Object.values(state.entities).find((post) => post!.id === payload);
        state.postForm = { ...editPost! };
        return;
      }
      state.postForm.id = state.ids.length + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        postsEntityAdapter.addMany(state, payload);
      })
      .addCase(fetchDeletePost.fulfilled, (state, { payload }) => {
        postsEntityAdapter.removeOne(state, payload);
      })
      .addCase(fetchUpdatePost.fulfilled, (state, { payload }) => {
        console.log('успех');
        postsEntityAdapter.updateOne(state, { id: payload.id, changes: payload });
      })
      .addCase(fetchCreatePost.fulfilled, (state, { payload }) => {
        postsEntityAdapter.addOne(state, payload);
      });
  },
});

export const { setPostForm, editPostTitle, editPostBody } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;
export const selectPostById = (state: RootState, id: number) =>
  Object.values(state.posts.entities).filter((entity) => entity!.id === id);
export const selectPostForm = (state: RootState) => state.posts.postForm;
export default postsSlice.reducer;
