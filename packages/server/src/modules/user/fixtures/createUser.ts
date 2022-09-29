import { DeepPartial } from '../../../../test/deepPartial';
import UserModel, { IUser } from '../UserModel';

export const createUser = async (args?: DeepPartial<IUser>): Promise<IUser> => {
  const i = Math.floor(Math.random() * 100);

  return new UserModel({
    name: `user#${i}`,
    password: `password#${i}`,
    email: `testing#${i}@email.com`,
    ...args,
  }).save();
};
