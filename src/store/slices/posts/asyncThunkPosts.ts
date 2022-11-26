import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { HttpService } from '../../../api';
import { IdParams, PostType } from '../../../types';
import { LoadingStatuses } from '../../constants';
import { selectPostsIds } from './selectors';

export const fetchPosts = createAsyncThunk<PostType[]>('posts/fetchPosts', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  if (selectPostsIds(state).length > 0) {
    return thunkAPI.rejectWithValue(LoadingStatuses.EARLYADDED);
  }
  const { data } = await HttpService.get('/users/1/posts');
  return data;
});

export const fetchDeletePost = createAsyncThunk<number, IdParams>(
  'posts/fetchDeletePost',
  async ({ id }, thunkAPI) => {
    await HttpService.delete(`/posts/${id}`);
    return parseInt(id);
  },
);

export const fetchCreatePost = createAsyncThunk<PostType>(
  'posts/fetchCreatePost',
  async (_, thunkAPI) => {
    const { posts } = thunkAPI.getState() as RootState;
    await HttpService.post(`/posts`, posts.postForm);
    return posts.postForm;
  },
);
export const fetchUpdatePost = createAsyncThunk<PostType>(
  'posts/fetchUpdatePost',
  async (_, thunkAPI) => {
    const { posts } = thunkAPI.getState() as RootState;
    await HttpService.put(`/posts/${posts.postForm.id}`, posts.postForm);
    return posts.postForm;
  },
);
