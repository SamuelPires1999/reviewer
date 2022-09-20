import { graphql } from 'react-relay';

export const AuthRegisterMutation = graphql`
  mutation AuthRegisterMutation(
    $email: String!
    $password: String!
    $name: String!
  ) {
    RegisterWithEmailMutation(
      input: { email: $email, password: $password, name: $name }
    ) {
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
