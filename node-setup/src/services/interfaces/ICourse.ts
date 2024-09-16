import { CourseType, CoursePrerequisitesType, CoursewithRegistedStudentsType } from '../../types';

interface courseRepo {
    createCourse(course: CourseType): Promise<CourseType | undefined>;

    updateCourse(id: string, updatedData: Partial<CourseType>): Promise<CourseType | undefined>;
    deleteCourse(id: string): Promise<boolean>;

    getCourseById(id: string): Promise<CourseType | undefined>;
    getCourseByCode(courseCode: string): Promise<CourseType | undefined>;
    getAllCourses(): Promise<CourseType[] | undefined[]>;
    createCoursePrerequisites (courseId: string, prerequisiteId: string): Promise<CoursePrerequisitesType | undefined> ;
    getCoursePrerequisites (courseId: string): Promise<(CourseType & { Prerequisite: CourseType[] })| undefined>
    getCourseDependants (prerequisiteId: string):Promise<(CourseType & { DependentCourse: CourseType[] })| undefined>

    addcourseToDepartment (departmentId:string, courseId: string): Promise<void | undefined>
    getCoursesBylevel (level:number): Promise<CourseType[] | undefined[]>
    getCourseWithRegisteredStudentCounts (courseId: string, bylawId: string): Promise<CoursewithRegistedStudentsType | undefined>
}

export default courseRepo;
