import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { CommentType } from '../../../types';
import { LoadingStatuses } from '../../constants';
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
        state.status = LoadingStatuses.LOADING;
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        state.status = LoadingStatuses.SUCCESS;
        commentsEntityAdapter.addMany(state, payload);
      })

      .addCase(fetchComments.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.EARLYADDED
            ? LoadingStatuses.EARLYADDED
            : LoadingStatuses.ERROR;
      });
  },
});

export const {} = commentsSlice.actions;

export default commentsSlice.reducer;
