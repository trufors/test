import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { HttpService } from '../../../api';
import { CommentType, IdParams } from '../../../types';
import { LoadingStatuses } from '../../constants';
import { selectCommentsByPostId } from './selectors';

export const fetchComments = createAsyncThunk<CommentType[], IdParams>(
  'comments/fetchComments',
  async ({ id }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    if (selectCommentsByPostId(state, id).length > 0) {
      return thunkAPI.rejectWithValue(LoadingStatuses.EARLYADDED);
    }
    const { data } = await HttpService.get(`/comments/?postId=${id}`);
    return data;
  },
);
