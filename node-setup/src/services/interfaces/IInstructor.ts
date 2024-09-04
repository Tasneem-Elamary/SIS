import {
  InstructorType, UserType, CourseType, StudentAdvisorType, StudentType,ResultType
} from '../../types';

interface instructorRepo {

  viewProfile(id: string): Promise<(InstructorType & { User: UserType }) | undefined>;
  editProfile(id: string, updatedData: Partial<InstructorType>): Promise<InstructorType | undefined>;
  getStudentsByAdvisor (instructorId: string): Promise<StudentType[]>
  uploadResults (results: Partial<ResultType>[]): Promise<ResultType[] | undefined[]>
  updateResultbyId (id: string, updatedData: Partial<ResultType>): Promise<ResultType | undefined>
//   viewCourses() : Promise<CourseType[] | undefined[]>;
//  assignGrade(resultId:string,grade:number): Promise<boolean | undefined[]>;
}

export default instructorRepo;
