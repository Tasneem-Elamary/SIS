import { CourseEnrollmentType } from '../../types';

interface ICourseEnrollment {
  create(enrollmentData: CourseEnrollmentType): Promise<CourseEnrollmentType | undefined>;
  getById(id: string): Promise<CourseEnrollmentType | undefined>;
  getAll(): Promise<CourseEnrollmentType[]|undefined>;
  update(id: string, updateData: Partial<CourseEnrollmentType>): Promise<CourseEnrollmentType | undefined>;
  delete(id: string): Promise<boolean>;
}
export default ICourseEnrollment;
