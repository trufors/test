import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface PostsState {
  posts: any;
  activePostId: number;
  currentPost: any;
}

const initialState: PostsState = {
  posts: [],
  activePostId: 0,
  currentPost: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = payload;
    },
    setActivePostId: (state, { payload }) => {
      state.activePostId = payload;
    },
    setCurrentPost: (state, { payload }) => {
      state.currentPost = payload;
    },
  },
});

export const { setPosts, setActivePostId, setCurrentPost } = postsSlice.actions;

export const selectIsOpen = (state: RootState) => state.posts.posts;

export default postsSlice.reducer;
