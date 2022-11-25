import { configureStore } from '@reduxjs/toolkit';
import albums from './slices/albums';
import comments from './slices/comments';
import photos from './slices/photos';
import posts from './slices/posts';
import sidebar from './slices/sidebar';
import todos from './slices/todos';

export const store = configureStore({
  reducer: {
    sidebar,
    albums,
    todos,
    posts,
    comments,
    photos,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
