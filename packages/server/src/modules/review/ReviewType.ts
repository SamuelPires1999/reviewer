import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';

import {
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
} from '@entria/graphql-mongo-helpers';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

import { GraphQLContext } from '../../graphql/types';
import UserType from '../user/UserType';
import * as UserLoader from '../user/UserLoader';
import { IReview } from './ReviewModel';
import * as EstablishmentLoader from '../establishment/EstablishmentLoader';
import { load } from './ReviewLoader';
import EstablishmentType from '../establishment/EstablishmentType';

//@ts-ignore
const ReviewType = new GraphQLObjectType<IReview, GraphQLContext>({
  name: 'Review',
  description: 'Review data',
  //@ts-ignore
  fields: () => ({
    id: globalIdField('Review'),
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
    establishment: {
      type: EstablishmentType,
      resolve: (review, _, context) =>
        EstablishmentLoader.load(context, review.establishment),
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
