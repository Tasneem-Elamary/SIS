import User from './user.service';
import { ICourse } from './interfaces';
import { UserRepo, InstructorRepo, CourseRepo } from '../persistance/Repositories';
import {
  UserType, StudentType, InstructorType, CourseType,
} from '../types';

class Course implements ICourse {
  constructor(private courseData:CourseRepo) {
  }

  getCourseById = async (id: string): Promise<CourseType | undefined> => {
    try {
      const course = await this.courseData.getById(id);
      if (!course) return undefined;
      return course;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the course, please try again!');
    }
  };

  getCourseByCode = async (courseCode: string): Promise<CourseType | undefined> => {
    try {
      const course = await this.courseData.getByCourseCode(courseCode);
      if (!course) return undefined;
      return course;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the course by code, please try again!');
    }
  };

  getAllCourses = async (): Promise<CourseType[] | undefined[]> => {
    try {
      return await this.courseData.getAll();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get all courses, please try again!');
    }
  };
}

export default Course;
