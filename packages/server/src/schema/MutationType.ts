import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutations';
import ProductMutations from '../modules/product/mutations';
import ReviewMutations from '../modules/review/mutations';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...ProductMutations,
    ...ReviewMutations,
  }),
});

export default MutationType;
