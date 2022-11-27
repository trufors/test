import { createRef, FC, RefObject, useEffect, useRef, useState } from 'react';
import { Box, CloseButton, Flex, Heading } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { IdParams } from '../../types';
import { selectPhotosById } from '../../store/slices/photos/selectors';
import { fetchPhotos } from '../../store/slices/photos/asyncThunkPhotos';
import { Photo } from '../Photo';
import { setActiveAlbum } from '../../store/slices/albums/slice';

type ActiveAlbum = {
  id: number;
};

export const ActiveAlbum: FC<ActiveAlbum> = ({ id }) => {
  const [offset, setOffset] = useState(0);
  const dispatch = useAppDispatch();
  const photos = useAppSelector((state) => selectPhotosById(state, id!.toString()));
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchPhotos({ id: id.toString() }));
  }, []);

  const prevHandler = () => {
    console.log(sliderRef.current);
    setOffset(offset + 240);
    sliderRef.current!.childNodes.forEach((element) => {
      if (element === sliderRef.current!.firstChild) {
        return;
      }
      element.style = `transform: translateX(${offset}px)`;
    });
  };
  const nextHandler = () => {
    console.log(sliderRef.current);
    setOffset(offset - 240);
    sliderRef.current!.childNodes.forEach((element) => {
      if (element === sliderRef.current!.lastChild) {
        return;
      }
      element.style = `transform: translateX(${offset}px)`;
    });
  };
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
          <Box overflow="hidden">
            <Flex
              left="0"
              transition="all 1s"
              transform={`translateX(${offset}px)`}
              flexDirection="row"
              color="grey"
              w="240px"
              h="320px"
              overflow="hidden">
              {photos ? photos.map((photo) => <Photo key={photo!.id} {...photo!} />) : ''}
            </Flex>
          </Box>

          <IconButton
            onClick={nextHandler}
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
