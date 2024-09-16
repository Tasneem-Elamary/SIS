import {
  InstructorType, UserType, CourseType, StudentAdvisorType, StudentType, ResultType,
} from '../../types';

interface instructorRepo {
  createInstructor(user: UserType, instructor: Partial<InstructorType>): Promise<InstructorType | undefined>;

  getInstructorById(id: string): Promise<(InstructorType & UserType) | undefined>;

  getInstructorByEmail(email: string): Promise<InstructorType | undefined>;

  getAllInstructors(): Promise<(InstructorType & UserType)[] | undefined[]>

  getAllTAs(): Promise<(InstructorType & UserType)[] | undefined[]>

  getAllDoctors(): Promise<(InstructorType & UserType)[] | undefined[]>

  updateInstructor(id: string, updatedData: Partial<InstructorType>): Promise<InstructorType | undefined>;

  deleteInstructor(id: string): Promise<boolean>;

  getadvisorStudents(instructorId: string): Promise<(InstructorType & { Student: StudentType[] })| undefined>

  // getAdvisedStudents(instructorId: string): Promise<StudentType[]>

  AdviseStudent(instructorId: string, studentId: string): Promise<void>;
  updateAdvisedStudent(studentId: string, instructorId: string, newInstructorId: string): Promise<void>
  deleteAdvisedStudent(studentId: string, instructorId: string): Promise<void>

  getListOfPendingStudents (instructorId: string): Promise<InstructorType|undefined>

  getSelfStudyOROverloadPendingStudents (instructorId: string, enrollmentType:string): Promise<InstructorType|undefined>

  //   viewCourses() : Promise<CourseType[] | undefined[]>;
  //  assignGrade(resultId:string,grade:number): Promise<boolean | undefined[]>;
}

export default instructorRepo;
