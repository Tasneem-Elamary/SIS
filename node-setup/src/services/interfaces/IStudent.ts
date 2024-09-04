import { StudentType, UserType,ResultType } from '../../types';

interface StudentRepo{
  createStudents(data:(StudentType&UserType)[]): Promise<(StudentType&UserType)[]>;
  getAllStudents(): Promise<(StudentType& { email: string })[]>;

  getTranscript(studentId: string): Promise<ResultType[]|undefined[]>;
  // getByCourseId(courseId: string): Promise<ResultType[]|undefined[]>;
  getCourseResult(studentId: string, courseId: string, semesterId: string): Promise<ResultType|undefined>;
  getSemesterResult(studentId: string, semesterId: string): Promise<ResultType[]|undefined[]>;
}
export default StudentRepo;
