import { UserType } from '../../types';

interface UserRepo {
  login(email: string, password: string): Promise<string>;
// logout(): Promise<void>;
// resetPassword(email: string): Promise<void>;
// handlePasswordReset(token: string, newPassword: string): Promise<void>;
// viewProfile(id: string): Promise<UserType | undefined>;
// editProfile(id: string, userData: Partial<UserType | undefined>): Promise<UserType | undefined>;
}
export default UserRepo;
