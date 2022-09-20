import { Container } from '@mui/system';
import { useMutation } from 'react-relay';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { AuthLoginMutation } from './AuthLoginMutation';
import { useEffect, useState } from 'react';
import {
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { InputField } from '../../components/InputField';
import Reviews from '@mui/icons-material/Reviews';
import type { AuthRegisterMutation as AuthRegisterMutationType } from './__generated__/AuthRegisterMutation.graphql';
import { AuthRegisterMutation } from './AuthRegisterMutation';
import { useAuth } from './utils/useAuth';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const [handleUserRegister] =
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
        <Container component="main" maxWidth="xs">
          <Form style={{ width: '100%' }}>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <Reviews />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create your account
              </Typography>
              <Box
                sx={{
                  mt: 5,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <InputField
                  required
                  fullWidth
                  name="name"
                  id="name"
                  shouldValidate
                  autoFocus
                  placeholder="Your display name"
                />
                <InputField
                  required
                  id="email"
                  name="email"
                  autoComplete="email"
                  shouldValidate
                  placeholder="email@valid.com"
                />
                <InputField
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  shouldValidate
                  placeholder="password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!isValid}
                >
                  {isSubmitting ? 'Loading...' : 'Create Account'}
                </Button>
              </Box>
            </Box>
          </Form>
        </Container>
      </FormikProvider>
      <Snackbar
        open={error.status}
        message={error.message}
        autoHideDuration={4000}
      >
        <Alert severity="error">{error.message}</Alert>
      </Snackbar>
    </div>
  );
};
