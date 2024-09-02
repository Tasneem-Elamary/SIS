import { UserType } from '../../types';

interface UserRepo {
    create(user: UserType): Promise<UserType | undefined>,
    getById(id: string): Promise<UserType | undefined>,
    getByEmail(email: string): Promise<UserType | undefined>,
    delete(id: string): Promise<boolean>,
}
export default UserRepo;
