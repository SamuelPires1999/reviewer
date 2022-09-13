import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLBoolean } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { connectionDefinitions, objectIdResolver, timestampResolver } from '@entria/graphql-mongo-helpers';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

import { GraphQLContext } from '../../graphql/types';
import UserType from '../user/UserType';
import * as UserLoader from '../user/UserLoader';
import ReviewModel, { IReview } from './ReviewModel';
import ProductType from '../product/ProductType';
import * as ProductLoader from '../product/ProductLoader';
import { load } from './ReviewLoader';

//@ts-ignore
const ReviewType = new GraphQLObjectType<IReview, GraphQLContext>({
  name: 'Comment',
  description: 'Comment data',
  //@ts-ignore
  fields: () => ({
    id: globalIdField('Comment'),
    ...objectIdResolver,
    comment: {
      type: GraphQLString,
      resolve: review => review.comment,
    },
    rating: {
      type: GraphQLInt,
    },
    user: {
      type: UserType,
      resolve: (review, _, context) => UserLoader.load(context, review.user),
    },
    product: {
      type: ProductType,
      resolve: (review, _, context) => ProductLoader.load(context, review.product),
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export default ReviewType;

registerTypeLoader(ReviewType, load);

export const ReviewConnection = connectionDefinitions({
  name: 'Review',
  nodeType: ReviewType,
});
