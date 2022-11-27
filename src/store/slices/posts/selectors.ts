import { RootState } from '../..';

export const selectPosts = (state: RootState) => state.posts;
export const selectPostById = (state: RootState, id: number) =>
  Object.values(state.posts.entities).filter((entity) => entity!.id === id);
export const selectPostForm = (state: RootState) => state.posts.postForm;
export const selectPostsIds = (state: RootState) => state.posts.ids;
export const selectPostsEntities = (state: RootState) => state.posts.entities;
export const selectPostsStatus = (state: RootState) => state.posts.status;
