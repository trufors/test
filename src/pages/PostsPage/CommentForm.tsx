import {
  Button,
  Collapse,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ChangeEvent, FC, useState } from 'react';
import { useAppDispatch } from '../../hooks';

type CommentFormProps = {
  commentId: number;
  id: number;
  postId: number;
};

export const CommentForm: FC<CommentFormProps> = ({ commentId, id, postId }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const { isOpen, onToggle } = useDisclosure();

  const handleEmailChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
  };

  const handleBodyChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setBody(target.value);
  };
  const handleNameChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setName(target.value);
  };
  const createNewComment = () => {
    const comment = {
      commentId,
      id,
      email,
      body,
      name,
    };
    dispatch(addNewComment({ postId, comment }));
  };

  return (
    <>
      <Text onClick={onToggle}> write your comment</Text>
      <Collapse in={isOpen}>
        <FormControl>
          <Input type="email" value={email} onChange={handleEmailChange} />
          <Input type="text" value={body} onChange={handleBodyChange} />
          <Input type="text" value={name} onChange={handleNameChange} />
        </FormControl>
        <Button onClick={createNewComment}>Отправить</Button>
      </Collapse>
    </>
  );
};
