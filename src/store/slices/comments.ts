import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { HttpService } from '../../api';

export type NewComment = {
  commentId: number;
  id: number;
  email: string;
  name: string;
  body: string;
  comments: NewComment[];
};
export interface CommentsState {
  postId: number;
  id: number;
  email: string;
  name: string;
  body: string;
  comments?: NewComment[];
}

const commentsEntityAdapter = createEntityAdapter<CommentsState>({
  sortComparer: (a, b) => b.id - a.id,
});

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (id: number, thunkAPI) => {
    const { data } = await HttpService.get(`/comments/?postId=${id}`);
    return data as CommentsState[];
  },
);
type CreateComment = { comment: NewComment; postId: number };

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsEntityAdapter.getInitialState(),
  reducers: {
    addNewComment(state, { payload }: PayloadAction<CreateComment>) {
      commentsEntityAdapter.updateOne(state, { id: payload.postId, changes: payload.comment });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, { payload }) => {
      commentsEntityAdapter.addMany(state, payload);
    });
  },
});

export const { addNewComment } = commentsSlice.actions;

export const selectCommentsByPostId = (state: RootState, id: number) =>
  Object.values(state.comments.entities).filter((entity) => entity!.postId === id);

export default commentsSlice.reducer;
