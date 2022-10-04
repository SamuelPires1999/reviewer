import { Flex, Spinner } from '@chakra-ui/react';

export const LoadScreen = () => {
  return (
    <Flex
      w={'100vw'}
      h={'100vh'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Spinner size={'xl'} thickness={'10px'} />
    </Flex>
  );
};
