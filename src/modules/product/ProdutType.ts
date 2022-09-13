import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { connectionDefinitions, objectIdResolver, timestampResolver } from '@entria/graphql-mongo-helpers';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

import { GraphQLContext } from '../../graphql/types';
import UserType from '../user/UserType';
import * as UserLoader from '../user/UserLoader';
import { IProduct } from './ProductModel';
import { load } from './ProductLoader';

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
    user: {
      type: UserType,
      resolve: (product, _, context) => UserLoader.load(context, product.user),
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
