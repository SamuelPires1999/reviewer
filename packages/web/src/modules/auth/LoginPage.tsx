import { useMutation } from 'react-relay';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { AuthLoginMutation } from './AuthLoginMutation';
import { useState } from 'react';
import { InputField } from '../../components/InputField';
import type { AuthLoginMutation as AuthLoginMutationType } from './__generated__/AuthLoginMutation.graphql';
import { useAuth } from './utils/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import {
  VStack,
  Button,
  Spinner,
  Text,
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useStore } from '../../store/useStore';

export const LoginPage = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const [handleUserLogin] =
    useMutation<AuthLoginMutationType>(AuthLoginMutation);

  const setUser = useStore(state => state.setUser);

  const formikValue = useFormik({
    initialValues: { email: '', password: '' },
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values, actions) => {
      handleUserLogin({
        variables: values,
        onCompleted: ({ LoginWithEmailMutation }) => {
          if (LoginWithEmailMutation?.error) {
            actions.setSubmitting(false);
            setError({ message: LoginWithEmailMutation.error, status: true });
            return;
          }

          if (LoginWithEmailMutation?.me) {
            setUser({
              _id: LoginWithEmailMutation.me._id,
              name: LoginWithEmailMutation.me.name,
              email: LoginWithEmailMutation.me.email,
            });
          }

          signin(LoginWithEmailMutation?.token, () => {
            navigate('/', { replace: true });
          });
        },
      });
    },
  });

  const { isValid, isSubmitting } = formikValue;

  return (
    <div>
      <FormikProvider value={formikValue}>
        <Form>
          <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
          >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                  to enjoy all of our cool{' '}
                  <Link to={'/'} color={'blue.400'}>
                    features
                  </Link>{' '}
                  ✌️
                </Text>
              </Stack>
              <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}
              >
                <Stack spacing={4}>
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <InputField
                      name="email"
                      type="email"
                      placeholder="email"
                      shouldValidate
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <InputField
                      name="password"
                      type="password"
                      placeholder="Password"
                      shouldValidate
                    />
                  </FormControl>
                  <Stack spacing={10}>
                    <Button
                      type="submit"
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      {isSubmitting ? <Spinner /> : 'Login'}
                    </Button>
                  </Stack>
                  <Button
                    variant={'link'}
                    fontWeight="hairline"
                    fontSize={'sm'}
                    onClick={() => navigate('/register')}
                  >
                    Doesnt have an account? Create one!
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </Form>
      </FormikProvider>
    </div>
  );
};
