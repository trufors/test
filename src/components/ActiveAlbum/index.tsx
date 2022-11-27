import { FC, useEffect, useRef, useState } from 'react';
import { Box, CloseButton, Flex } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { AlbumType, PhotoType } from '../../types';
import { selectPhotosById, selectPhotosStatus } from '../../store/slices/photos/selectors';
import { fetchPhotos } from '../../store/slices/photos/asyncThunkPhotos';
import { Photo } from '../Photo';
import { setActiveAlbum } from '../../store/slices/albums/slice';
import { BoxStyled, FlexContainerStyled, HeadingStyled } from './styled';
import { selectAlbumById } from '../../store/slices/albums/selectors';
import { PhotoSkeleton } from '../PhotoSkeleton';

type ActiveAlbum = {
  id: number;
};

export const ActiveAlbum: FC<ActiveAlbum> = ({ id }) => {
  const [offset, setOffset] = useState(0);
  const [offsetWidth, setOffsetWidth] = useState(0);
  const dispatch = useAppDispatch();
  const currentAlbum = useAppSelector((state) =>
    selectAlbumById(state, id!.toString()),
  ) as AlbumType;
  const photos = useAppSelector((state) => selectPhotosById(state, id!.toString())) as PhotoType[];
  const sliderRef = useRef<HTMLDivElement>(null);
  const status = useAppSelector(selectPhotosStatus);

  useEffect(() => {
    dispatch(fetchPhotos({ id: id.toString() }));
    setOffsetWidth((photos.length - 1) * 240);
  }, [id]);

  const prevHandler = () => {
    sliderRef.current!.childNodes.forEach((element) => {
      if (Math.abs(offset) !== 0) {
        setOffset(offset + 240);
      }
    });
  };
  const nextHandler = () => {
    sliderRef.current!.childNodes.forEach((element) => {
      if (Math.abs(offset) !== offsetWidth) {
        setOffset(offset - 240);
      }
    });
  };
  return (
    <>
      <Flex color="#90a0b7" justifyContent="space-between" mb="10px">
        <HeadingStyled>{currentAlbum.title}</HeadingStyled>
        <CloseButton onClick={() => dispatch(setActiveAlbum(0))} />
      </Flex>
      <BoxStyled>
        <FlexContainerStyled>
          <IconButton
            colorScheme="teal"
            bgColor="rgb(0 0 0 / 6%)"
            as={ChevronLeftIcon}
            onClick={prevHandler}
            color="black"
            aria-label="prev"
          />
          <Box overflow="hidden" position="relative" border="none" w="240px" h="320px">
            <Flex
              ref={sliderRef}
              transition="all 1s"
              transitionProperty="transform"
              transform={`translateX(${offset}px)`}
              flexDirection="row"
              color="grey">
              {status === 'loading' ? (
                <PhotoSkeleton />
              ) : (
                photos.map((photo) => <Photo key={photo!.id} {...photo!} />)
              )}
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
        </FlexContainerStyled>
      </BoxStyled>
    </>
  );
};
