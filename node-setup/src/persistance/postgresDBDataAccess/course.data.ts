import { Course } from '../../models';
// import models from '../../models';
import { CourseRepo } from '../Repositories';
import { CourseType } from '../../types';

class CourseData implements CourseRepo {
  create = async (course: CourseType): Promise<CourseType | undefined> => {
    try {
      const newCourse = await Course.create(course);
      // const newCourse = await models.Course.create(course);
      return newCourse ? (newCourse.get() as CourseType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create the course, please try again!');
    }
  };

  getById = async (id: string): Promise<CourseType | undefined> => {
    try {
      const course = await Course.findOne({ where: { id } });
      // const course = await models.Course.findOne({ where: { id } });
      return course ? (course.get() as CourseType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the course, please try again!');
    }
  };

  getByCourseCode = async (courseCode: string): Promise<CourseType | undefined> => {
    try {
      const course = await Course.findOne({ where: { code: courseCode } });
      // const course = await models.Course.findOne({ where: { code: courseCode } });
      return course ? (course.get() as CourseType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the course by code, please try again!');
    }
  };

  getAll = async (): Promise<CourseType[] | undefined[]> => {
    try {
      const courses = await Course.findAll();
      // const courses = await models.Course.findAll();
      return courses.map(({ course }:any) => course.get() as CourseType);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve courses, please try again!');
    }
  };

  update = async (id: string, updates: Partial<CourseType>): Promise<CourseType | undefined> => {
    try {
      const course = await Course.findOne({ where: { id } });
      // const course = await models.Course.findOne({ where: { id } });
      if (course) {
        await course.update(updates);
        return course.get() as CourseType;
      }
      return undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update the course, please try again!');
    }
  };

  delete = async (id: string): Promise<boolean> => {
    try {
      const result = await Course.destroy({ where: { id } });
      // const result = await models.Course.destroy({ where: { id } });
      return result > 0;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete the course, please try again!');
    }
  };
}

export default CourseData;
