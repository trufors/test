import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpService } from '../../../api';
import { CommentType, IdParams } from '../../../types';

export const fetchComments = createAsyncThunk<CommentType[], IdParams>(
  'comments/fetchComments',
  async ({ id }, thunkAPI) => {
    const { data } = await HttpService.get(`/comments/?postId=${id}`);
    return data;
  },
);
