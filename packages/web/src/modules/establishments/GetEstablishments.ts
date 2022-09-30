import { graphql } from 'relay-runtime';

export const GetEstablishments = graphql`
  query GetEstablishmentsQuery {
    establishments {
      count
      edges {
        node {
          _id
          description
          name
          address
          createdAt
          category
          reviews {
            count
          }
          user {
            _id
            name
            email
          }
        }
      }
    }
  }
`;
