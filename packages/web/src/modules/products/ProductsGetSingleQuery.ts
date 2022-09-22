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
  }
`;
