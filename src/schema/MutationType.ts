import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutations';
import ProductMutations from '../modules/product/mutations';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...ProductMutations,
  }),
});

export default MutationType;
