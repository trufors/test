import { CloseIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Input,
  Stack,
} from '@chakra-ui/react';
import { ChangeEvent, FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  editPostBody,
  editPostTitle,
  fetchCreatePost,
  fetchUpdatePost,
  selectPostForm,
  setPostForm,
} from '../../store/slices/posts';

export const PostFormPage: FC = () => {
  const { postId } = useParams();
  const id = postId ? parseInt(postId) : 0;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPostForm(id));
  }, []);

  const { title, body } = useAppSelector(selectPostForm);

  const handlerTitleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    dispatch(editPostTitle(target.value));
    console.log(title);
  };

  const handlerBodyChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    dispatch(editPostBody(target.value));
    console.log(body);
  };

  const fetchForm = () => {
    postId ? dispatch(fetchUpdatePost()) : dispatch(fetchCreatePost());
    navigate('/posts');
    dispatch(setPostForm());
  };

  return (
    <>
      <Heading as="h2" fontWeight="600" fontSize="28px" lineHeight="36px" mb="24px" color="#90a0b7">
        {postId ? 'Edit' : 'Create'}
      </Heading>
      <Flex color="#90a0b7" justifyContent="space-between" mb="10px">
        <Heading
          as="h3"
          fontWeight="600"
          fontSize="16px"
          lineHeight="24px"
          mb="10px"
          color="#90a0b7">
          {postId ? 'Edit post' : 'Create your post'}
        </Heading>
        <Icon onClick={() => navigate('/posts')} cursor="pointer" as={CloseIcon} />
      </Flex>

      <Stack
        bgColor="white"
        boxShadow="xl"
        rounded="md"
        flexDirection="column"
        p="20px 25px"
        spacing={3}>
        <FormControl borderBottom="1px solid lightgrey">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            variant="filled"
            placeholder="Insert your email"
            disabled={postId ? true : false}
          />
          <FormHelperText pb="10px">We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl borderBottom="1px solid lightgrey">
          <FormLabel>Title your post</FormLabel>
          <Input
            value={title}
            onChange={handlerTitleChange}
            type="text"
            variant="filled"
            placeholder="Insert your title"
          />
          <FormHelperText pb="10px">This title will be seen by the whole world</FormHelperText>
        </FormControl>
        <FormControl borderBottom="1px solid lightgrey">
          <FormLabel>Text your post </FormLabel>
          <Input
            type="text"
            value={body}
            onChange={handlerBodyChange}
            variant="filled"
            placeholder="Insert your text"
          />
          <FormHelperText pb="10px">This text will be seen by the whole world</FormHelperText>
        </FormControl>
        <Button onClick={fetchForm}>Confirm</Button>
      </Stack>
    </>
  );
};