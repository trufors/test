import { Flex, GridItem, Stack } from '@chakra-ui/react';
import { Skeleton } from '@chakra-ui/react';
import { FC } from 'react';

export const AlbumSkeleton: FC = () => {
  return (
    <GridItem
      border="1px solid lightgrey"
      boxShadow="xl"
      rounded="md"
      bg="white"
      w="100%"
      h="300"
      p="20px">
      <Stack>
        <Skeleton height="30px" />
        <Skeleton height="30px" />
        <Skeleton height="150px" />
      </Stack>
    </GridItem>
  );
};
