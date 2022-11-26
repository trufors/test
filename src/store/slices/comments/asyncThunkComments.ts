import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpService } from '../../../api';
import { CommentType, FetchParams } from '../../../types';

export const fetchComments = createAsyncThunk<CommentType[], FetchParams>(
  'comments/fetchComments',
  async ({ id }, thunkAPI) => {
    const { data } = await HttpService.get(`/comments/?postId=${id}`);
    return data;
  },
);
