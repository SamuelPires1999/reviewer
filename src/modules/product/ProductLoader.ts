import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';

import ProductModel from './ProductModel';
import { productFilteInputMapping } from './ProductFilterInput';

const {
  Wrapper: Product,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: ProductModel,
  loaderName: 'ProductLoader',
  filterMapping: productFilteInputMapping,
});

export { getLoader, clearCache, load, loadAll };
export default Product;

registerLoader('ProductLoader', getLoader);
