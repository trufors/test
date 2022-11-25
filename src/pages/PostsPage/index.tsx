import { Flex, Heading, Box, Text, Button } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks';
import { fetchPosts } from '../../store/slices/posts';
import { Posts } from '../../components';

export const PostsPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  return (
    <>
      <Heading as="h2" fontWeight="600" fontSize="28px" lineHeight="36px" mb="24px" color="#90a0b7">
        Posts
      </Heading>
      <Flex color="#90a0b7" justifyContent="space-between" mb="10px">
        <Heading
          as="h3"
          fontWeight="600"
          fontSize="16px"
          lineHeight="24px"
          mb="10px"
          color="#90a0b7">
          Post feed
        </Heading>
        <Button
          onClick={() => navigate('create')}
          bgColor="white"
          border="1px"
          borderColor="lightgrey">
          Create your post
        </Button>
      </Flex>

      <Posts />
    </>
  );
};
