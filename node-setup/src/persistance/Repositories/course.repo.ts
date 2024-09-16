import { CourseType, CoursewithRegistedStudentsType } from '../../types';

interface CourseRepo {
  create(course: CourseType): Promise<CourseType | undefined>;
  getById(id: string): Promise<CourseType | undefined>;
  getByCourseCode (courseCode: string): Promise<CourseType | undefined>
  getCourseDependants (prerequisiteId: string): Promise<(CourseType & { DependentCourse: CourseType[] })| undefined>
  getCoursePrerequisites (courseId: string): Promise<(CourseType & { Prerequisite: CourseType[] })| undefined>
  getAll(): Promise<CourseType[]|undefined[]>;
  update(id: string, updatedData: Partial<CourseType>): Promise<CourseType | undefined>;
  delete(id: string): Promise<boolean>;

  addCoursetoDepartment(departmentId:string, courseId: string): Promise<void | undefined>;
  getCoursesBylevel (level:number): Promise<CourseType[] | undefined[]>
  getCourseWithRegisteredStudentCounts (courseId: string, bylawId: string) : Promise<CoursewithRegistedStudentsType | undefined>
}
export default CourseRepo;
