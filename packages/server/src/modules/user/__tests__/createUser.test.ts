import { graphql } from 'graphql';

import { connectWithMongoose, disconnectWithMongoose } from '../../../../test';
import { schema } from '../../../schema/schema';

beforeAll(connectWithMongoose);
afterAll(disconnectWithMongoose);

it('should create a new user', async () => {
  const mutation = `
    mutation M($name: String!, $password: String!, $email: String!) {
      RegisterWithEmailMutation(input: { name: $name, password: $password, email: $email }) {
        token
        error
        me {
          _id
          name
          email
        }
      }
    }
  `;

  const result = await graphql({
    schema,
    source: mutation,
    rootValue: {},
    variableValues: {
      name: 'TestingUser',
      password: 'TestingPassword',
      email: 'Testing@email.com',
    },
  });

  expect(result.errors).toBeUndefined();

  const user = result?.data?.RegisterWithEmailMutation as any;

  expect(user.token).toBeDefined();
  expect(user.me).toBeDefined();
  expect(user.error).toBeNull();
});

it('should get an error, email not provided', async () => {
  const mutation = `
    mutation M($name: String!, $password: String!, $email: String!) {
      RegisterWithEmailMutation(input: { name: $name, password: $password, email: $email }) {
        token
        error
        me {
          _id
          name
          email
        }
      }
    }
  `;

  const result = await graphql({
    schema,
    source: mutation,
    rootValue: {},
    variableValues: {
      name: 'TestingUser',
      password: 'TestingPassword',
    },
  });

  expect(result.errors).toBeDefined();

  const user = result?.data?.RegisterWithEmailMutation as any;

  expect(user).toBeUndefined();
});
