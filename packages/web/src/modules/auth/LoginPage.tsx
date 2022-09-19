import { Container } from '@mui/system';
import { useMutation } from 'react-relay';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { AuthLoginMutation } from './AuthLoginMutation';
import { useState } from 'react';
import {
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Button,
  Grid,
  Link,
  Snackbar,
  Alert,
} from '@mui/material';
import { InputField } from '../../components/InputField';
import Reviews from '@mui/icons-material/Reviews';
import type { AuthLoginMutation as AuthLoginMutationType } from './__generated__/AuthLoginMutation.graphql';

export const LoginPage = () => {
  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const [handleUserLogin] =
    useMutation<AuthLoginMutationType>(AuthLoginMutation);

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

          if (LoginWithEmailMutation?.token) {
            localStorage.setItem(
              'CHALLENGE-TOKEN',
              LoginWithEmailMutation?.token,
            );
          }

          return;
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
                Sign in to reviewer
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
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
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
                  {isSubmitting ? 'Loading...' : 'Sign In'}
                </Button>
                <Grid container>
                  <Grid item xs={12} justifyContent="center" display={'flex'}>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Form>
        </Container>
      </FormikProvider>
      <Snackbar
        open={error.status}
        message={error.message}
        autoHideDuration={5000}
      >
        <Alert severity="error">{error.message}</Alert>
      </Snackbar>
    </div>
  );
};
