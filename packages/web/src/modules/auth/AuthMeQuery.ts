import { graphql } from 'relay-runtime';

export const AuthMeQuery = graphql`
  query AuthMeQuery {
    me {
      _id
      name
      email
      establishments {
        count
        edges {
          node {
            _id
            description
            referenceLink
            address
            name
            category
            reviews {
              count
            }
          }
        }
      }
      reviews {
        count
        edges {
          node {
            _id
            comment
            rating
            establishment {
              name
              _id
            }
          }
        }
      }
    }
  }
`;
