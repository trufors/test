import { GridItem, Skeleton, Stack } from '@chakra-ui/react';
import { FC } from 'react';

export const PhotoSkeleton: FC = () => {
  return (
    <GridItem
      border="1px solid lightgrey"
      boxShadow="xl"
      rounded="md"
      bg="white"
      w="100%"
      h="320px"
      p="20px">
      <Stack>
        <Skeleton height="30px" />
        <Skeleton height="30px" />
        <Skeleton height="100px" />
      </Stack>
    </GridItem>
  );
};
