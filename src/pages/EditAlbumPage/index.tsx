import { Button, Flex, Grid, Heading, Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { selectPhotosById } from '../../store/slices/photos/selectors';
import { selectAlbumById } from '../../store/slices/albums/selectors';
import { fetchPhotos } from '../../store/slices/photos/asyncThunkPhotos';
import { fetchUpdateAlbum } from '../../store/slices/albums/asyncThunkAlbums';
import { Photo } from '../../components/Photo';
import { AlbumType, PhotoType } from '../../types';

const GridScrollContainer = styled(Grid)`
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const EditAlbumPage: FC = () => {
  const { albumId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const photos = useAppSelector((state) => selectPhotosById(state, albumId!)) as PhotoType[];
  const currentAlbum = useAppSelector((state) => selectAlbumById(state, albumId!)) as AlbumType;

  useEffect(() => {
    dispatch(fetchPhotos({ id: albumId! }));
    setInputValue(currentAlbum.title);
    return () => {
      setInputValue('');
    };
  }, []);

  const saveChanges = () => {
    const album: AlbumType = {
      userId: '1',
      id: parseInt(albumId!),
      title: inputValue,
    };
    dispatch(fetchUpdateAlbum(album));
    navigate('/albums');
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
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="write your title"
      />
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
