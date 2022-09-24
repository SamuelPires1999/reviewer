import { graphql } from 'relay-runtime';

export const DeleteReviewMutation = graphql`
  mutation DeleteReviewMutation($input: DeleteReviewMutationInput!) {
    DeleteReviewMutation(input: $input) {
      error
      success
    }
  }
`;
