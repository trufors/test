import { Button, Flex, Grid, Heading, Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ChangeEvent, FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { selectPhotosById } from '../../store/slices/photos/selectors';
import { setEditInput } from '../../store/slices/albums/slice';
import { selectAlbumById, selectAlbumsInputValue } from '../../store/slices/albums/selectors';
import { fetchPhotos } from '../../store/slices/photos/asyncThunkPhotos';
import { fetchUpdateAlbum } from '../../store/slices/albums/asyncThunkAlbums';
import { Photo } from '../../components/Photo';

const GridScrollContainer = styled(Grid)`
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const EditAlbumPage: FC = () => {
  const { albumId } = useParams();
  const dispatch = useAppDispatch();

  const photos = useAppSelector((state) => selectPhotosById(state, albumId!));
  const currentAlbum = useAppSelector((state) => selectAlbumById(state, albumId!));
  const value = useAppSelector(selectAlbumsInputValue);

  useEffect(() => {
    dispatch(fetchPhotos({ id: albumId! }));
    dispatch(setEditInput(currentAlbum!.title));
    return () => {
      dispatch(setEditInput(''));
    };
  }, []);

  const handlerInput = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    dispatch(setEditInput(target.value));
  };

  const saveChanges = () => {
    dispatch(fetchUpdateAlbum({ id: albumId! }));
  };

  return (
    <>
      <Heading as="h2" fontWeight="600" fontSize="28px" lineHeight="36px" mb="24px" color="#90a0b7">
        Albums
      </Heading>
      <Flex color="#90a0b7" justifyContent="space-between" mb="10px" alignItems="center">
        <Heading as="h3" fontWeight="600" fontSize="16px" lineHeight="24px" color="#90a0b7">
          Edit Album
        </Heading>
        <Button onClick={saveChanges} border="1px solid lightgrey" bgColor="white">
          Save
        </Button>
      </Flex>
      <Input value={value} onChange={handlerInput} placeholder="write your title" />
      <GridScrollContainer
        overflow="scroll"
        templateColumns="repeat(4, 1fr)"
        gap={10}
        bgColor="white"
        maxHeight={'750px'}
        boxShadow="xl"
        rounded="md"
        p="20px 25px">
        {photos && photos.map((photo) => <Photo key={photo!.id} {...photo!} />)}
      </GridScrollContainer>
    </>
  );
};
