import { RootState } from '../..';
import { CommentType } from '../../../types';

export const selectCommentsByPostId = (state: RootState, id: string) =>
  Object.values(state.comments.entities).filter(
    (entity) => entity!.postId === parseInt(id),
  ) as CommentType[];

export const selectCommentsStatus = (state: RootState) => state.comments.status;
