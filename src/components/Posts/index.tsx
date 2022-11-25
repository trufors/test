import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FC } from 'react';
import { useAppSelector } from '../../hooks';
import { selectPosts } from '../../store/slices/posts';

import { Post } from '../Post';

const FlexScrollContainer = styled(Flex)`
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Posts: FC = () => {
  const { entities, ids } = useAppSelector(selectPosts);
  return (
    <>
      <FlexScrollContainer
        bgColor="white"
        overflow="scroll"
        maxHeight="850px"
        boxShadow="xl"
        rounded="md"
        flexDirection="column"
        p="20px 25px">
        {ids.map((id) => (
          <Post {...entities[id]!} />
        ))}
      </FlexScrollContainer>
    </>
  );
};
