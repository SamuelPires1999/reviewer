import { graphql } from 'react-relay';

export const AuthLoginMutation = graphql`
  mutation AuthLoginMutation($email: String!, $password: String!) {
    LoginWithEmailMutation(input: { email: $email, password: $password }) {
      token
      error
      me {
        name
        email
        _id
      }
    }
  }
`;
