import { graphql } from 'relay-runtime';

export const DeleteEstablishment = graphql`
  mutation DeleteEstablishmentMutation($establishment: String!) {
    DeleteEstablishmentMutation(input: { establishment: $establishment }) {
      error
      message
    }
  }
`;
