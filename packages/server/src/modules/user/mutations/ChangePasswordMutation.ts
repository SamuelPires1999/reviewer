import { errorField, successField } from '@entria/graphql-mongo-helpers';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLContext } from '../../../graphql/types';

type Args = {
  newPassword: string;
  oldPassword: string;
};

export default mutationWithClientMutationId({
  name: 'ChangeUserPassword',
  inputFields: {
    oldPassword: {
      type: new GraphQLNonNull(GraphQLString),
    },
    newPassword: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ oldPassword, newPassword }: Args, { user }: GraphQLContext) => {
    if (!user) {
      throw new Error('invalid user');
    }

    const correctPassword = user.authenticate(oldPassword);

    if (!correctPassword) {
      return {
        error: 'INVALID_PASSWORD',
      };
    }

    user.password = newPassword;
    await user.save();

    return {
      message: 'Password updated successfully',
      error: null,
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
