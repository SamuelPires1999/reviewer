import { graphql } from 'relay-runtime';

export const ProductCreateMutation = graphql`
  mutation ProductCreateMutation($input: ProductCreateInput!) {
    CreateProductMutation(input: $input) {
      error
      success
      productEdge {
        node {
          _id
          description
          name
          category
          referenceLink
          user {
            _id
            name
          }
        }
      }
    }
  }
`;
