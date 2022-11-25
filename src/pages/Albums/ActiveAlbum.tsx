import { FC, useEffect } from 'react';
import axios from 'axios';
import { Box, Center, CloseButton, Flex, Heading, Img, Text } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveAlbum, setCurrentAlbum } from '../../store/slices/albums';
import { IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { TitleStyled } from '../../layout/styled';

export const ActiveAlbum: FC = () => {
  const dispatch = useAppDispatch();
  const { activeAlbum, currentAlbum } = useAppSelector((state) => state.albums);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${activeAlbum}/photos`)
      .then((res) => dispatch(setCurrentAlbum(res.data)));
  }, [activeAlbum]);

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
          Active Album
        </Heading>
        <CloseButton onClick={() => dispatch(setActiveAlbum(0))} />
      </Flex>
      <Box
        transition="all easy 1s"
        m="0 auto"
        rounded="md"
        boxShadow="xl"
        bg="white"
        maxHeight="400px"
        color="white"
        mb="50px"
        overflow="hidden"
        p="10px"
        bgColor="rgb(0 0 0 / 6%)">
        <Flex
          h="calc(100% - 20px)"
          position="relative"
          justifyContent="space-evenly"
          m="auto 0"
          alignItems="center"
          p="10px">
          <IconButton
            colorScheme="teal"
            bgColor="rgb(0 0 0 / 6%)"
            as={ChevronLeftIcon}
            color="black"
            aria-label="prev"
          />

          <IconButton
            colorScheme="teal"
            bgColor="rgb(0 0 0 / 6%)"
            as={ChevronRightIcon}
            color="black"
            aria-label="next"
          />
        </Flex>
      </Box>
    </>
  );
};
