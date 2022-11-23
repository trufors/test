import { FC, useEffect } from 'react';
import axios from 'axios';
import { Box, CloseButton, Flex, Heading, Img, Text } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveAlbum, setCurrentAlbum } from '../../store/slices/albums';
import { IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { setActivePostId, setCurrentPost } from '../../store/slices/posts';
import { HttpService } from '../../api';

export const ActivePost: FC = () => {
  const dispatch = useAppDispatch();
  const { activePostId, currentPost } = useAppSelector((state) => state.posts);

  useEffect(() => {
    HttpService.get(`/posts/${activePostId}`).then((res) => dispatch(setCurrentPost(res.data)));
  }, [activePostId]);

  return (
    <>
      <Flex color="#90a0b7" justifyContent="space-between" mb="10px">
        <Heading
          as="h3"
          fontWeight="600"
          fontSize="16px"
          lineHeight="24px"
          mb="10px"
          color="#90a0b7">
          Active Post
        </Heading>
        <CloseButton onClick={() => dispatch(setActivePostId(0))} />
      </Flex>
      <Box
        transition="all easy 1s"
        rounded="md"
        boxShadow="xl"
        bg="white"
        h="300px"
        color="white"
        mb="50px"
        w="100%"
        overflow="hidden"
        p="10px"
        bgColor="rgb(0 0 0 / 6%)">
        {currentPost.title}
        {currentPost.body}
      </Box>
    </>
  );
};
