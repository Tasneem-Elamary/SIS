import { CoursePrerequisitesType, CourseType } from '../../types';

interface CourseRepo {
    create (courseId: string, prerequisiteId: string): Promise<CoursePrerequisitesType | undefined>
    getPrerequisitesByCourseId (courseId: string): Promise<(CoursePrerequisitesType & { prerequisite: CourseType })[]| undefined[]>
    getCoursesByPrerequisiteId (prerequisiteId: string): Promise<(CoursePrerequisitesType & { DependentCourse: CourseType })| undefined>
    delete (courseId: string, prerequisiteId: string): Promise<boolean>

}
export default CourseRepo;
