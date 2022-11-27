import { FC } from 'react';
import { TitleStyled } from '../styled';
import { useAppSelector } from '../../hooks';
import { MenuSidebar } from './MenuSidebar';
import { ButtonSidebar } from './ButtonSidebar';
import { Link } from 'react-router-dom';
type Props = {
  isOpen: boolean;
};
export const Sidebar: FC<Props> = ({ isOpen }) => {
  return (
    <>
      <Link to="/">
        <TitleStyled>{isOpen ? 'SoftProject' : 'SP'}</TitleStyled>
      </Link>
      <MenuSidebar isOpen={isOpen} />
      <ButtonSidebar isOpen={isOpen} />
    </>
  );
};
