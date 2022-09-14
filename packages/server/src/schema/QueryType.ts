import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';
import { nodesField, nodeField } from '../modules/node/typeRegister';
import UserType from '../modules/user/UserType';
import * as UserLoader from '../modules/user/UserLoader';
import ProductType, { ProductConnection } from '../modules/product/ProductType';
import * as ProductLoader from '../modules/product/ProductLoader';
import { connectionArgs } from 'graphql-relay';
import { ReviewConnection } from '../modules/review/ReviewType';
import * as ReviewLoader from '../modules/review/ReviewLoader';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    me: {
      type: UserType,
      resolve: (root, args, context) => UserLoader.load(context, context.user?._id),
    },
    products: {
      type: new GraphQLNonNull(ProductConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (_, args, context) => await ProductLoader.loadAll(context, args),
    },
    reviews: {
      type: new GraphQLNonNull(ReviewConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (_, args, context) => await ReviewLoader.loadAll(context, args),
    },
    singleProductById: {
      type: ProductType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (_, args, context) => await ProductLoader.load(context, args.id),
    },
  }),
});

export default QueryType;
