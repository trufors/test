import styled from '@emotion/styled';

type LayoutStyledProps = {
  isOpen: boolean;
};

export const setWidthMain = (isOpen: boolean): string => (isOpen ? '256px 1fr' : '70px 1fr');
export const changeMargins = (isOpen: boolean): string =>
  isOpen ? '' : 'margin-left: auto; margin-right: auto; text-align:center;';

export const TitleStyled = styled.h2`
  font-size: 24px;
  line-height: 36px;
  height: 36px;
  color: var(--dark-blue);
  margin-top: 0;
  margin-bottom: 32px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
`;

export const MainStyled = styled.main`
  display: grid;
  grid-template-columns: ${(props: LayoutStyledProps): string => setWidthMain(props.isOpen)};
  grid-template-rows: minmax(100vh, auto);
  grid-template-areas: 'sidebar content';
`;

export const AsideStyled = styled.aside`
  grid-area: sidebar;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  background: #fff;
  box-shadow: 6px 0 18px rgb(0 0 0 / 6%);
  padding: 24px 26px;
  height: 100vh;
  position: sticky;
  top: 0;
  ${(props: LayoutStyledProps): string => changeMargins(props.isOpen)}
`;

export const SectionStyled = styled.section`
  grid-area: content;
  background: #f5f6f8;
  padding: 24px 36px;
  height: 100vh;
`;
