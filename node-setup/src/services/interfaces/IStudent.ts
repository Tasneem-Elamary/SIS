import { StudentType, UserType } from '../../types';
import { Student } from '../../models';

interface StudentRepo{
  createStudents(data:(StudentType&UserType)[]): Promise<(StudentType&UserType)[]>;
  getAllStudents(): Promise<(StudentType& { email: string })[]>;
// login(email: string, password: string): Promise<string>;
//   logout(): Promise<void>;
//   resetPassword(email: string): Promise<void>;
//   handlePasswordReset(token: string, newPassword: string): Promise<void>;
//   viewProfile(id: string): Promise<UserType | undefined>;
// editProfile(id: string, userData: Partial<UserType | undefined>): Promise<UserType | undefined>;
}
export default StudentRepo;
