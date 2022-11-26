import { Box, Button, ButtonGroup, GridItem } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchDeleteAlbum } from '../../store/slices/albums/asyncThunkAlbums';
import { setActiveAlbum } from '../../store/slices/albums/slice';
import { AlbumType } from '../../types';

export const Album: FC<AlbumType> = ({ userId, title, id }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      <GridItem
        onClick={() => dispatch(setActiveAlbum(`${id}`))}
        boxShadow="xl"
        rounded="md"
        bg="white"
        w="100%"
        h="300"
        p="20px">
        <ButtonGroup>
          <Button onClick={() => navigate(`${id}/edit`)}>Edit</Button>
          <Button onClick={() => dispatch(fetchDeleteAlbum({ id: id.toString() }))}>Delete</Button>
        </ButtonGroup>
        <Box bg="white" textAlign="center" m="auto">
          {title}
        </Box>
      </GridItem>
    </>
  );
};
