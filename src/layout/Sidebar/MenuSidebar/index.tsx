import { ChatIcon, EditIcon, StarIcon } from '@chakra-ui/icons';
import { List, ListIcon, ListItem } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  isOpen: boolean;
};

export const MenuSidebar: FC<Props> = ({ isOpen }) => {
  return (
    <List fontSize={16} spacing={3}>
      <ListItem mb="16px">
        <NavLink to="/posts">
          <ListIcon as={ChatIcon} color="black.500" />
          {isOpen && 'Posts'}
        </NavLink>
      </ListItem>
      <ListItem mb="16px">
        <NavLink to="/albums">
          <ListIcon as={StarIcon} color="black.500" />
          {isOpen && 'Albums'}
        </NavLink>
      </ListItem>
      <ListItem mb="16px">
        <NavLink to="/todos">
          <ListIcon as={EditIcon} color="black.500" />
          {isOpen && 'Todos'}
        </NavLink>
      </ListItem>
    </List>
  );
};
