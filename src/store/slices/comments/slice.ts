import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { CommentType } from '../../../types';
import { LoadingStatus } from '../../constants';
import { fetchComments } from './asyncThunkComments';

const commentsEntityAdapter = createEntityAdapter<CommentType>({
  sortComparer: (a, b) => b.id - a.id,
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsEntityAdapter.getInitialState({ status: '' }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = LoadingStatus.LOADING;
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        state.status = LoadingStatus.SUCCESS;
        commentsEntityAdapter.addMany(state, payload);
      })

      .addCase(fetchComments.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatus.EARLYADDED ? LoadingStatus.EARLYADDED : LoadingStatus.ERROR;
      });
  },
});

export const {} = commentsSlice.actions;

export default commentsSlice.reducer;
