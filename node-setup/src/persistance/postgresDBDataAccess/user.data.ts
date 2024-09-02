import { Transaction } from 'sequelize';
import { User } from '../../models';
import { UserRepo } from '../Repositories';
import { UserType } from '../../types';
import { db } from '../../../config/postgresDB.config';
// let User =models.User
class UserData implements UserRepo {
  public async create(user: UserType, transaction?: Transaction): Promise<UserType | undefined> {
    try {
      const newUser = await User.create(user, { transaction });
      return newUser.get();
    } catch (error) {
      console.error(error);
      throw new Error('Fail to save the user, Please try again !!');
    }
  }

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

  delete = async (id: string|undefined, transaction?:Transaction): Promise<boolean> => {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      await user.destroy({ transaction });
      return true;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to delete user');
    }
  };
}

export default UserData;
