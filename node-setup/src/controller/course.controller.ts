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
        return res.status(500).json({ message: 'Failed to create course' });
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
        return res.status(404).json({ message: 'Course not found' });
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
        return res.status(404).json({ message: 'Course not found' });
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
        return res.status(404).json({ message: 'Course not found' });
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
        return res.status(404).json({ message: 'Course not found' });
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

  createCoursePrerequisites = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, prerequisiteId } = req.body;
      const course = await this.course.createCoursePrerequisites(courseId, prerequisiteId);
      // console.log(prerequisites);
      res.status(201).json({ message: 'done', course });
    } catch (e) {
      next(e);
    }
  };

  // Method to get course prerequisites
  getCoursePrerequisites = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const course = await this.course.getCoursePrerequisites(courseId);

      res.status(200).json({ message: 'done', course });
    } catch (e) {
      next(e);
    }
  };

  getCourseDependants = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { prerequisiteId } = req.params;
      const course = await this.course.getCourseDependants(prerequisiteId);

      res.status(200).json({ message: 'done', course });
    } catch (e) {
      next(e);
    }
  };

  addCoursetoDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { departmentId, courseId, bylawId } = req.body;

      await this.course.addcourseToDepartment(departmentId || null, courseId, bylawId);
      res.status(201).send({ message: 'Association created successfully' });
    } catch (e) {
      next(e);
    }
  };

  getCoursesBylevel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const level = parseInt(req.params.level, 10);

      const courses = await this.course.getCoursesBylevel(level);
      res.status(200).send({ message: 'courses retrieved successfully', courses });
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

  deleteCourseOfBylawAndDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, bylawId, departmentId } = req.params;
      const result = await this.course.deleteCourseOfBylawAndDepartment(departmentId || null, courseId, bylawId);

      if (result) {
        return res.status(200).json({ message: 'Association deleted successfully.' });
      }
      return res.status(404).json({ message: 'Association not found.' });
    } catch (e) {
      next(e);
    }
  };

  getDistinctProfessorsByCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const course = await this.course.getDistinctProfessorsByCourse(id);

      if (!course) {
        return res.status(404).json({ message: 'failed to get professors teaches this course' });
      }

      res.status(200).json({ message: 'done', course });
    } catch (e) {
      next(e);
    }
  };

  @Get('/courses/instructors')
    getCoursesWithInstructorName = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const course = await this.course.getAllCoursesInstructors();

        if (!course) {
          return res.status(404).json({ message: 'failed to get courses instructors' });
        }

        res.status(200).json({ message: 'done', course });
      } catch (e) {
        next(e);
      }
    };

  // mapped courses

  addBylawMappedCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bylawCourseId, mappedBylawCourseId } = req.body;
      const result = await this.course.addBylawMappedCourse(bylawCourseId, mappedBylawCourseId);
      res.status(201).send({ message: 'Mapped course added successfully', result });
    } catch (error) {
      next(error);
    }
  };

  getMappedCoursesForBylawCourseId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bylawCourseId } = req.params;
      const mappedCourses = await this.course.getMappedCoursesForBylawCourseId(bylawCourseId);
      res.status(200).send({ message: 'Mapped courses retrieved successfully', mappedCourses });
    } catch (error) {
      next(error);
    }
  };

  getCourseMappedToCourseId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const sourceCourse = await this.course.getCourseMappedToCourseId(courseId);
      res.status(200).send({ message: 'Source course retrieved successfully', sourceCourse });
    } catch (error) {
      next(error);
    }
  };

  getBylawMappedCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bylawId } = req.params;
      const bylawCourses = await this.course.getBylawMappedCourses(bylawId);
      res.status(200).send({ message: 'Mapped courses for bylaw retrieved successfully', bylawCourses });
    } catch (error) {
      next(error);
    }
  };
}

export default new CourseController();
