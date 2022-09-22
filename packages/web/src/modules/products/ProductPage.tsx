import { StarIcon } from '@chakra-ui/icons';
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  useDisclosure,
} from '@chakra-ui/react';
import { useLazyLoadQuery } from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ProductsGetSingleQuery } from './ProductsGetSingleQuery';
import { ReviewModal } from './ReviewModal';
import type { ProductsGetSingleQuery as QueryType } from './__generated__/ProductsGetSingleQuery.graphql';

export const ProductPage = () => {
  const params = useParams();
  const store = useStore();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();

  const data = useLazyLoadQuery<QueryType>(
    ProductsGetSingleQuery,
    {
      id: params.id || '000',
    },
    { fetchPolicy: 'store-or-network' },
  );

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={1}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={'md'}
            alt={'product image'}
            src={
              'https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600w-1037719192.jpg'
            }
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              {data.singleProductById?.name}
            </Heading>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }
          >
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Description
              </Text>
              {data.singleProductById?.description}
            </Box>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Reviews:
              </Text>

              <Flex direction={'column'}>
                {data.singleProductById?.reviews.edges.map((review, index) => (
                  <Stack
                    key={index}
                    p={6}
                    divider={
                      <StackDivider
                        borderColor={useColorModeValue('gray.200', 'gray.600')}
                      />
                    }
                  >
                    <Text fontWeight={'bold'}>{review?.node?.user?.name}</Text>
                    <Flex gap={1}>
                      {[...Array(review?.node?.rating).keys()].map(
                        (item, index) => (
                          <StarIcon color={'yellow.400'} />
                        ),
                      )}
                    </Flex>
                    <Text>{review?.node?.comment}</Text>
                  </Stack>
                ))}
              </Flex>
              {/* <ReviewList product={data.singleProductById} /> */}
            </Box>
          </Stack>

          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
            onClick={() => {
              store.user ? onOpen() : navigate('/login');
            }}
          >
            {store.user ? 'Add your review' : 'Login to add a review'}
          </Button>
        </Stack>
      </SimpleGrid>
      <ReviewModal isOpen={isOpen} onClose={onClose} productId={params.id} />
    </Container>
  );
};
