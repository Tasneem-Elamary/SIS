import { StudentType, UserType, ResultType } from '../../types';

interface StudentRepo{
  createStudents(data:(StudentType&UserType)[]): Promise<(StudentType&UserType)[]>;
  getAllStudents(): Promise<(StudentType& { email: string })[]>;
  unregisterSchedule (studentId: string, scheduleId: string): Promise<void>
registerSchedule(studentId: string, scheduleId: string): Promise<void>
// login(email: string, password: string): Promise<string>;
//   logout(): Promise<void>;
//   resetPassword(email: string): Promise<void>;
//   handlePasswordReset(token: string, newPassword: string): Promise<void>;
//   viewProfile(id: string): Promise<UserType | undefined>;
// editProfile(id: string, userData: Partial<UserType | undefined>): Promise<UserType | undefined>;
  getStudentByCode (studentCode: string): Promise<StudentType | undefined>,

}
export default StudentRepo;
