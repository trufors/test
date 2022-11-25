import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchAlbums, selectAlbumById, selectAlbums } from '../../store/slices/albums';

import { CloseButton } from '@chakra-ui/react';
import { Album } from '../Albums/Album';
import { Photo } from './Photo';
import { fetchPhotos, selectPhotos } from '../../store/slices/photos';
import { useParams } from 'react-router-dom';

const GridScrollContainer = styled(Grid)`
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const EditAlbumPage: FC = () => {
  const { albumId } = useParams();
  const dispatch = useAppDispatch();
  const { entities, ids } = useAppSelector(selectPhotos);

  useEffect(() => {
    dispatch(fetchPhotos(albumId!));
  }, []);

  return (
    <>
      <Heading as="h2" fontWeight="600" fontSize="28px" lineHeight="36px" mb="24px" color="#90a0b7">
        Albums
      </Heading>
      <Flex color="#90a0b7" justifyContent="space-between" mb="10px" alignItems="center">
        <Heading as="h3" fontWeight="600" fontSize="16px" lineHeight="24px" color="#90a0b7">
          Edit Album
        </Heading>
        <Button border="1px solid lightgrey" bgColor="white">
          Save
        </Button>
      </Flex>
      <GridScrollContainer
        overflow="scroll"
        templateColumns="repeat(4, 1fr)"
        gap={10}
        bgColor="white"
        maxHeight={'750px'}
        boxShadow="xl"
        rounded="md"
        p="20px 25px">
        {ids && ids.map((id) => <Photo key={id} {...entities[id]!} />)}
      </GridScrollContainer>
    </>
  );
};
