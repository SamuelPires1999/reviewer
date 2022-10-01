import { generateToken } from '../../../auth';
import { createUser } from '../../../modules/user/fixtures/createUser';
import {
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose,
  sanitizeTestObject,
} from '../../../../test';
import { getContext } from '../../../utils/getContext';
import { graphql } from 'graphql';
import { schema } from '../../../schema/schema';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('Should be able to create an establishment', async () => {
  const mutation = `
        mutation CreateEstablishment(
            $input: EstablishmentCreateInput!
            ) {
            CreateEstablishmentMutation(input: $input){
                error
                EstablishmentEdge{
                node {
                    _id
                    description
                    address
                    name
                    category
                    user{
                    _id
                    name
                    }
                }
                }
            }
            }
        `;

  const user = await createUser();
  const token = generateToken(user);
  let context: any = { user, req: { headers: { authorization: `${token}` } } };

  const contextValue = await getContext({ ...context });

  const variableValues = {
    input: {
      name: 'Test establishment',
      address: 'Street address',
      description: 'Testing place',
      category: 'shopping',
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
  expect(result.data.CreateEstablishmentMutation.error).toBeNull();
  expect(
    // @ts-ignore
    result.data.CreateEstablishmentMutation.EstablishmentEdge.node,
  ).toBeTruthy();
  //expect(sanitizeTestObject(result.data)).toMatchSnapshot();
});
