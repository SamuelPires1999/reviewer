import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import { errorField, successField } from '@entria/graphql-mongo-helpers';
import EstablishmentModel from '../EstablishmentModel';
import * as EstablishmentLoader from '../EstablishmentLoader';
import { EstablishmentConnection } from '../EstablishmentType';
import { GraphQLContext } from '../../../graphql/types';

type Args = {
  referenceLink?: string;
  description?: string;
  name: string;
  category: string;
  address: string;
};
const mutation = mutationWithClientMutationId({
  name: 'EstablishmentCreate',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    referenceLink: {
      type: GraphQLString,
    },
    address: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    category: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async (args: Args, context: GraphQLContext) => {
    const { referenceLink, description, name, category, address } = args;

    if (!context.user) {
      return {
        error: 'user not logged in',
      };
    }

    const establishment = await new EstablishmentModel({
      description,
      referenceLink,
      name,
      address,
      category,
      user: context.user._id,
    }).save();

    return {
      id: establishment._id,
      error: null,
    };
  },
  outputFields: {
    EstablishmentEdge: {
      type: EstablishmentConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        // Load new edge from loader
        const establishment = await EstablishmentLoader.load(context, id);

        // Returns null if no node was loaded
        if (!establishment) {
          return null;
        }

        return {
          cursor: toGlobalId('Establishment', establishment._id),
          node: establishment,
        };
      },
    },
    ...errorField,
    ...successField,
  },
});

export default mutation;
