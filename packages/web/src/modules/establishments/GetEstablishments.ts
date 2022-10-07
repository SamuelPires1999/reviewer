import { graphql } from 'relay-runtime';

export const GetEstablishments = graphql`
  query GetEstablishmentsQuery {
    establishments {
      count
      edges {
        node {
          ...EstablishmentCard_establishnment
        }
      }
    }
  }
`;
