import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { graphql, useFragment } from 'react-relay';
import { EstablishmentCard_establishnment$key } from './__generated__/EstablishmentCard_establishnment.graphql';
interface CardProps {
  establishment: EstablishmentCard_establishnment$key;
}

export default function EstablishmentCard(props: CardProps) {
  const navigate = useNavigate();

  const data = useFragment<EstablishmentCard_establishnment$key>(
    graphql`
      fragment EstablishmentCard_establishnment on Establishment {
        _id
        referenceLink
        description
        address
        name
        category
        createdAt
        reviews {
          count
        }
        user {
          _id
          name
        }
      }
    `,
    props.establishment,
  );

  return (
    <Center py={6} onClick={() => navigate(`/establishments/${data._id}`)}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Box bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
          <img
            src={
              'https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600w-1037719192.jpg'
            }
          />
        </Box>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            {data.category}
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {data.name}
          </Heading>
          <Text color={'gray.500'}>{data.description}</Text>
          <Text color={'gray.500'} fontWeight="bold">
            Reviews: {data.reviews.count}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar
            src={
              'https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600w-1037719192.jpg'
            }
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{data.user?.name}</Text>
            <Text color={'gray.500'}>
              {formatDistance(
                new Date(data.createdAt || new Date()),
                new Date(),
                {
                  addSuffix: true,
                },
              )}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
