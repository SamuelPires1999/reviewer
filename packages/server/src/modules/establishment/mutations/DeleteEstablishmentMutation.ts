import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import {
  errorField,
  getObjectId,
  successField,
} from '@entria/graphql-mongo-helpers';
import EstablishmentModel from '../EstablishmentModel';
import * as EstablishmentLoader from '../EstablishmentLoader';
import { EstablishmentConnection } from '../EstablishmentType';
import { GraphQLContext } from '../../../graphql/types';
import ReviewModel from '../../review/ReviewModel';

type Args = {
  establishment: string;
};
const mutation = mutationWithClientMutationId({
  name: 'EstablishmentDelete',
  inputFields: {
    establishment: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: Args, context: GraphQLContext) => {
    const { establishment } = args;

    if (!context.user) {
      return {
        error: 'user not logged in',
      };
    }

    const EstablishmentToBeDeleted = await EstablishmentModel.findById({
      _id: getObjectId(establishment),
    });

    if (!EstablishmentToBeDeleted) {
      return {
        error: 'Establishment not found',
      };
    }

    if (EstablishmentToBeDeleted.user._id.toString() != context.user.id) {
      return {
        error: "You cannot delete other user's Establishment",
      };
    }

    const deletedEstablishment = await EstablishmentModel.findByIdAndDelete({
      _id: getObjectId(establishment),
    });

    if (!deletedEstablishment) {
      return {
        error: 'Could not delete this Establishment',
      };
    }

    await ReviewModel.deleteMany({
      establishment: deletedEstablishment?._id.toString(),
    }).catch(error => {
      console.log('error', error);
      return {
        error: 'Could not dele Establishment reviews',
      };
    });

    return {
      id: deletedEstablishment?._id,
      error: null,
      message: 'Establishment Deleted!',
    };
  },
  outputFields: {
    message: {
      type: GraphQLString,
    },
    ...errorField,
    ...successField,
  },
});

export default mutation;
