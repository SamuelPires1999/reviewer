import { graphql } from 'relay-runtime';

export const ProductsGetReviewsFragment = graphql`
  fragment ProductsGetReviewsFragment on Product {
    reviews {
      edges {
        node {
          comment
          _id
          rating
          user {
            name
            id
          }
        }
      }
    }
  }
`;
