import { StudentType, UserType, ResultType } from '../../types';

interface StudentRepo{
  createStudents(data:(StudentType&UserType)[]): Promise<(StudentType&UserType)[]>;
  getAllStudents(): Promise<(StudentType& { email: string })[]>;
  unregisterSchedule (studentId: string, scheduleId: string): Promise<void>
registerSchedules(studentId: string, scheduleId: string[]): Promise<void>
// login(email: string, password: string): Promise<string>;
//   logout(): Promise<void>;
//   resetPassword(email: string): Promise<void>;
//   handlePasswordReset(token: string, newPassword: string): Promise<void>;
//   viewProfile(id: string): Promise<UserType | undefined>;
// editProfile(id: string, userData: Partial<UserType | undefined>): Promise<UserType | undefined>;
  getStudentByCode (studentCode: string): Promise<StudentType | undefined>,

  hasCompletedPrerequisitesAndEarnedHours (studentId: string, courseId: string): Promise<boolean>

  ApproveRegularRequest (studentId: string, schedulecell: number): Promise<StudentType|undefined>
  ApproveSelfstudyOROverloadRequest (studentId: string, courseCode: string, courseType:string): Promise<StudentType|undefined>
    RejectSelfstudyRequestOROverload (studentId: string, courseCode: string, courseType:string): Promise<StudentType|undefined>
    RejectRegularRequest (studentId: string, scheduleCell: number) : Promise<StudentType|undefined>
    getTopStudentsByGPA (prefix: string, limit: number, level?: number): Promise<StudentType[] | undefined>
    getStudentRank (studentCode: string): Promise<number | undefined>
}
export default StudentRepo;
