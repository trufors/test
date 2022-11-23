import { Box, Card, CardBody, CardHeader, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { setActivePostId } from '../../store/slices/posts';

const GridScrollContainer = styled(Grid)`
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Posts: FC<any> = ({ posts }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Flex color="#90a0b7" justifyContent="space-between" mb="10px">
        <Heading
          as="h3"
          fontWeight="600"
          fontSize="16px"
          lineHeight="24px"
          mb="10px"
          color="#90a0b7">
          Pick Posts
        </Heading>
      </Flex>
      <GridScrollContainer
        bgColor="white"
        overflow="scroll"
        maxHeight="850px"
        boxShadow="xl"
        rounded="md"
        p="20px 25px"
        templateColumns="repeat(2, 1fr)"
        gap={10}>
        {posts.map((post) => (
          <Card
            boxShadow="xl"
            onClick={() => dispatch(setActivePostId(post.id))}
            rounded="md"
            bg="white"
            w="100%"
            h="300"
            p="20px">
            <CardHeader>
              <Heading size="md">{post.title}</Heading>
            </CardHeader>

            <CardBody>
              <Box>
                <Text pt="2" fontSize="sm">
                  View a summary of all your clients over the last month.
                </Text>
              </Box>
            </CardBody>
          </Card>
        ))}
      </GridScrollContainer>
    </>
  );
};
