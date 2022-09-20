import { graphql } from 'relay-runtime';

export const ProductsGetAllQuery = graphql`
  query ProductsGetAllQuery {
    products {
      count
      edges {
        node {
          description
          name
          _id
          reviews {
            count
            edges {
              node {
                comment
                rating
                user {
                  email
                  name
                }
              }
            }
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
