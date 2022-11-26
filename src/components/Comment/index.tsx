import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Collapse, Icon, Text, Box, useDisclosure } from '@chakra-ui/react';
import { FC } from 'react';
import { CommentType } from '../../types';

export const Comment: FC<CommentType> = ({ email, name, body, id, postId }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box border="1px" borderColor="lightgrey" rounded="md" mb="10px" p="10px">
      <Box
        onClick={onToggle}
        cursor="pointer"
        flex="1"
        textAlign="left"
        border="1px solid grey"
        rounded="md">
        <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon} />
        {email}
        <Collapse in={isOpen} animateOpacity>
          <Box flex="1" textAlign="left">
            name:{name}
          </Box>
        </Collapse>
      </Box>
      <Box flex="1" textAlign="left">
        {body}
      </Box>
    </Box>
  );
};
