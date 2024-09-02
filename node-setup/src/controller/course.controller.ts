import { NextFunction, Request, Response } from 'express';
import { Get, Route } from 'tsoa';
import { hashPassword, isPasswordValid } from '../util/hashing';
import { signUser } from '../util/auth.util';
import { Course } from '../services';
import { ICourse } from '../services/interfaces';
import { DataAccess } from '../persistance';
import { UserType, InstructorType } from '../types';
import { UserRepo } from '../persistance/Repositories';

// Assuming CourseDataAccess and UserDataAccess are part of DataAccess
const { CourseDataAcces } = DataAccess;

class CourseController {
  private course: ICourse;

  constructor() {
    const courseDataAccess = new CourseDataAcces();
    this.course = new Course(courseDataAccess);
  }

  // Get course by ID
  getCourseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const course = await this.course.getCourseById(id);

      if (!course) {
        res.status(404).json({ message: 'Course not found' });
      }

      res.status(200).json({ course });
    } catch (e) {
      next(e);
    }
  };

  getCourseByCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.params;
      const course = await this.course.getCourseByCode(code);

      if (!course) {
        res.status(404).json({ message: 'Course not found' });
      }

      res.status(200).json({ course });
    } catch (e) {
      next(e);
    }
  };

  // Get all courses
  getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await this.course.getAllCourses();
      res.status(200).json({ message: 'done', courses });
    } catch (e) {
      next(e);
    }
  };
}

export default new CourseController();
