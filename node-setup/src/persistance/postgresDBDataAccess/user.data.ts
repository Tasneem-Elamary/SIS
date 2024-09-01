import models from '../../models';
import { UserRepo } from '../Repositories';
import { UserType } from '../../types';

class UserData implements UserRepo {
  create = async (user: UserType): Promise<UserType | undefined> => {
    try {
      const newUser = await models.User.create(user);
      return newUser.get();
    } catch (error) {
      console.error(error);
      throw new Error('Fail to create the user, Please try again !!');
    }
  };

  getById = async (id: string): Promise<UserType | undefined> => {
    try {
      const user = await models.User.findOne({ where: { id } });
      return user ? (user.get() as UserType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Fail to get the user, Please try again !!');
    }
  };

  getByEmail = async (email: string): Promise<UserType | undefined> => {
    try {
      const user = await models.User.findOne({ where: { email } });
      return user ? (user.get() as UserType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Fail to get the user, Please try again !!');
    }
  };

  delete = async (id: string): Promise<boolean> => {
    try {
      const deletedRowsCount = await models.User.destroy({ where: { id } });

      // Sequelize destroy returns the number of rows deleted
      return deletedRowsCount > 0;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete the user, please try again!');
    }
  };
}

export default UserData;
