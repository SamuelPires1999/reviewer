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
  Input,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useStore } from '../../store/useStore';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const RegisterPage = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const setUser = useStore(state => state.setUser);
  const [handleUserRegister, isPending] =
    useMutation<AuthRegisterMutationType>(AuthRegisterMutation);

  const toast = useToast();

  type Inputs = {
    name: string;
    email: string;
    password: string;
  };

  const schema = Yup.object({
    email: Yup.string()
      .email('The supplied email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'The password must be at least 6 characters long')
      .required('Password is required'),
    name: Yup.string().required('A username is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = data => {
    handleUserRegister({
      variables: data,
      onCompleted: ({ RegisterWithEmailMutation }) => {
        if (RegisterWithEmailMutation?.error) {
          toast({
            title: 'Error',
            description: 'Invalid Credentials',
            status: 'error',
            duration: 2000,
          });
        }

        if (RegisterWithEmailMutation?.token && RegisterWithEmailMutation?.me) {
          toast({
            title: 'Success',
            description: 'Account created',
            status: 'success',
            duration: 1000,
          });

          setUser({
            _id: RegisterWithEmailMutation.me._id,
            name: RegisterWithEmailMutation.me.name,
            email: RegisterWithEmailMutation.me.email,
          });

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
  };

  return (
    <div>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        as={'form'}
        onSubmit={handleSubmit(onSubmit)}
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
              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input {...register('email', { required: true })} />

                {errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl id="name" isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input {...register('name', { required: true })} />
                {errors.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl id="password" isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type={'password'}
                  {...register('password', { required: true })}
                />
                {errors.password && (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
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
    </div>
  );
};
