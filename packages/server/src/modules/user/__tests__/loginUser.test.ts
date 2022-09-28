import { graphql } from 'graphql';

import {
  clearDatabase,
  connectWithMongoose,
  disconnectWithMongoose,
} from '../../../../test';
import { schema } from '../../../schema/schema';
import { createUser } from '../fixtures/createUser';

beforeAll(connectWithMongoose);
beforeEach(clearDatabase);
afterAll(disconnectWithMongoose);

it('should login a registered user', async () => {
  const { email } = await createUser({
    email: 'Testing@email.com',
    password: 'TestingPassword',
  });

  const mutation = `
    mutation M($email: String!, $password: String!) {
        LoginWithEmailMutation(
            input: { email: $email, password: $password }
        ) {
            token
            error
            me {
                name
                email
                _id
            }
        }
    }
  `;

  const result = await graphql({
    schema,
    source: mutation,
    variableValues: {
      email,
      password: 'TestingPassword',
    },
  });

  expect(result.errors).toBeUndefined();
  const user = result.data?.LoginWithEmailMutation as any;

  expect(user.me).toBeDefined();
  expect(user.token).toBeDefined();
});

it('should get an invalid credential error', async () => {
  const { email } = await createUser({
    email: 'Testing@email.com',
    password: 'TestingPassword',
  });

  const mutation = `
     mutation M($email: String!, $password: String!) {
        LoginWithEmailMutation(
            input: { email: $email, password: $password }
        ) {
            token
            error
            me {
                name
                email
                _id
            }
        }
    }
  `;

  const result = await graphql({
    schema,
    source: mutation,
    variableValues: {
      email,
      password: 'WRONGPASSWORD',
    },
  });

  // @ts-ignore
  expect(result.data?.LoginWithEmailMutation?.error).toBeDefined();
  // @ts-ignore
  expect(result.data?.LoginWithEmailMutation?.error).toBe(
    'Invalid credentials',
  );
});
