import { generateToken } from '../../../auth';
import { createUser } from '../../../modules/user/fixtures/createUser';
import {
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose,
} from '../../../../test';
import { getContext } from '../../../utils/getContext';
import { graphql } from 'graphql';
import { schema } from '../../../schema/schema';
import { createEstablishment } from '../fixtures/createEstablishment';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('Should be able to delete an existing establishment', async () => {
  const mutation = `
        mutation DeleteEstablishment(
            $input: EstablishmentDeleteInput!
            ) {
            DeleteEstablishmentMutation(input: $input){
                error
                message
            }
            }
        `;

  const user = await createUser();
  const token = generateToken(user);
  let context: any = { user, req: { headers: { authorization: `${token}` } } };
  const establishment = await createEstablishment({
    user: user._id,
  });

  const contextValue = await getContext({ ...context });

  const variableValues = {
    input: {
      establishment: establishment.id.toString(),
    },
  };
  const rootValue = {};

  const result = await graphql({
    schema,
    source: mutation,
    rootValue,
    contextValue,
    variableValues,
  });
  // @ts-ignore
  expect(result.data.DeleteEstablishmentMutation).toBeDefined();
  // @ts-ignore
  expect(result.data.errors).toBeUndefined();
  // @ts-ignore
  expect(result.data.DeleteEstablishmentMutation.message).toBe(
    'Establishment Deleted!',
  );
});
