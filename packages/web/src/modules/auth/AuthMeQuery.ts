import { graphql } from 'relay-runtime';

export const AuthMeQuery = graphql`
  query AuthMeQuery {
    me {
      name
      email
      _id
    }
  }
`;
