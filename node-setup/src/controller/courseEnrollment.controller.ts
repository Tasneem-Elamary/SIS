import { NextFunction, Request, Response } from 'express';
import {
  Route, Get, Post, Put, Delete,
} from 'tsoa';
import { CourseEnrollmentType } from '../types';
import CourseEnrollmentService from '../services/courseEnrollment.service';
import { DataAccess } from '../persistance';
import ICourseEnrollment from '../services/interfaces/ICourseEnrollment';
import { IStudent } from '../services/interfaces';

const { CourseEnrollmentDataAccess ,StudentDataAccess} = DataAccess;

@Route('CourseEnrollment')
class CourseEnrollmentController {
  private courseEnrollmentService: ICourseEnrollment;
 
 
  constructor() {
    const courseEnrollmentDataAccess = new CourseEnrollmentDataAccess();
    const studentDataAccess =new StudentDataAccess;
    this.courseEnrollmentService = new CourseEnrollmentService(courseEnrollmentDataAccess,studentDataAccess);
  }

  @Post()
  public create = async (req: Request, res: Response, next: NextFunction) => {
    const enrollmentData: CourseEnrollmentType = req.body;
    try {
      const enrollment = await this.courseEnrollmentService.create(enrollmentData);
      res.status(201).json({
        message: 'Course enrollment created successfully',
        enrollment,
      });
    } catch (e) {
      next(e);
    }
  };

  @Post()
  public request = async (req: Request, res: Response, next: NextFunction) => {
    const enrollmentData: CourseEnrollmentType = req.body;
    try {
      const enrollment = await this.courseEnrollmentService.request(enrollmentData);
      res.status(201).json({
        message: 'Request enrollment sent successfully',
        enrollment,
      });
    } catch (e) {
      next(e);
    }
  };
  public requestByStudentCode = async (req: Request, res: Response, next: NextFunction) => {
    const enrollmentData: CourseEnrollmentType = req.body;
    try {
      const enrollment = await this.courseEnrollmentService.requestByStudentCode(enrollmentData);
      res.status(201).json({
        message: 'Request enrollment sent successfully',
        enrollment,
      });
    } catch (e) {
      next(e);
    }
  };
  @Get('/{id}')
  public getById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const enrollment = await this.courseEnrollmentService.getById(id);
      if (enrollment) {
        res.json({
          message: 'Course enrollment retrieved successfully',
          enrollment,
        });
      } else {
        res.status(404).json({ message: 'Course enrollment not found' });
      }
    } catch (e) {
      next(e);
    }
  };

  @Get('/')
  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const enrollments = await this.courseEnrollmentService.getAll();
      res.json({
        message: 'Course enrollments retrieved successfully',
        enrollments,
      });
    } catch (e) {
      next(e);
    }
  };

  @Put('/{id}')
  public update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updateData: Partial<CourseEnrollmentType> = req.body;
    try {
      const updatedEnrollment = await this.courseEnrollmentService.update(id, updateData);
      if (updatedEnrollment) {
        res.json({
          message: 'Course enrollment updated successfully',
          updatedEnrollment,
        });
      } else {
        res.status(404).json({ message: 'Course enrollment not found' });
      }
    } catch (e) {
      next(e);
    }
  };

  @Delete('/{id}')
  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const success = await this.courseEnrollmentService.delete(id);
      if (success) {
        res.json({ message: 'Course enrollment deleted successfully' });
      } else {
        res.status(404).json({ message: 'Course enrollment not found' });
      }
    } catch (e) {
      next(e);
    }
  };

  public requestOverload = async (req: Request, res: Response) => {
    try {
      const enrollmentData = req.body;
      const enrollment = await this.courseEnrollmentService.requestOverload(enrollmentData);
      res.status(201).json({ message: 'Overload enrollment request sent successfully', data: enrollment });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  public requestSelfStudy = async (req: Request, res: Response) => {
    try {
      const enrollmentData = req.body;
      const enrollment = await this.courseEnrollmentService.requestSelfStudy(enrollmentData);
      res.status(201).json({ message: 'Self-study enrollment request sent successfully', data: enrollment });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  public requestRegular = async (req: Request, res: Response) => {
    try {
      const enrollmentData = req.body;
      const enrollment = await this.courseEnrollmentService.requestRegular(enrollmentData);
      res.status(201).json({ message: 'Regular enrollment request sent successfully', data: enrollment });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  @Get('/studentAllowedCourses/{studentId}')
  public getCoursesStudentAllowedToEnroll = async (req: Request, res: Response) => {
    const { studentId } = req.params;
    try {
      const courses = await this.courseEnrollmentService.getCoursesStudentAllowedToEnroll(studentId);
      res.status(200).json({ message: 'Courses student is allowed to enroll in retrieved successfully', data: courses });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
}

export default new CourseEnrollmentController();
