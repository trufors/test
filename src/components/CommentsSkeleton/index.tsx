import { Skeleton, Stack } from '@chakra-ui/react';
import { FC } from 'react';

export const CommentsSkeleton: FC = () => {
  return (
    <Stack>
      <Skeleton rounded="md" height="50px" />
      <Skeleton rounded="md" height="50px" />
      <Skeleton rounded="md" height="50px" />
    </Stack>
  );
};
