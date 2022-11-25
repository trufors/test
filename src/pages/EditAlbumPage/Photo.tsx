import { CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Flex, GridItem, IconButton, Img, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchDeletePhotos, PhotoType } from '../../store/slices/photos';

export const Photo: FC<PhotoType> = ({ url, title, id, albumId }) => {
  const dispatch = useAppDispatch();

  return (
    <GridItem
      border="1px solid lightgrey"
      boxShadow="xl"
      rounded="md"
      bg="white"
      w="100%"
      h="320px"
      p="20px">
      <Flex
        h="70px"
        justifyContent="space-between"
        mb="5px"
        alignItems="center"
        borderBottom="1px solid lightgrey">
        <Text w="100px" textAlign="left" fontSize="10px">
          {title}
        </Text>
        <IconButton
          onClick={() => {
            dispatch(fetchDeletePhotos(id));
          }}
          aria-label="delete photo"
          size="xl"
          cursor="pointer"
          as={CloseIcon}>
          Delete
        </IconButton>
      </Flex>
      <Box m="auto" bg="white" w="200px" h="200px" textAlign="center">
        <Img rounded="md" src={url}></Img>
      </Box>
    </GridItem>
  );
};
