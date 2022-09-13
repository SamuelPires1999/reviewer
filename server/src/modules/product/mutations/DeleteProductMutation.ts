import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { errorField, getObjectId, successField } from '@entria/graphql-mongo-helpers';
import ProductModel from '../ProductModel';
import * as ProductLoader from '../ProductLoader';
import { ProductConnection } from '../ProductType';
import { GraphQLContext } from '../../../graphql/types';
import ReviewModel from '../../review/ReviewModel';

type Args = {
  product: string;
};
const mutation = mutationWithClientMutationId({
  name: 'ProductDelete',
  inputFields: {
    product: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: Args, context: GraphQLContext) => {
    const { product } = args;

    if (!context.user) {
      return {
        error: 'user not logged in',
      };
    }

    const productToBeDeleted = await ProductModel.findById({
      _id: getObjectId(product),
    });

    if (!productToBeDeleted) {
      return {
        error: 'product not found',
      };
    }

    if (productToBeDeleted.user._id.toString() != context.user.id) {
      return {
        error: "You cannot delete other user's product",
      };
    }

    const deletedProduct = await ProductModel.findByIdAndDelete({
      _id: getObjectId(product),
    });

    if (!deletedProduct) {
      return {
        error: 'Could not delete this product',
      };
    }

    await ReviewModel.deleteMany({ product: deletedProduct?._id.toString() }).catch(error => {
      console.log('error', error);
      return {
        error: 'Could not dele product reviews',
      };
    });

    return {
      id: deletedProduct?._id,
      error: null,
    };
  },
  outputFields: {
    ...errorField,
    ...successField,
  },
});

export default mutation;
