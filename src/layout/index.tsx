import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Sidebar } from './Sidebar';
import { AsideStyled, MainStyled, SectionStyled } from './styled';
import { useAppSelector } from '../hooks';

export const Layout: FC = () => {
  const isOpen: boolean = useAppSelector((state) => state.sidebar.isOpen);

  return (
    <MainStyled isOpen={isOpen}>
      <AsideStyled isOpen={isOpen}>
        <Sidebar isOpen={isOpen} />
      </AsideStyled>
      <SectionStyled>
        <Outlet />
      </SectionStyled>
    </MainStyled>
  );
};
