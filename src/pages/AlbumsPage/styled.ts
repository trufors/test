import { Grid } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const GridScrollContainer = styled(Grid)`
  &::-webkit-scrollbar {
    display: none;
  }
  overflow: scroll;
  background-color: white;
  padding: 20px 25px;
`;
