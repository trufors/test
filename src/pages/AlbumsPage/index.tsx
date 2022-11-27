import { Flex, Grid, Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchAlbums } from '../../store/slices/albums/asyncThunkAlbums';
import { selectAlbums, selectAlbumsStatus } from '../../store/slices/albums/selectors';
import { ActiveAlbum } from '../../components/ActiveAlbum';

import { Album } from '../../components/Album';
import { GridScrollContainer } from './styled';
import { AlbumSkeleton } from '../../components';
import { setActiveAlbum } from '../../store/slices/albums/slice';

export const AlbumsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { entities, ids, activeAlbumId } = useAppSelector(selectAlbums);
  const status = useAppSelector(selectAlbumsStatus);

  useEffect(() => {
    dispatch(fetchAlbums());
    return () => {
      dispatch(setActiveAlbum(0));
    };
  }, []);

  return (
    <>
      <Heading as="h2" fontWeight="600" fontSize="28px" lineHeight="36px" mb="24px" color="#90a0b7">
        Albums
      </Heading>

      {activeAlbumId ? <ActiveAlbum id={activeAlbumId} /> : null}
      <Flex color="#90a0b7" justifyContent="space-between" mb="10px">
        <Heading
          as="h3"
          fontWeight="600"
          fontSize="16px"
          lineHeight="24px"
          mb="10px"
          color="#90a0b7">
          Pick Album
        </Heading>
      </Flex>
      <GridScrollContainer
        templateColumns="repeat(4, 1fr)"
        gap={10}
        maxHeight={activeAlbumId ? '350px' : '850px'}
        boxShadow="xl"
        rounded="md">
        {status === 'loading'
          ? [...new Array(8)].map((item, id) => <AlbumSkeleton key={id} />)
          : ids.map((id) => <Album key={id} {...entities[id]!} />)}
      </GridScrollContainer>
    </>
  );
};

//
