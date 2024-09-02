import { CourseType } from '../../types';

interface CourseRepo {
  create(course: CourseType): Promise<CourseType | undefined>;
  getById(id: string): Promise<CourseType | undefined>;
  getByCourseCode (courseCode: string): Promise<CourseType | undefined>
  getAll(): Promise<CourseType[]|undefined[]>;
  update(id: string, updatedData: Partial<CourseType>): Promise<CourseType | undefined>;
  delete(id: string): Promise<boolean>;
}
export default CourseRepo;
