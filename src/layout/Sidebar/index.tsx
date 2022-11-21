import { FC } from 'react';
import { TitleStyled } from '../styled';
import { useAppSelector } from '../../hooks';
import { MenuSidebar } from './MenuSidebar';
import { ButtonSidebar } from './ButtonSidebar';
type Props = {
  isOpen: boolean;
};
export const Sidebar: FC<Props> = ({ isOpen }) => {
  return (
    <>
      <TitleStyled>{isOpen ? 'SoftProject' : 'SP'}</TitleStyled>
      <MenuSidebar isOpen={isOpen} />
      <ButtonSidebar isOpen={isOpen} />
    </>
  );
};
