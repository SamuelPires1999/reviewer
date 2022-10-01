import { DeepPartial, getCounter } from '../../../../test';
import { IUser } from '../UserModel';
import User from '../UserModel';

export const createUser = (args: DeepPartial<IUser> = {}) => {
  const i = getCounter('user');

  return new User({
    name: `user#${i}`,
    email: `user${i}@example.com`,
    password: '123456',
    ...args,
  }).save();
};
