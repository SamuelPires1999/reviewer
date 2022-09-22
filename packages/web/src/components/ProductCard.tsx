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
interface CardProps {
  author: string;
  description: string;
  reviewCount: number;
  name: string;
  category: string;
  id: string;
}

export default function ProductCard(props: CardProps) {
  const navigate = useNavigate();

  return (
    <Center py={6} onClick={() => navigate(`/products/${props.id}`)}>
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
            {props.category}
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {props.name}
          </Heading>
          <Text color={'gray.500'}>{props.description}</Text>
          <Text color={'gray.500'} fontWeight="bold">
            Reviews: {props.reviewCount}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar
            src={
              'https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600w-1037719192.jpg'
            }
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{props.author}</Text>
            <Text color={'gray.500'}>TODO: adicionar data da postagem</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
