import { graphql } from 'relay-runtime';

export const CreateReview = graphql`
  mutation CreateReviewMutation(
    $rating: String!
    $comment: String!
    $establishment: String!
  ) {
    CreateReviewMutation(
      input: {
        rating: $rating
        comment: $comment
        establishment: $establishment
      }
    ) {
      error
      reviewEdge {
        node {
          _id
          comment
          rating
          user {
            _id
            name
          }
          establishment {
            _id
            description
            name
            address
            category
          }
        }
      }
    }
  }
`;
