import { Box, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setAlbumsState } from '../../store/slices/albums';
import { Album } from './Album';
import { CloseButton } from '@chakra-ui/react';
import { ActiveAlbum } from './ActiveAlbum';

type Fetch = {
  data: any;
};

export const Albums: FC = () => {
  const dispatch = useAppDispatch();
  const { activeAlbum } = useAppSelector((state) => state.albums);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/albums/')
      .then((res) => dispatch(setAlbumsState(res.data)));
  }, [activeAlbum]);
  const data = useAppSelector((state) => state.albums.data);

  return (
    <>
      <Heading as="h2" fontWeight="600" fontSize="28px" lineHeight="36px" mb="24px" color="#90a0b7">
        Albums
      </Heading>

      {activeAlbum ? <ActiveAlbum /> : ''}
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
      <Grid templateColumns="repeat(4, 1fr)" h="" gap={10}>
        {data.length && data.map((item) => <Album key={item.id} item={item} />)}
      </Grid>
    </>
  );
};
