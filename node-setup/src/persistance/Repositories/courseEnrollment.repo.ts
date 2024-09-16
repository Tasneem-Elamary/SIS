import { CourseEnrollmentType } from '../../types';

interface CourseEnrollmentRepo {
    create(enrollment: CourseEnrollmentType): Promise<CourseEnrollmentType | undefined>;
    getById(id: string): Promise<CourseEnrollmentType | undefined>;
    getAll(): Promise<CourseEnrollmentType[] | undefined>;
    update(id: string, updatedData: Partial<CourseEnrollmentType>): Promise<CourseEnrollmentType | undefined>;
    delete(id: string): Promise<boolean>;
  }
export default CourseEnrollmentRepo;
