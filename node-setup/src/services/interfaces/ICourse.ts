import {
  CourseType, CoursePrerequisitesType, CoursewithRegistedStudentsType, BylawDepartmentCourseType,
  InstructorType,
} from '../../types';

interface courseRepo {
    createCourse(course: CourseType): Promise<CourseType | undefined>;

    updateCourse(id: string, updatedData: Partial<CourseType>): Promise<CourseType | undefined>;
    deleteCourse(id: string): Promise<boolean>;

    getCourseById(id: string): Promise<CourseType | undefined>;
    getCourseByCode(courseCode: string): Promise<CourseType | undefined>;
    getAllCourses(): Promise<BylawDepartmentCourseType[] | undefined[]>;
    createCoursePrerequisites (courseId: string, prerequisiteId: string): Promise<CoursePrerequisitesType | undefined> ;
    getCoursePrerequisites (courseId: string): Promise<(CourseType & { Prerequisite: CourseType[] })| undefined>
    getCourseDependants (prerequisiteId: string):Promise<(CourseType & { DependentCourse: CourseType[] })| undefined>

    addcourseToDepartment (departmentId: string | null, courseId: string, BylawId: string): Promise<BylawDepartmentCourseType | undefined>
    getCoursesBylevel (level:number): Promise<BylawDepartmentCourseType[] | undefined[]>
    getCourseWithRegisteredStudentCounts (courseId: string, bylawId: string): Promise<CoursewithRegistedStudentsType | undefined>
    deleteCourseOfBylawAndDepartment (departmentId:string | null, courseId: string, BylawId: string): Promise<boolean>
    getDistinctProfessorsByCourse (courseId: string): Promise<CourseType & { Schedules: InstructorType[] } | undefined>
  }

export default courseRepo;
