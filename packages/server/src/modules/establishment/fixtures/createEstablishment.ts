import { DeepPartial, getCounter } from '../../../../test';
import { IEstablishment } from '../EstablishmentModel';
import Establishment from '../EstablishmentModel';

export const createEstablishment = (args: DeepPartial<IEstablishment> = {}) => {
  const i = getCounter('establishment');

  return new Establishment({
    address: `Street n-${i}`,
    name: `Establishment test n-${i}`,
    description: `This is a test establishment n-${i}`,
    ...args,
  }).save();
};
