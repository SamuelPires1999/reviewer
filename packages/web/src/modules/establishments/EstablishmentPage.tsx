import { ExternalLinkIcon, StarIcon } from '@chakra-ui/icons';
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
import { useEffect } from 'react';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';
import { ExternalLinkWarning } from '../../components/ExternalLinkWarning';
import { useStore } from '../../store/useStore';
import { AuthMeQuery } from '../auth/AuthMeQuery';
import { AuthMeQuery as AuthQueryType } from '../auth/__generated__/AuthMeQuery.graphql';
import { DeleteEstablishment } from './DeleteEstablishment';
import { DeleteReviewMutation } from './DeleteReview';
import { GetSingleEstablishment } from './GetSingleEstablishment';
import type { DeleteEstablishmentMutation } from './__generated__/DeleteEstablishmentMutation.graphql';
import { ReviewModal } from './ReviewModal';
import { DeleteReviewMutation as DeleteReviewMutationType } from './__generated__/DeleteReviewMutation.graphql';
import type { GetSingleEstablishmentQuery as QueryType } from './__generated__/GetSingleEstablishmentQuery.graphql';

export const EstablishmentPage = () => {
  const params = useParams();
  const store = useStore();
  const {
    isOpen: isReviewModalOpen,
    onClose: reviewModalClose,
    onOpen: reviewModalOpen,
  } = useDisclosure();
  const {
    isOpen: isExternalLinkModalOpen,
    onClose: externalLinkModalClose,
    onOpen: externalLinkModalOpen,
  } = useDisclosure();
  const navigate = useNavigate();

  const data = useLazyLoadQuery<QueryType>(
    GetSingleEstablishment,
    {
      id: params.id || '000',
    },
    { fetchPolicy: 'store-or-network' },
  );

  const [handleDeleteEstablishment] =
    useMutation<DeleteEstablishmentMutation>(DeleteEstablishment);
  const [handleDeleteReview] =
    useMutation<DeleteReviewMutationType>(DeleteReviewMutation);

  const authData = useLazyLoadQuery<AuthQueryType>(AuthMeQuery, {});

  useEffect(() => {
    if (!store.user && localStorage.getItem('CHALLENGE-TOKEN')) {
      store.setUser({
        _id: authData.me?._id || '000',
        email: authData.me?.email || '',
        name: authData.me?.name || '',
      });
    }
  }, []);

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={1}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex justify={'center'}>
          <Image
            rounded={'md'}
            alt={'placeholder image'}
            src={
              'https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600w-1037719192.jpg'
            }
            fit={'cover'}
            align={'center'}
            w={'3xl'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Flex as={'header'} alignItems="center" gap={'10px'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              {data.singleEstablishmentBy?.name}
            </Heading>
            {data.singleEstablishmentBy?.referenceLink ? (
              <Button
                rightIcon={<ExternalLinkIcon />}
                onClick={() => externalLinkModalOpen()}
                variant={'outline'}
              >
                Visit reference link
              </Button>
            ) : null}
          </Flex>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }
          >
            {store.user?._id === data.singleEstablishmentBy?.user?._id ? (
              <Box>
                <Button
                  onClick={() => {
                    handleDeleteEstablishment({
                      variables: { establishment: params.id || '000' },
                      onCompleted: data => {
                        if (data.DeleteEstablishmentMutation?.error) {
                          alert(data.DeleteEstablishmentMutation?.error);
                          return;
                        }

                        navigate('/');
                      },
                    });
                  }}
                  size={'md'}
                  colorScheme="red"
                >
                  Delete This Establishment
                </Button>
              </Box>
            ) : null}
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
              {data.singleEstablishmentBy?.description}
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
                {data.singleEstablishmentBy?.reviews.edges.map(
                  (review, index) => (
                    <Stack
                      key={index}
                      p={6}
                      divider={
                        <StackDivider
                          borderColor={useColorModeValue(
                            'gray.200',
                            'gray.600',
                          )}
                        />
                      }
                    >
                      <Text fontWeight={'bold'}>
                        {review?.node?.user?.name}
                      </Text>
                      <Flex gap={1}>
                        {[...Array(review?.node?.rating).keys()].map(
                          (_, index) => (
                            <StarIcon key={index} color={'yellow.400'} />
                          ),
                        )}
                      </Flex>
                      <Text>{review?.node?.comment}</Text>
                      {store.user?._id === review?.node?.user?._id ? (
                        <Button
                          onClick={() => {
                            handleDeleteReview({
                              variables: {
                                input: { review: review?.node?._id || '000' },
                              },
                              onCompleted: data => {
                                if (data.DeleteReviewMutation?.error) {
                                  alert(data.DeleteReviewMutation?.error);
                                  return;
                                }

                                navigate('/');
                              },
                            });
                          }}
                          colorScheme={'red'}
                        >
                          Delete this review
                        </Button>
                      ) : null}
                    </Stack>
                  ),
                )}
              </Flex>
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
              store.user ? reviewModalOpen() : navigate('/login');
            }}
          >
            {store.user ? 'Add your review' : 'Login to add a review'}
          </Button>
        </Stack>
      </SimpleGrid>
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={reviewModalClose}
        establishmentId={params.id}
      />
      <ExternalLinkWarning
        isOpen={isExternalLinkModalOpen}
        onClose={externalLinkModalClose}
        referenceLink={
          data.singleEstablishmentBy?.referenceLink || 'www.google.com'
        }
      />
    </Container>
  );
};
