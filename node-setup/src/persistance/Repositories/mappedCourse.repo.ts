import { MappedCourseType, BylawCourseType } from '../../types';

interface MappedCoursesRepo {
    create(courseId: string, mappedCourseId: string): Promise<MappedCourseType | undefined>;
    getMappedCoursesByCourseId(courseId: string): Promise<(MappedCourseType & { mappedCourse: BylawCourseType })[] | undefined[]>;
    getCoursesMappedToCourseId(mappedCourseId: string): Promise<(MappedCourseType & { MappedCourses: BylawCourseType }) | undefined>;
    delete(courseId: string, mappedCourseId: string): Promise<boolean>;
}

export default MappedCoursesRepo;
