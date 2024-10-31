import { Transaction } from 'sequelize';
import models from '../../models';
import { UserRepo } from '../Repositories';
import { UserType } from '../../types';
import { db } from '../../../config/postgresDB.config';
// let User =models.User
class UserData implements UserRepo {
  public async create(user: UserType, transaction?: Transaction): Promise<UserType | undefined> {
    try {
      console.log('debugg user', user);
      const newUser = await models.User.create(user, { transaction });
      const { id, email, role } = newUser.get();
      return { id, email, role };
    } catch (error) {
      console.error(error);
      throw new Error('Fail to create the user, Please try again !!');
    }
  }

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

  delete = async (id: string|undefined, transaction?:Transaction): Promise<boolean> => {
    try {
      const user = await models.User.findByPk(id);
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
