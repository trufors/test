import { Box } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchComments } from '../../store/slices/comments/asyncThunkComments';
import { selectCommentsByPostId } from '../../store/slices/comments/selectors';
import { FetchParams } from '../../types';

import { Comment } from '../Comment';

export const Comments: FC<FetchParams> = ({ id }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchComments({ id }));
  }, []);

  const comments = useAppSelector((state) => selectCommentsByPostId(state, id));

  return (
    <Box pb={4}>
      {comments && comments.map((comment) => <Comment key={comment!.id} {...comment!} />)}
    </Box>
  );
};
