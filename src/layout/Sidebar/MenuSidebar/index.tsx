import { ChatIcon, EditIcon, StarIcon } from '@chakra-ui/icons';
import { List, ListIcon, ListItem } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  isOpen: boolean;
};

const activeStyle = {
  color: 'grey',
  fontSize: '20px',
};

export const MenuSidebar: FC<Props> = ({ isOpen }) => {
  return (
    <List fontSize={16} color="#334d6e" spacing={3}>
      <ListItem mb="16px" rounded="md" _hover={{ bg: 'lightgrey' }}>
        <NavLink to="/posts" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          <ListIcon as={ChatIcon} color="black.500" />
          {isOpen && 'Posts'}
        </NavLink>
      </ListItem>
      <ListItem mb="16px" rounded="md" _hover={{ bg: 'lightgrey' }}>
        <NavLink to="/albums" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          <ListIcon as={StarIcon} color="black.500" />
          {isOpen && 'Albums'}
        </NavLink>
      </ListItem>
      <ListItem mb="16px" rounded="md" _hover={{ bg: 'lightgrey' }}>
        <NavLink to="/todos" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          <ListIcon as={EditIcon} color="black.500" />
          {isOpen && 'Todos'}
        </NavLink>
      </ListItem>
    </List>
  );
};
