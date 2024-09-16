import jwt from 'jsonwebtoken';
import Env from '../../config';
import { UserType } from '../types';

const { JWT_SECRET } = Env;

const signUser = (user: UserType) => {
  const token = jwt.sign({ user }, JWT_SECRET as string);
  return token;
};

const verifyToken = (authToken: string) => {
  const user = jwt.verify(authToken, JWT_SECRET as string);
  return user;
};

export {
  signUser,
  verifyToken,
};
