import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { nodesField, nodeField } from '../modules/node/typeRegister';
import UserType from '../modules/user/UserType';
import * as UserLoader from '../modules/user/UserLoader';
import ProductType, { ProductConnection } from '../modules/product/ProdutType';
import * as ProductLoader from '../modules/product/ProductLoader';
import { connectionArgs } from 'graphql-relay';

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
  }),
});

export default QueryType;
