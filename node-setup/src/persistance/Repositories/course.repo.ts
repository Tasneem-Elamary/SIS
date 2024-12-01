import {
  BylawCourseType, BylawType, CourseType, CoursewithRegistedStudentsType,
  InstructorType,
} from '../../types';

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
// Mapped courses

addBylawMappedCourse (BylawCourseId: string, MappedBylawCourseId: string): Promise<Partial<BylawCourseType&{Course:Partial<CourseType>}&{Bylaw:Partial<BylawType>}> | undefined>
getMappedCoursesForBylawCourseId (BylawCourseId: string): Promise<Partial<BylawCourseType&{Course:Partial<CourseType>}&{Bylaw:Partial<BylawType>}>[] | undefined>
getCourseMappedToCourseId (CourseId: string): Promise<Partial<BylawCourseType&{Course:Partial<CourseType>}&{Bylaw:Partial<BylawType>}> | undefined>
getBylawMappedCourses (bylawId: string): Promise<Partial<BylawCourseType&{Course:Partial<CourseType>}&{Bylaw:Partial<BylawType>}>[] | undefined>

getDistinctProfessorsByCourse (courseId: string): Promise<CourseType & { Schedules: InstructorType[] } | undefined>
getAllCoursesInstructors(): Promise<
Array<{
  courseName: string;
  courseCode: string;
  instructorId: string;
  instructorFirstName: string;
  instructorLastName: string;
}>>}
export default CourseRepo;
