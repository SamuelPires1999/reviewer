import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutations';
import EstablishmentMutations from '../modules/establishment/mutations';
import ReviewMutations from '../modules/review/mutations';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...EstablishmentMutations,
    ...ReviewMutations,
  }),
});

export default MutationType;
