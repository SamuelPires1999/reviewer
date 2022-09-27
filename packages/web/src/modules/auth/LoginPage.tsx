import { useMutation } from 'react-relay';
import * as Yup from 'yup';
import { AuthLoginMutation } from './AuthLoginMutation';
import type { AuthLoginMutation as AuthLoginMutationType } from './__generated__/AuthLoginMutation.graphql';
import { useAuth } from './utils/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Spinner,
  Text,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useStore } from '../../store/useStore';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const LoginPage = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [handleUserLogin] =
    useMutation<AuthLoginMutationType>(AuthLoginMutation);
  const setUser = useStore(state => state.setUser);

  type Inputs = {
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
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = data => {
    handleUserLogin({
      variables: data,
      onCompleted: ({ LoginWithEmailMutation }) => {
        if (LoginWithEmailMutation?.error) {
          toast({
            title: 'Error',
            description: 'Invalid Credentials',
            status: 'error',
            duration: 2000,
          });
        }

        if (LoginWithEmailMutation?.me && LoginWithEmailMutation?.token) {
          toast({
            title: 'Success',
            description: 'You are logged in',
            status: 'success',
            duration: 100,
          });

          setUser({
            _id: LoginWithEmailMutation.me._id,
            name: LoginWithEmailMutation.me.name,
            email: LoginWithEmailMutation.me.email,
          });

          localStorage.setItem(
            'CHALLENGE-TOKEN',
            LoginWithEmailMutation?.token,
          );
        }

        signin(LoginWithEmailMutation?.token, () => {
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
              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input {...register('email', { required: true })} />
                {errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl id="password" isInvalid={!!errors.email}>
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
    </div>
  );
};
