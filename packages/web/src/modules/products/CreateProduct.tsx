import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Button,
  RadioGroup,
  Radio,
  Divider,
  Text,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { InputField } from '../../components/InputField';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { ProductCreateMutation } from './ProductCreateMutation';
import type { ProductCreateMutation as MutationType } from './__generated__/ProductCreateMutation.graphql';
import { useNavigate } from 'react-router-dom';
import { AuthMeQuery } from '../auth/AuthMeQuery';
import { useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { AuthMeQuery as AuthQueryType } from '../auth/__generated__/AuthMeQuery.graphql';

export const CreateProduct = () => {
  const navigate = useNavigate();
  const store = useStore();

  const [handleCreateProduct] = useMutation<MutationType>(
    ProductCreateMutation,
  );

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

  const formikValue = useFormik({
    initialValues: {
      description: '',
      name: '',
      referenceLink: '',
      category: '',
    },
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      description: Yup.string(),
      name: Yup.string().required(),
      referenceLink: Yup.string(),
      category: Yup.string(),
    }),
    onSubmit: values => {
      handleCreateProduct({
        variables: {
          input: values,
        },
        onCompleted: data => {
          navigate('/');
        },
      });
    },
  });

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
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Create a product
        </Heading>

        <FormikProvider value={formikValue}>
          <Form>
            <FormControl id="userName" isRequired>
              <FormLabel>Product name</FormLabel>
              <InputField
                placeholder="Product name"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                name="name"
                shouldValidate
                mb={5}
              />
            </FormControl>
            <FormControl id="link">
              <FormLabel>Reference Link</FormLabel>
              <InputField
                placeholder="www.e-commerce-link.com/your-product"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                name="referenceLink"
                shouldValidate
                mb={5}
              />
            </FormControl>{' '}
            <FormControl id="category">
              <FormLabel>Category</FormLabel>
              <Flex mb={5} gap={3}>
                <Stack direction={'row'}>
                  <Field type="radio" name="category" value="pc-parts" />
                  <Text ml={3}>PC-PARTS</Text>
                </Stack>
                <Stack direction={'row'}>
                  <Field type="radio" name="category" value="food" />
                  <Text ml={3}>FOOD</Text>
                </Stack>{' '}
                <Stack direction={'row'}>
                  <Field type="radio" name="category" value="clothing" />
                  <Text ml={3}>CLOTHING</Text>
                </Stack>{' '}
                <Stack direction={'row'}>
                  <Field type="radio" name="category" value="gadgets" />
                  <Text ml={3}>GADGETS</Text>
                </Stack>{' '}
                <Stack direction={'row'}>
                  <Field type="radio" name="category" value="random" />
                  <Text ml={3}>RANDOM</Text>
                </Stack>
              </Flex>
            </FormControl>
            <FormControl id="description">
              <FormLabel>description</FormLabel>
              <InputField
                placeholder="I'm think of buying this product"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                name="description"
                shouldValidate
                mb={5}
              />
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
          </Form>
        </FormikProvider>
      </Stack>
    </Flex>
  );
};
