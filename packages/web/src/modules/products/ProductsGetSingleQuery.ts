import { graphql } from 'relay-runtime';

export const ProductsGetSingleQuery = graphql`
  query ProductsGetSingleQuery($id: String!) {
    singleProductById(id: $id) {
      name
      referenceLink
      category
      description
      user {
        _id
        name
        email
      }
      ...ProductsGetReviewsFragment
    }
  }
`;
