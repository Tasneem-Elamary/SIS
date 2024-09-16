import { NextFunction, Request, Response } from 'express';
import {
  Route, Get, Post, Put, Delete,
} from 'tsoa';
import { CourseEnrollmentType } from '../types';
import CourseEnrollmentService from '../services/courseEnrollment.service';
import { DataAccess } from '../persistance';
import ICourseEnrollment from '../services/interfaces/ICourseEnrollment';

const { CourseEnrollmentDataAccess } = DataAccess;

@Route('CourseEnrollment')
class CourseEnrollmentController {
  private courseEnrollmentService: ICourseEnrollment;

  constructor() {
    const courseEnrollmentDataAccess = new CourseEnrollmentDataAccess();
    this.courseEnrollmentService = new CourseEnrollmentService(courseEnrollmentDataAccess);
  }

  @Post()
  public create = async (req: Request, res: Response, next: NextFunction) => {
      const enrollmentData: CourseEnrollmentType = req.body;
      try {
        const enrollment = await this.courseEnrollmentService.create(enrollmentData);
        res.status(201).send({
          msg: 'Course enrollment created successfully',
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
          res.send({
            msg: 'Course enrollment retrieved successfully',
            enrollment,
          });
        } else {
          res.status(404).send({ msg: 'Course enrollment not found' });
        }
      } catch (e) {
        next(e);
      }
    };

  @Get('/')
  public getAll = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const enrollments = await this.courseEnrollmentService.getAll();
        res.send({
          msg: 'Course enrollments retrieved successfully',
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
          res.send({
            msg: 'Course enrollment updated successfully',
            updatedEnrollment,
          });
        } else {
          res.status(404).send({ msg: 'Course enrollment not found' });
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
          res.send({ msg: 'Course enrollment deleted successfully' });
        } else {
          res.status(404).send({ msg: 'Course enrollment not found' });
        }
      } catch (e) {
        next(e);
      }
    };
}

export default new CourseEnrollmentController();
