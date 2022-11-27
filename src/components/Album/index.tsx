import { Box, Button, ButtonGroup, Flex, GridItem, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchDeleteAlbum } from '../../store/slices/albums/asyncThunkAlbums';
import { setActiveAlbum } from '../../store/slices/albums/slice';
import { AlbumType } from '../../types';
import { GridItemStyled } from './styled';

export const Album: FC<AlbumType> = ({ title, id }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <GridItemStyled border="1px solid lightgrey" boxShadow="xl" rounded="md">
      <Flex w="100%" alignItems="right" borderBottom="1px solid lightgrey" pb="5px" mb="40px">
        <ButtonGroup ml="auto">
          <Button onClick={() => navigate(`${id}/edit`)}>Edit</Button>
          <Button onClick={() => dispatch(fetchDeleteAlbum({ id: id.toString() }))}>Delete</Button>
        </ButtonGroup>
      </Flex>
      <Flex
        bg="white"
        onClick={() => dispatch(setActiveAlbum(id))}
        flexDirection="column"
        alignItems="center"
        textAlign="center">
        <Image
          h="100px"
          w="100px"
          src="https://img.icons8.com/ios/100/000000/xlarge-icons.png"
          borderBottom="1px solid lightgrey"
          mb="5px"
        />
        <Box>
          <Text>{title}</Text>
        </Box>
      </Flex>
    </GridItemStyled>
  );
};
