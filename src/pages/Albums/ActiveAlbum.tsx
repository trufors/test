import { createRef, FC, RefObject, useEffect, useRef } from 'react';
import { Box, CloseButton, Flex, Heading } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { FetchParams } from '../../types';
import { selectPhotosById } from '../../store/slices/photos/selectors';
import { fetchPhotos } from '../../store/slices/photos/asyncThunkPhotos';
import { Photo } from '../../components/Photo';
import { setActiveAlbum } from '../../store/slices/albums/slice';

export const ActiveAlbum: FC<FetchParams> = ({ id }) => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector((state) => selectPhotosById(state, id!));
  const sliderRef = createRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchPhotos({ id }));
  }, []);
  const prevHandler = () => {
    sliderRef.childNodes;
  };
  const nextHandler = () => {};
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
        <CloseButton onClick={() => dispatch(setActiveAlbum('0'))} />
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
            onClick={prevHandler}
            color="black"
            aria-label="prev"
          />
          <Flex
            flexDirection="row"
            onClick={nextHandler}
            ref={sliderRef}
            color="grey"
            w="240px"
            h="320px"
            overflow="hidden">
            {photos ? photos.map((photo) => <Photo key={photo!.id} {...photo!} />) : ''}
          </Flex>

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
