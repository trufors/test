import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Heading,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { fetchDeletePost } from '../../store/slices/posts/asyncThunkPosts';
import { PostType } from '../../types';

import { Comments } from '../Comments';

export const Post: FC<PostType> = ({ title, id, body }) => {
  const { isOpen, onToggle } = useDisclosure();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Card
      border="1px solid lightgrey"
      boxShadow="xl"
      rounded="md"
      mb="25px"
      bg="white"
      w="100%"
      p="20px">
      <CardHeader display="flex" justifyContent="space-between">
        <Heading size="md">{title}</Heading>
        <ButtonGroup>
          <Button onClick={() => navigate(`${id}/edit`)}>Edit</Button>
          <Button onClick={() => dispatch(fetchDeletePost({ id: id.toString() }))}>Delete</Button>
        </ButtonGroup>
      </CardHeader>

      <CardBody>
        <Text pt="2" fontSize="sm" mb="20px">
          {body}
        </Text>
        <Box
          p="10px 20px"
          onClick={onToggle}
          cursor="pointer"
          alignItems="center"
          border="1px solid lightgrey"
          bgColor={isOpen ? 'white' : 'lightgrey'}
          rounded="md"
          mb="10px"
          w="100%">
          <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon} w="6" h="6" mr="10px" />
          Comments
        </Box>

        <Collapse in={isOpen} animateOpacity>
          {isOpen && <Comments id={id.toString()} />}
        </Collapse>
      </CardBody>
    </Card>
  );
};
