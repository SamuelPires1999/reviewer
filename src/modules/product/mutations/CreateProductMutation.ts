import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { errorField, successField } from '@entria/graphql-mongo-helpers';
import ProductModel from '../ProductModel';
import * as ProductLoader from '../ProductLoader';
import { ProductConnection } from '../ProdutType';
import { GraphQLContext } from '../../../graphql/types';

type Args = {
  referenceLink?: string;
  description?: string;
  name: string;
};
const mutation = mutationWithClientMutationId({
  name: 'ProductCreate',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    referenceLink: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async (args: Args, context: GraphQLContext) => {
    const { referenceLink, description, name } = args;

    if (!context.user) {
      return {
        error: 'user not logged in',
      };
    }

    const post = await new ProductModel({
      description,
      referenceLink,
      name,
      user: context.user._id,
    }).save();

    return {
      id: post._id,
      error: null,
    };
  },
  outputFields: {
    productEdge: {
      type: ProductConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        // Load new edge from loader
        const product = await ProductLoader.load(context, id);

        // Returns null if no node was loaded
        if (!product) {
          return null;
        }

        return {
          cursor: toGlobalId('Product', product._id),
          node: product,
        };
      },
    },
    ...errorField,
    ...successField,
  },
});

export default mutation;
