import { Transaction } from 'sequelize';
import { UserType } from '../../types';

interface UserRepo {
    create(user: UserType, transaction?:Transaction): Promise<UserType | undefined>,
    getById(id: string): Promise<UserType | undefined>,
    getByEmail(email: string): Promise<UserType | undefined>,
    delete(id: string, transaction?:Transaction): Promise<boolean>,
}
export default UserRepo;
