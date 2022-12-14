import { configureStore } from '@reduxjs/toolkit';

import albums from './slices/albums/slice';
import comments from './slices/comments/slice';
import photos from './slices/photos/slice';
import posts from './slices/posts/slice';
import todos from './slices/todos/slice';

import sidebar from './slices/sidebar/sidebar';
import boards from './slices/boards/slice';

export const store = configureStore({
  reducer: {
    sidebar,
    albums,
    todos,
    posts,
    comments,
    photos,
    boards,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
