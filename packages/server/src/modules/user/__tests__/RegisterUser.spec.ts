import {
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose,
} from '../../../../test';
import { graphql } from 'graphql';
import { schema } from '../../../schema/schema';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('Should be able to register an user and retrieve its token', async () => {
  const mutation = `
        mutation RegisterUser($input : UserRegisterWithEmailInput!) {
            RegisterWithEmailMutation(input: $input) {
                token 
                error
            }
        }
    `;

  const variableValues = {
    input: {
      name: 'testingUser',
      email: 'testing@email.com',
      password: 'testingPassword',
    },
  };
  const rootValue = {};

  const result = await graphql({
    schema,
    source: mutation,
    rootValue,
    variableValues,
  });

  //@ts-ignore
  expect(result.data.RegisterWithEmailMutation.token).toBeDefined();
  //@ts-ignore
  expect(result.data.errors).toBeUndefined();
});
