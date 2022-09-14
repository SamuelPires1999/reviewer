import gql from 'graphql-tag';
import { setupServer } from 'src/server';
import request from 'supertest-graphql';
import { faker } from '@faker-js/faker';

it('should be able to register a user', async () => {
  const { data } = await request(setupServer())
    .query(
      gql`
      mutation RegisterUser ($name: String! , $email:String! , $password: String!) {
        RegisterWithEmailMutation(input: { name: , email: "super@email.com", password: "password" }) {
          me {
            name
            email
          }
          token
          error
        }
      }
    `
    )
    .variables({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

  console.log(data);

  expect(data).toBeDefined();
});
