import { GraphQLID, GraphQLInputObjectType } from 'graphql';

import { FILTER_CONDITION_TYPE, getObjectId } from '@entria/graphql-mongo-helpers';

export const reviewFilterMapping = {
  user: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (val: string) => val && getObjectId(val),
  },
  product: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (val: string) => val && getObjectId(val),
  },
};

const ReviewFilterInputType = new GraphQLInputObjectType({
  name: 'ReviewFilter',
  description: 'Used to filter reviews from products',
  fields: () => ({
    user: {
      type: GraphQLID,
    },
    product: {
      type: GraphQLID,
    },
  }),
});

export default ReviewFilterInputType;
