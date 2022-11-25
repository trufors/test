import { Box, Button, ButtonGroup, GridItem } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AlbumType } from '../../store/slices/albums';

export const Album: FC<AlbumType> = ({ userId, title, id }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      <GridItem boxShadow="xl" rounded="md" bg="white" w="100%" h="300" p="20px">
        <ButtonGroup>
          <Button onClick={() => navigate(`${id}/edit`)}>Edit</Button>
          <Button>Delete</Button>
        </ButtonGroup>
        <Box h="100%" w="100%" bg="white" textAlign="center" m="auto 0">
          {title}
        </Box>
      </GridItem>
    </>
  );
};
