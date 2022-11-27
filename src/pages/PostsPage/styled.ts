import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const FlexScrollContainer = styled(Flex)`
  &::-webkit-scrollbar {
    display: none;
  }
`;