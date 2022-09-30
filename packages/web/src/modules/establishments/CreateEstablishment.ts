import { graphql } from 'relay-runtime';

export const CreateEstablishment = graphql`
  mutation CreateEstablishmentMutation($input: EstablishmentCreateInput!) {
    CreateEstablishmentMutation(input: $input) {
      error
      EstablishmentEdge {
        node {
          _id
          description
          address
          name
          category
          user {
            _id
            name
          }
        }
      }
    }
  }
`;
