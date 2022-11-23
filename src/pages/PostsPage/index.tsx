import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Box,
  Text,
  GridItem,
  Grid,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FC, useEffect } from 'react';
import { HttpService } from '../../api';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPosts } from '../../store/slices/posts';
import { ActivePost } from './ActivePost';
import { Posts } from './Posts';

const GridScrollContainer = styled(Grid)`
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const PostsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { posts, activePostId } = useAppSelector((state) => state.posts);
  useEffect(() => {
    HttpService.get('/posts/').then((res) => {
      dispatch(setPosts(res.data));
    });
  }, [posts]);
  return (
    <>
      <Heading as="h2" fontWeight="600" fontSize="28px" lineHeight="36px" mb="24px" color="#90a0b7">
        Posts
      </Heading>

      {activePostId ? <ActivePost /> : <></>}
      <Posts posts={posts} />
    </>
  );
};
