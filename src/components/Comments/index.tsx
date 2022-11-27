import { Box, Skeleton } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchComments } from '../../store/slices/comments/asyncThunkComments';
import {
  selectCommentsByPostId,
  selectCommentsStatus,
} from '../../store/slices/comments/selectors';
import { IdParams } from '../../types';

import { Comment } from '../Comment';
import { CommentsSkeleton } from '../CommentsSkeleton';

export const Comments: FC<IdParams> = ({ id }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => selectCommentsByPostId(state, id));
  const status = useAppSelector(selectCommentsStatus);

  useEffect(() => {
    dispatch(fetchComments({ id }));
  }, []);

  return (
    <Box pb={4}>
      {status === 'loading' ? (
        <CommentsSkeleton />
      ) : (
        comments.map((comment) => <Comment key={comment.id} {...comment} />)
      )}
    </Box>
  );
};
