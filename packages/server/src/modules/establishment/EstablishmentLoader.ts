import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';
import { EstablishmentFilteInputMapping } from './EstablishmentFilterInput';
import EstablishmentModel from './EstablishmentModel';

const {
  Wrapper: Establishment,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: EstablishmentModel,
  loaderName: 'EstablishmentLoader',
  filterMapping: EstablishmentFilteInputMapping,
});

export { getLoader, clearCache, load, loadAll };
export default Establishment;

registerLoader('EstablishmentLoader', getLoader);
