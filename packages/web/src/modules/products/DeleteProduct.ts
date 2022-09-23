import { graphql } from 'relay-runtime';

export const DeleteProductMutation = graphql`
  mutation DeleteProductMutation($input: ProductDeleteInput!) {
    DeleteProductMutation(input: $input) {
      message
      error
      success
    }
  }
`;
