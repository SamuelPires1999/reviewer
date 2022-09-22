import { graphql } from 'relay-runtime';

export const ProductsGetAllQuery = graphql`
  query ProductsGetAllQuery {
    products {
      count
      edges {
        node {
          description
          name
          category
          _id
          reviews {
            count
          }
          user {
            name
            email
          }
        }
      }
    }
  }
`;
