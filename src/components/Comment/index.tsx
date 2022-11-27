import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Collapse, Icon, Text, Box, useDisclosure } from '@chakra-ui/react';
import { FC } from 'react';
import { CommentType } from '../../types';

export const Comment: FC<CommentType> = ({ email, name, body, id, postId }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box color="" border="1px solid lightgrey" rounded="md" mb="10px" p="10px">
      <Box
        mb="10px"
        onClick={onToggle}
        cursor="pointer"
        flex="1"
        textAlign="left"
        bgColor={isOpen ? 'white' : 'lightgrey'}
        border="1px solid lightgrey"
        rounded="md">
        <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon} />
        {email}
        <Collapse in={isOpen} animateOpacity>
          <Box pl="15px" flex="1" textAlign="left">
            name:{name}
          </Box>
        </Collapse>
      </Box>
      <Box flex="1" pl="10px" textAlign="left">
        {body}
      </Box>
    </Box>
  );
};
