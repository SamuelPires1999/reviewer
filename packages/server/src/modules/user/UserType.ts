import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs, globalIdField } from 'graphql-relay';

import { connectionDefinitions, objectIdResolver, timestampResolver, withFilter } from '@entria/graphql-mongo-helpers';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

import { GraphQLContext } from '../../graphql/types';

import { IUser } from './UserModel';
import { load } from './UserLoader';
import { ProductConnection } from '../product/ProductType';
import * as ProductLoader from '../product/ProductLoader';
import { ReviewConnection } from '../review/ReviewType';
import * as ReviewLoader from '../review/ReviewLoader';

const UserType = new GraphQLObjectType<IUser, GraphQLContext>({
  name: 'User',
  description: 'User data',
  //@ts-ignore
  fields: () => ({
    id: globalIdField('User'),
    ...objectIdResolver,
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email,
    },
    products: {
      type: new GraphQLNonNull(ProductConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (user, args, context) =>
        await ProductLoader.loadAll(
          context,
          withFilter(args, {
            author: user._id,
          })
        ),
    },
    reviews: {
      type: new GraphQLNonNull(ReviewConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (user, args, context) => await ReviewLoader.loadAll(context, withFilter(args, { user: user._id })),
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export default UserType;

registerTypeLoader(UserType, load);

export const UserConnection = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});
