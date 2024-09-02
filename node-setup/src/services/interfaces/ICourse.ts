import { CourseType } from '../../types';

interface courseRepo {

    getCourseById(id: string): Promise<CourseType | undefined>;
    getCourseByCode(courseCode: string): Promise<CourseType | undefined>;
    getAllCourses(): Promise<CourseType[] | undefined[]>;
}

export default courseRepo;
