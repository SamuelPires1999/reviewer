import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import { connectionArgs, globalIdField } from 'graphql-relay';

import {
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
  withFilter,
} from '@entria/graphql-mongo-helpers';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

import { GraphQLContext } from '../../graphql/types';
import UserType from '../user/UserType';
import * as UserLoader from '../user/UserLoader';
import { IEstablishment } from './EstablishmentModel';
import { load } from './EstablishmentLoader';
import { ReviewConnection } from '../review/ReviewType';
import * as ReviewLoader from '../review/ReviewLoader';

//@ts-ignore
const EstablishmentType = new GraphQLObjectType<IEstablishment, GraphQLContext>(
  {
    name: 'Establishment',
    description: 'Establishment data',
    //@ts-ignore
    fields: () => ({
      id: globalIdField('Establishment'),
      ...objectIdResolver,
      description: {
        type: GraphQLString,
        resolve: Establishment => Establishment.description,
      },
      referenceLink: {
        type: GraphQLString,
        resolve: Establishment => Establishment.referenceLink,
      },
      address: {
        type: GraphQLString,
        resolve: Establishment => Establishment.address,
      },
      name: {
        type: GraphQLString,
        resolve: Establishment => Establishment.name,
      },
      category: {
        type: GraphQLString,
        resolve: Establishment => Establishment.category,
      },
      user: {
        type: UserType,
        resolve: (Establishment, _, context) =>
          UserLoader.load(context, Establishment.user),
      },
      reviews: {
        type: new GraphQLNonNull(ReviewConnection.connectionType),
        args: {
          ...connectionArgs,
        },
        resolve: async (Establishment, args, context) =>
          await ReviewLoader.loadAll(
            context,
            withFilter(args, { establishment: Establishment._id }),
          ),
      },
      ...timestampResolver,
    }),
    interfaces: () => [nodeInterface],
  },
);

export default EstablishmentType;

registerTypeLoader(EstablishmentType, load);

export const EstablishmentConnection = connectionDefinitions({
  name: 'Establishment',
  nodeType: EstablishmentType,
});
