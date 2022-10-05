import { StarIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Flex,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useLazyLoadQuery } from 'react-relay';
import { AuthMeQuery } from './AuthMeQuery';
import { AuthMeQuery as QueryType } from './__generated__/AuthMeQuery.graphql';

export const ProfilePage = () => {
  const user = useLazyLoadQuery<QueryType>(AuthMeQuery, {});
  return (
    <Flex
      minH={'100vh'}
      w={'100vw'}
      gap={'10px'}
      alignItems={'center'}
      direction={'column'}
      mt={6}
    >
      <Avatar
        size={'2xl'}
        src={'https://avatars.dicebear.com/api/male/username.svg'}
      />
      <Text fontSize={'3xl'}>{user.me?.name}</Text>
      <Flex w={'100%'} justifyContent={'center'} gap={12}>
        <Flex gap={3} alignItems={'center'}>
          <Text fontSize={'3xl'}>Establishments:</Text>
          <Text fontSize={'3xl'}>{user.me?.establishments.count}</Text>
        </Flex>
        <Flex gap={3} alignItems={'center'}>
          <Text fontSize={'3xl'}>Reviews:</Text>
          <Text fontSize={'3xl'}>{user.me?.reviews.count}</Text>
        </Flex>
      </Flex>
      <Stack mt={'10'} w={'xl'}>
        <Text fontWeight={'bold'} fontSize={'2xl'}>
          Review history
        </Text>
        {user.me?.reviews.edges.map((review, index) => (
          <Stack
            p={6}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }
            key={index}
          >
            <Text fontWeight={'bold'}>{review?.node?.establishment?.name}</Text>
            <Flex gap={1}>
              {[...Array(review?.node?.rating).keys()].map((_, index) => (
                <StarIcon key={index} color={'yellow.400'} />
              ))}
            </Flex>
            <Text>{review?.node?.comment}</Text>
          </Stack>
        ))}
      </Stack>
    </Flex>
  );
};
