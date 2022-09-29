import { useMutation } from 'react-relay';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
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
import { AuthRecoverPassword } from './AuthRecoverPassword';
import { AuthRecoverPasswordMutation } from './__generated__/AuthRecoverPasswordMutation.graphql';

export const RecoverPasswordPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [handleRecoverPassword] =
    useMutation<AuthRecoverPasswordMutation>(AuthRecoverPassword);
  const setUser = useStore(state => state.setUser);

  type Inputs = {
    email: string;
    newPassword: string;
  };

  const schema = Yup.object({
    email: Yup.string()
      .email('The supplied email is invalid')
      .required('Email is required'),
    newPassword: Yup.string()
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
    handleRecoverPassword({
      variables: data,
      onCompleted: data => {
        if (data.RecoverPasswordMutation?.error) {
          toast({
            title: 'Error',
            description: data.RecoverPasswordMutation.error,
            status: 'error',
            duration: 2500,
          });
          return;
        }

        toast({
          title: 'Success',
          description: data.RecoverPasswordMutation?.success,
          status: 'success',
          duration: 2500,
        });

        navigate('/login');
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
              to enjoy all of our cool features ✌️
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
              <FormControl id="password" isInvalid={!!errors.newPassword}>
                <FormLabel>New Password</FormLabel>
                <Input
                  type={'password'}
                  {...register('newPassword', { required: true })}
                />
                {errors.newPassword && (
                  <FormErrorMessage>
                    {errors.newPassword.message}
                  </FormErrorMessage>
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
                  {isSubmitting ? <Spinner /> : 'Recover'}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
};
