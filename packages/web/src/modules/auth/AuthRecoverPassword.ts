import { graphql } from 'relay-runtime';

export const AuthRecoverPassword = graphql`
  mutation AuthRecoverPasswordMutation($email: String!, $newPassword: String!) {
    RecoverPasswordMutation(
      input: { email: $email, newPassword: $newPassword }
    ) {
      error
      success
    }
  }
`;
