import { graphql } from 'relay-runtime';

export const ProductsMakeReviewMutation = graphql`
  mutation ProductsMakeReviewMutation($input: CreateReviewMutationInput!) {
    CreateReviewMutation(input: $input) {
      error
      reviewEdge {
        node {
          _id
          comment
          rating
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
