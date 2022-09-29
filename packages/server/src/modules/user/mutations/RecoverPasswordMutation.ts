import { errorField, successField } from '@entria/graphql-mongo-helpers';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import UserModel from '../UserModel';

type Args = {
  email: string;
  newPassword: string;
};

export default mutationWithClientMutationId({
  name: 'RecoverPassword',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    newPassword: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ newPassword, email }: Args) => {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return {
        error: 'User not found with this email',
      };
    }

    user.password = newPassword;

    await user.save();

    return {
      success: 'Password updated successfully',
      error: null,
    };
  },
  outputFields: {
    ...errorField,
    ...successField,
  },
});
