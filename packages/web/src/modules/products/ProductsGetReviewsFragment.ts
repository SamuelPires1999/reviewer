import { graphql } from 'relay-runtime';

export const ProductsGetReviewsFragment = graphql`
  fragment ProductsGetReviewsFragment on Product {
    reviews {
      count
      edges {
        node {
          comment
          rating
          user {
            name
            _id
          }
        }
      }
    }
  }
`;
