import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  graphql,
} from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import {
  errorField,
  successField,
  getObjectId,
  objectIdResolver,
} from '@entria/graphql-mongo-helpers';

import { GraphQLContext } from '../../../graphql/types';
import EstablishmentModel from '../../establishment/EstablishmentModel';
import ReviewModel from '../ReviewModel';
import { ReviewConnection } from '../ReviewType';
import * as ReviewLoader from '../ReviewLoader';

import * as EstablishmentLoader from '../../establishment/EstablishmentLoader';
import EstablishmentType from '../../establishment/EstablishmentType';

type Args = {
  rating: string;
  comment?: string;
  establishment: string;
};
const mutation = mutationWithClientMutationId({
  name: 'CreateReviewMutation',
  inputFields: {
    rating: {
      type: new GraphQLNonNull(GraphQLString),
    },
    comment: {
      type: GraphQLString,
    },
    establishment: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: Args, context: GraphQLContext) => {
    if (!context.user) {
      return {
        error: 'user not logged',
      };
    }

    const establishment = await EstablishmentModel.findOne({
      _id: getObjectId(args.establishment),
    }).populate('user');

    if (!establishment) {
      return {
        error: 'post not found',
      };
    }

    const review = await new ReviewModel({
      user: context.user._id,
      establishment,
      comment: args.comment,
      rating: parseInt(args.rating),
    }).save();

    return {
      id: review._id,
      establishment: establishment._id,
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
    establishment: {
      type: EstablishmentType,
      resolve: async ({ establishment }, _, context) => {
        return await EstablishmentLoader.load(context, establishment);
      },
    },
    ...errorField,
    ...successField,
  },
});

export default mutation;
