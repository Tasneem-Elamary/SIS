import { StudentType, UserType, ResultType } from '../../types';

interface StudentRepo{
  createStudents(data:(StudentType&UserType)[]): Promise<(StudentType&UserType)[]>;
  getAllStudents(): Promise<(StudentType& { email: string })[]>;
  getStudentByCode (studentCode: string): Promise<StudentType | undefined>,

}
export default StudentRepo;
