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
} from '@entria/graphql-mongo-helpers';

import { GraphQLContext } from '../../../graphql/types';
import ReviewModel from '../ReviewModel';
type Args = {
  review: string;
};
const mutation = mutationWithClientMutationId({
  name: 'DeleteReviewMutation',
  inputFields: {
    review: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: Args, context: GraphQLContext) => {
    if (!context.user) {
      return {
        error: 'user not logged in',
      };
    }

    const review = await ReviewModel.findOne({
      _id: getObjectId(args.review),
    });

    if (!review) {
      return {
        error: 'review not found',
      };
    }

    if (review.user._id.toString() !== context.user.id) {
      return {
        error: 'You cannot delete another user review',
      };
    }

    await ReviewModel.deleteOne({
      _id: getObjectId(args.review),
    });

    return {
      id: review._id,
      error: null,
    };
  },
  outputFields: {
    ...errorField,
    ...successField,
  },
});

export default mutation;
