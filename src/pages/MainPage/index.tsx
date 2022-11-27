import { Box, Flex } from '@chakra-ui/react';
import { FC } from 'react';

export const MainPage: FC = () => {
  return (
    <Flex
      m="auto"
      bgColor="white"
      maxHeight="850px"
      boxShadow="xl"
      rounded="md"
      flexDirection="column"
      p="20px 25px">
      Привет Арсюха Это видишь только ты, в финалке я норм здесь сделаю че кого и как, по поводу
      альбомов баги есть (спать ложусь уже, завтра слайдер допилю) завтра их пофикшу есть пару
      моментов по стилям с адаптивчиком но в прицнипе худо бедно все ок работает сделал все кроме
      тестов завтра пару тестов накидаю так чисто для доп баллов
    </Flex>
  );
};
