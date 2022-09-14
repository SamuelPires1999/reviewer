import { graphql, GraphQLID, GraphQLInputObjectType } from 'graphql';

import { FILTER_CONDITION_TYPE, getObjectId } from '@entria/graphql-mongo-helpers';

export const productFilteInputMapping = {
  author: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (val: string) => val && getObjectId(val),
  },
};

const ProductFilterInputType = new GraphQLInputObjectType({
  name: 'ProductFilter',
  description: 'Used to filter products per user',
  //@ts-ignore
  fields: () => ({
    user: {
      type: GraphQLID,
    },
    reviews: {
      type: [GraphQLID],
    },
  }),
});

export default ProductFilterInputType;
