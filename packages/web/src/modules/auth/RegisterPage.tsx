import { useMutation } from 'react-relay';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { InputField } from '../../components/InputField';
import type { AuthRegisterMutation as AuthRegisterMutationType } from './__generated__/AuthRegisterMutation.graphql';
import { AuthRegisterMutation } from './AuthRegisterMutation';
import { useAuth } from './utils/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import {
  VStack,
  Button,
  Spinner,
  Text,
  Stack,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { useStore } from '../../store/useStore';

export const RegisterPage = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const setUser = useStore(state => state.setUser);

  const [handleUserRegister, isPending] =
    useMutation<AuthRegisterMutationType>(AuthRegisterMutation);

  const formikValue = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().required('User name is required'),
      email: Yup.string().email().required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values, actions) => {
      handleUserRegister({
        variables: values,
        onCompleted: ({ RegisterWithEmailMutation }) => {
          if (RegisterWithEmailMutation?.error) {
            actions.setSubmitting(false);
            setError({
              message: RegisterWithEmailMutation.error,
              status: true,
            });
            return;
          }

          if (RegisterWithEmailMutation?.me) {
            setUser({
              _id: RegisterWithEmailMutation.me._id,
              name: RegisterWithEmailMutation.me.name,
              email: RegisterWithEmailMutation.me.email,
            });
          }

          if (RegisterWithEmailMutation?.token) {
            localStorage.setItem(
              'CHALLENGE-TOKEN',
              RegisterWithEmailMutation?.token,
            );
          }

          signin(RegisterWithEmailMutation?.token, () => {
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
                <Heading fontSize={'4xl'}>Create your account!</Heading>
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
                  <FormControl id="name">
                    <FormLabel>Name</FormLabel>
                    <InputField
                      name="name"
                      type="name"
                      placeholder="name"
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
                      {isSubmitting ? <Spinner /> : 'Create Account'}
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </Form>
      </FormikProvider>
    </div>
  );
};
