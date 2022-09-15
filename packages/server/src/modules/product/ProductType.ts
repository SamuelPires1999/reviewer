import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql';
import { connectionArgs, globalIdField } from 'graphql-relay';

import { connectionDefinitions, objectIdResolver, timestampResolver, withFilter } from '@entria/graphql-mongo-helpers';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

import { GraphQLContext } from '../../graphql/types';
import UserType from '../user/UserType';
import * as UserLoader from '../user/UserLoader';
import { IProduct } from './ProductModel';
import { load } from './ProductLoader';
import ReviewType, { ReviewConnection } from '../review/ReviewType';
import * as ReviewLoader from '../review/ReviewLoader';

//@ts-ignore
const ProductType = new GraphQLObjectType<IProduct, GraphQLContext>({
  name: 'Product',
  description: 'Product data',
  //@ts-ignore
  fields: () => ({
    id: globalIdField('Product'),
    ...objectIdResolver,
    description: {
      type: GraphQLString,
      resolve: product => product.description,
    },
    referenceLink: {
      type: GraphQLString,
      resolve: product => product.referenceLink,
    },
    name: {
      type: GraphQLString,
      resolve: product => product.name,
    },
    category: {
      type: GraphQLString,
      resolve: product => product.category,
    },
    user: {
      type: UserType,
      resolve: (product, _, context) => UserLoader.load(context, product.user),
    },
    reviews: {
      type: new GraphQLNonNull(ReviewConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (product, args, context) =>
        await ReviewLoader.loadAll(context, withFilter(args, { product: product._id })),
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export default ProductType;

registerTypeLoader(ProductType, load);

export const ProductConnection = connectionDefinitions({
  name: 'Product',
  nodeType: ProductType,
});
