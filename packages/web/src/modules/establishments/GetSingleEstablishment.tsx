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
      reviews(first: null, last: null)
        @connection(key: "GetSingleEstablishmentQuery__reviews") {
        __id
        edges {
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
  }
`;
