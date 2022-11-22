import { Box, GridItem } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveAlbum } from '../../store/slices/albums';

export const Album: FC<any> = ({ item }) => {
  const dispatch = useAppDispatch();
  const activeAlbum = useAppSelector((state) => state.albums);
  return (
    <>
      <GridItem
        onClick={() => dispatch(setActiveAlbum(item.id))}
        boxShadow="xl"
        rounded="md"
        bg="white"
        w="100%"
        h="300"
        p="20px">
        <Box h="100%" w="100%" bg="white" textAlign="center" m="auto 0">
          {item.title}
        </Box>
      </GridItem>
    </>
  );
};
