import { RootState } from '../..';

export const selectCommentsByPostId = (state: RootState, id: string) =>
  Object.values(state.comments.entities).filter((entity) => entity!.postId === parseInt(id));
