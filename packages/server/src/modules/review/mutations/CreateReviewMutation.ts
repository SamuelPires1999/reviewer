import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { errorField, successField, getObjectId, objectIdResolver } from '@entria/graphql-mongo-helpers';

import { GraphQLContext } from '../../../graphql/types';
import ProductModel from '../../product/ProductModel';
import ReviewModel from '../ReviewModel';
import { ReviewConnection } from '../ReviewType';
import * as ReviewLoader from '../ReviewLoader';
import ProductType from '../../product/ProductType';

import * as ProductLoader from '../../product/ProductLoader';

type Args = {
  rating: number;
  comment?: string;
  product: string;
};
const mutation = mutationWithClientMutationId({
  name: 'CreateReviewMutation',
  inputFields: {
    rating: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    comment: {
      type: GraphQLString,
    },
    product: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: Args, context: GraphQLContext) => {
    if (!context.user) {
      return {
        error: 'user not logged',
      };
    }

    const product = await ProductModel.findOne({
      _id: getObjectId(args.product),
    }).populate('user');

    if (!product) {
      return {
        error: 'post not found',
      };
    }

    if (product.user._id.toString() === context.user.id) {
      return {
        error: 'You cannot post a review for your own product',
      };
    }

    const review = await new ReviewModel({
      user: context.user._id,
      product,
      comment: args.comment,
      rating: args.rating,
    }).save();

    return {
      id: review._id,
      product: product._id,
      error: null,
    };
  },
  outputFields: {
    reviewEdge: {
      type: ReviewConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        // Load new edge from loader
        const review = await ReviewLoader.load(context, id);

        // Returns null if no node was loaded
        if (!review) {
          return null;
        }

        return {
          cursor: toGlobalId('Review', review._id),
          node: review,
        };
      },
    },
    product: {
      type: ProductType,
      resolve: async ({ product }, _, context) => {
        return await ProductLoader.load(context, product);
      },
    },
    ...errorField,
    ...successField,
  },
});

export default mutation;
