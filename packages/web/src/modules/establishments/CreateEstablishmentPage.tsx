import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Button,
  Text,
  Input,
  FormErrorMessage,
  Radio,
  Select,
  useToast,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';
import { AuthMeQuery } from '../auth/AuthMeQuery';
import { useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { AuthMeQuery as AuthQueryType } from '../auth/__generated__/AuthMeQuery.graphql';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateEstablishment } from './CreateEstablishment';
import type { CreateEstablishmentMutation } from './__generated__/CreateEstablishmentMutation.graphql';

export const CreateEstablishmentPage = () => {
  const navigate = useNavigate();
  const store = useStore();
  const toast = useToast();
  const [handleCreateEstablishment] =
    useMutation<CreateEstablishmentMutation>(CreateEstablishment);

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

  type Inputs = {
    name: string;
    description: string;
    address: string;
    referenceLink: string;
    category: string;
  };

  const schema = Yup.object({
    name: Yup.string().required('A username is required'),
    address: Yup.string().required('An Address is required'),
    description: Yup.string().required('A description is required'),
    referenceLink: Yup.string(),
    category: Yup.string().required('Category is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = data => {
    handleCreateEstablishment({
      variables: {
        input: data,
      },
      onCompleted: data => {
        if (data.CreateEstablishmentMutation?.error) {
          toast({
            title: 'Error',
            description: 'Something went wrong',
            status: 'error',
            duration: 1500,
          });

          return;
        }

        toast({
          title: 'Success',
          description: 'Establishment Created',
          status: 'success',
          duration: 1500,
        });
        navigate('/');
      },
    });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'5xl'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
        as={'form'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Create a establishment
        </Heading>
        <FormControl id="userName" isRequired isInvalid={!!errors.name}>
          <FormLabel>Establishment name</FormLabel>
          <Input {...register('name', { required: true })} />

          {errors.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl id="link" isInvalid={!!errors.referenceLink}>
          <FormLabel>Reference Link</FormLabel>
          <Input {...register('referenceLink', { required: true })} />

          {errors.referenceLink && (
            <FormErrorMessage>{errors.referenceLink.message}</FormErrorMessage>
          )}
        </FormControl>{' '}
        <FormControl isRequired id="category" isInvalid={!!errors.category}>
          <FormLabel>Category</FormLabel>
          <Select {...register('category')} placeholder="Select category">
            <option value="events">events</option>
            <option value="restaurants/cooking">restaurants / cooking</option>
            <option value="hospitality">hospitality</option>
            <option value="shopping">shopping</option>
            <option value="varieties">varieties</option>
            <option value="not-specified">not-specified</option>
          </Select>
          {errors.category && (
            <FormErrorMessage>{errors.category.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          id="description"
          isRequired
          isInvalid={!!errors.description}
        >
          <FormLabel>Description</FormLabel>
          <Input {...register('description', { required: true })} />

          {errors.description && (
            <FormErrorMessage>{errors.description.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl id="address" isRequired isInvalid={!!errors.address}>
          <FormLabel>Address</FormLabel>
          <Input {...register('address', { required: true })} />

          {errors.address && (
            <FormErrorMessage>{errors.address.message}</FormErrorMessage>
          )}
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            type="submit"
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
