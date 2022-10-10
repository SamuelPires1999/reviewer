import { graphql } from 'relay-runtime';

export const GetEstablishments = graphql`
  query GetEstablishmentsQuery {
    establishments(first: null, last: null)
      @connection(key: "GetEstablishmentsQuery__establishments") {
      __id
      count
      edges {
        node {
          ...EstablishmentCard_establishnment
        }
      }
    }
  }
`;
