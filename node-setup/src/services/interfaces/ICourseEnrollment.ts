import { CourseEnrollmentType, CourseType, StudentType } from '../../types';

interface ICourseEnrollment {
  create(enrollmentData: CourseEnrollmentType): Promise<CourseEnrollmentType | undefined>;
 requestOverload(enrollmentData: CourseEnrollmentType): Promise<CourseEnrollmentType | undefined> ;
 requestSelfStudy(enrollmentData: CourseEnrollmentType): Promise<CourseEnrollmentType | undefined> ;
 requestRegular(enrollmentData: CourseEnrollmentType): Promise<CourseEnrollmentType | undefined> ;
 request(enrollmentData: CourseEnrollmentType): Promise<CourseEnrollmentType | undefined> ;
 requestByStudentCode(enrollmentData: CourseEnrollmentType): Promise<CourseEnrollmentType | undefined>
 getCoursesStudentAllowedToEnroll(StudentId: string): Promise<CourseType[]>
  getById(id: string): Promise<CourseEnrollmentType | undefined>;
  getAll(): Promise<CourseEnrollmentType[]|undefined>;
  update(id: string, updateData: Partial<CourseEnrollmentType>): Promise<CourseEnrollmentType | undefined>;
  delete(id: string): Promise<boolean>;
  getEnrollmentRequests(): Promise<Partial<StudentType & CourseType>[]>
}
export default ICourseEnrollment;
