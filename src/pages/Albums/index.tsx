import { Flex, Grid, Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchAlbums } from '../../store/slices/albums/asyncThunkAlbums';
import { selectAlbums } from '../../store/slices/albums/selectors';
import { ActiveAlbum } from './ActiveAlbum';

import { Album } from './Album';

const GridScrollContainer = styled(Grid)`
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Albums: FC = () => {
  const dispatch = useAppDispatch();
  const { entities, ids, activeAlbumId } = useAppSelector(selectAlbums);
  

  useEffect(() => {
    dispatch(fetchAlbums());
  }, []);

  return (
    <>
      <Heading as="h2" fontWeight="600" fontSize="28px" lineHeight="36px" mb="24px" color="#90a0b7">
        Albums
      </Heading>

      {activeAlbumId ? <ActiveAlbum id={activeAlbumId} /> : ''}
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
        overflow="scroll"
        templateColumns="repeat(4, 1fr)"
        gap={10}
        bgColor="white"
        maxHeight={'850px'}
        boxShadow="xl"
        rounded="md"
        p="20px 25px">
        {ids && ids.map((id) => <Album key={id} {...entities[id]!} />)}
      </GridScrollContainer>
    </>
  );
};

// maxHeight={activeAlbum ? '350px' : '850px'}
