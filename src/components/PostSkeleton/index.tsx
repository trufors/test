import { Card, Skeleton, Stack } from '@chakra-ui/react';
import { FC } from 'react';

export const PostSkeleton: FC = () => {
  return (
    <Card
      border="1px solid lightgrey"
      boxShadow="xl"
      rounded="md"
      mb="25px"
      bg="white"
      w="100%"
      p="20px">
      <Stack>
        <Skeleton rounded="md" height="50px" />
        <Skeleton rounded="md" height="50px" />
        <Skeleton rounded="md" height="50px" />
      </Stack>
    </Card>
  );
};
