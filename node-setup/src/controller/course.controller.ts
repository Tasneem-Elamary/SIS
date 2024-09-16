import { NextFunction, Request, Response } from 'express';
import { Get, Route } from 'tsoa';
import { hashPassword, isPasswordValid } from '../util/hashing';
import { signUser } from '../util/auth.util';
import { Course } from '../services';
import { ICourse } from '../services/interfaces';
import { DataAccess } from '../persistance';
import { UserType, InstructorType, CourseType } from '../types';
import { UserRepo } from '../persistance/Repositories';
import { DepartmentDataAccess } from '../persistance/postgresDBDataAccess';

// Assuming CourseDataAccess and UserDataAccess are part of DataAccess
const { CourseDataAcces, CoursePrerequisitesData, BylawDepartmentCourseData } = DataAccess;

class CourseController {
  private course: ICourse;

  constructor() {
    const courseDataAccess = new CourseDataAcces();
    const coursePrerequisiteDataAccess = new CoursePrerequisitesData();
    const bylawDepartmentCourseData = new BylawDepartmentCourseData();
    const departmentDataAccess = new DepartmentDataAccess();
    this.course = new Course(courseDataAccess, coursePrerequisiteDataAccess, bylawDepartmentCourseData);
  }

  createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;

      const newCourse = await this.course.createCourse(body);

      if (!newCourse) {
        res.status(500).json({ message: 'Failed to create course' });
      }

      res.status(201).json({ message: 'Course created successfully', newCourse });
    } catch (e) {
      next(e);
    }
  };

  // Update course
  updateCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedData: Partial<CourseType> = req.body;

      const updatedCourse = await this.course.updateCourse(id, updatedData);

      if (!updatedCourse) {
        res.status(404).json({ message: 'Course not found' });
      }

      res.status(200).json({ message: 'Course updated successfully', updatedCourse });
    } catch (e) {
      next(e);
    }
  };

  // Delete course
  deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedCourse = await this.course.deleteCourse(id);

      if (!deletedCourse) {
        res.status(404).json({ message: 'Course not found' });
      }

      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (e) {
      next(e);
    }
  };

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

  createCoursePrerequisites = async (req: Request, res: Response) => {
    try {
      const { courseId, prerequisiteId } = req.body;
      const course = await this.course.createCoursePrerequisites(courseId, prerequisiteId);
      // console.log(prerequisites);
      res.status(201).json({ message: 'done', course });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  };

  // Method to get course prerequisites
  getCoursePrerequisites = async (req: Request, res: Response) => {
    try {
      const { courseId } = req.params;
      const course = await this.course.getCoursePrerequisites(courseId);

      res.status(200).json({ message: 'done', course });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  };

  getCourseDependants = async (req: Request, res: Response) => {
    try {
      const { prerequisiteId } = req.params;
      const course = await this.course.getCourseDependants(prerequisiteId);

      res.status(200).json({ message: 'done', course });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  };

  addCoursetoDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { departmentId, courseId } = req.body;

      await this.course.addcourseToDepartment(req.body.departmentId, req.body.courseId);
      res.status(201).send({ message: 'Association created successfully' });
    } catch (e) {
      next(e);
    }
  };

  getCoursesBylevel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const level = parseInt(req.params.level, 10);

      const courses = await this.course.getCoursesBylevel(level);
      res.status(201).send({ message: 'courses retrieved successfully', courses });
    } catch (e) {
      next(e);
    }
  };

  getCourseWithRegisteredStudentCounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, bylawId } = req.params;

      const course = await this.course.getCourseWithRegisteredStudentCounts(courseId, bylawId);
      res.status(201).send({ message: 'courses retrieved successfully', course });
    } catch (e) {
      next(e);
    }
  };
}

export default new CourseController();
