import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, Icon, IconButton } from '@chakra-ui/react';
import { FC } from 'react';
import { useAppDispatch } from '../../../hooks';
import { setIsOpen } from '../../../store/slices/sidebar/sidebar';

type Props = {
  isOpen: boolean;
};

export const ButtonSidebar: FC<Props> = ({ isOpen }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      {isOpen ? (
        <Button mr="auto" p={0} m={0} background="#fff" onClick={() => dispatch(setIsOpen())}>
          <Icon mr="10px" as={ViewOffIcon} />
          Toggle Sidebar
        </Button>
      ) : (
        <IconButton
          fontSize="10px"
          background="#fff"
          aria-label="Open Sidebar"
          as={ViewIcon}
          onClick={() => dispatch(setIsOpen())}
        />
      )}
    </>
  );
};
