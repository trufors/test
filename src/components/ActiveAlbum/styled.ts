import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const BoxStyled = styled(Box)`
  margin: 0 auto;
  border-radius: 20px;
  maxheight: 400px;
  margin-bottom: 50px;
  padding: 10px;
  background-color: rgb(0 0 0 / 6%);
`;
export const HeadingStyled = styled.h3`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 10px;
  color: 90a0b7;
`;
export const FlexContainerStyled = styled.div`
  display: flex;
  overflow: hidden;
  height: calc(100% - 20px);
  position: relative;
  justify-content: space-evenly;
  margin: auto 0;
  align-items: center;
  padding: 10px;
`;
