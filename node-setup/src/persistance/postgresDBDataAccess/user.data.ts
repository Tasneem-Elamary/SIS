import { User } from '../../models/postgres';
import { UserRepo } from '../Repositories';
import { UserType } from '../../types';

class UserData implements UserRepo {
  create = async (user: UserType): Promise<UserType | undefined> => {
    try {
      const newUser = await User.create(user);
      return newUser.get();
    } catch (error) {
      console.error(error);
      throw new Error('Fail to save the user, Please try again !!');
    }
  };

  getById = async (id: string): Promise<UserType | undefined> => {
    try {
      const user = await User.findOne({ where: { id } });
      return user ? (user.get() as UserType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Fail to get the user, Please try again !!');
    }
  };

  getByEmail = async (email: string): Promise<UserType | undefined> => {
    try {
      const user = await User.findOne({ where: { email } });
      return user ? (user.get() as UserType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Fail to get the user, Please try again !!');
    }
  };
}

export default UserData;
