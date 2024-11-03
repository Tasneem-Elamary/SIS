import { MappedCourseType, BylawCourseType } from '../../types';

interface IMappedCourse {

    create(courseId: string, mappedCourseId: string): Promise<MappedCourseType | undefined>;
    getMappedCoursesByCourseId(courseId: string): Promise<(MappedCourseType & { mappedCourse: BylawCourseType })| undefined>;
    getCourseMappedToCourseId(mappedCourseId: string): Promise<(MappedCourseType & { MappedCourses: BylawCourseType }) | undefined>;
    delete(courseId: string, mappedCourseId: string): Promise<boolean>;
    getBylawMappedCourses(bylawId: string): Promise<(BylawCourseType & { MappedCourses: BylawCourseType[] }) []| undefined>

}
export default IMappedCourse;
