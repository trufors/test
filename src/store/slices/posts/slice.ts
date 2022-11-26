import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { PostType } from '../../../types';
import { RootState } from '../..';
import { fetchCreatePost, fetchDeletePost, fetchPosts, fetchUpdatePost } from './asyncThunkPosts';
import { LoadingStatuses } from '../../constants';

const postsEntityAdapter = createEntityAdapter<PostType>({
  sortComparer: (a, b) => b.id - a.id,
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState: postsEntityAdapter.getInitialState({
    postForm: { userId: 1, id: 0, title: '', body: '' },
    status: '',
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
      .addCase(fetchPosts.pending, (state) => {
        state.status = LoadingStatuses.LOADING;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.status = LoadingStatuses.SUCCESS;
        postsEntityAdapter.addMany(state, payload);
      })

      .addCase(fetchPosts.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.EARLYADDED
            ? LoadingStatuses.EARLYADDED
            : LoadingStatuses.ERROR;
      })
      .addCase(fetchDeletePost.fulfilled, (state, { payload }) => {
        state.status = LoadingStatuses.SUCCESS;
        postsEntityAdapter.removeOne(state, payload);
      })
      .addCase(fetchDeletePost.rejected, (state) => {
        state.status = LoadingStatuses.ERROR;
      })
      .addCase(fetchUpdatePost.fulfilled, (state, { payload }) => {
        state.status = LoadingStatuses.SUCCESS;
        postsEntityAdapter.updateOne(state, { id: payload.id, changes: payload });
      })
      .addCase(fetchUpdatePost.rejected, (state) => {
        state.status = LoadingStatuses.ERROR;
      })
      .addCase(fetchCreatePost.fulfilled, (state, { payload }) => {
        state.status = LoadingStatuses.SUCCESS;
        postsEntityAdapter.addOne(state, payload);
      })
      .addCase(fetchCreatePost.rejected, (state) => {
        state.status = LoadingStatuses.ERROR;
      });
  },
});

export const { setPostForm, editPostTitle, editPostBody } = postsSlice.actions;

export default postsSlice.reducer;
