import { graphql } from 'relay-runtime';

export const CreateEstablishment = graphql`
  mutation CreateEstablishmentMutation(
    $input: EstablishmentCreateInput!
    $connections: [ID!]!
  ) {
    CreateEstablishmentMutation(input: $input) {
      error
      EstablishmentEdge @appendEdge(connections: $connections) {
        node {
          ...EstablishmentCard_establishnment
        }
      }
    }
  }
`;
