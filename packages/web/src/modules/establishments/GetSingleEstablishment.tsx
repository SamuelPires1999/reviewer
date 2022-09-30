import { graphql } from 'relay-runtime';

export const GetSingleEstablishment = graphql`
  query GetSingleEstablishmentQuery($id: String!) {
    singleEstablishmentBy(id: $id) {
      _id
      description
      referenceLink
      address
      name
      category
      user {
        _id
        name
      }
      reviews {
        edges {
          node {
            _id
            user {
              _id
              name
            }
            createdAt
            comment
            rating
          }
        }
      }
    }
  }
`;
