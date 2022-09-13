import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';

import ReviewModel from './ReviewModel';
import { reviewFilterMapping } from './ReviewFilterInputType';

const {
  Wrapper: Review,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: ReviewModel,
  loaderName: 'ReviewLoader',
  filterMapping: reviewFilterMapping,
});

export { getLoader, clearCache, load, loadAll };
export default Review;

registerLoader('ReviewLoader', getLoader);
