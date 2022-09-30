import { GraphQLID, GraphQLInputObjectType } from 'graphql';

import {
  FILTER_CONDITION_TYPE,
  getObjectId,
} from '@entria/graphql-mongo-helpers';

export const EstablishmentFilteInputMapping = {
  author: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (val: string) => val && getObjectId(val),
  },
};

const EstablishmentFilterInputType = new GraphQLInputObjectType({
  name: 'EstablishmentFilter',
  description: 'Used to filter Establishments per user',
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

export default EstablishmentFilterInputType;
