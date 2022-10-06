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
import { createEstablishment } from '../../establishment/fixtures/createEstablishment';
import { getObjectId } from '@entria/graphql-mongo-helpers';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('Should be able to create a review for an establishment', async () => {
  const mutation = `
        mutation CreateReview(
        $input: CreateReviewMutationInput!
        ){
        CreateReviewMutation(input: $input){
            error
            reviewEdge{
            node{
                _id
                comment
                rating
                user{
                _id
                name
                }
                establishment{
                _id
                description
                name
                address
                category
                }
            }
            }
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
      establishment: establishment._id.toString(),
      rating: '10',
      comment: 'Testing comment',
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
  expect(result.data.CreateReviewMutation.error).toBeNull();
  expect(
    // @ts-ignore
    result.data.CreateReviewMutation.reviewEdge.node,
  ).toBeTruthy();
});
