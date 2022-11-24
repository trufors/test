import { Box } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchComments, selectCommentsByPostId } from '../../store/slices/comments';
import { Comment } from './Comment';

type CommentsProps = {
  id: number;
};

export const Comments: FC<CommentsProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchComments(id));
  }, []);

  const comments = useAppSelector((state) => selectCommentsByPostId(state, id));

  return (
    <Box pb={4}>
      {comments && comments.map((comment) => <Comment key={comment!.id} {...comment!} />)}
    </Box>
  );
};
