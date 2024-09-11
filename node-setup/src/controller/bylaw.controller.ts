import { NextFunction, Request, Response } from 'express';
import {
  Route, Get, Post, Put, Delete,
} from 'tsoa';
import { BylawType, BylawCourseType } from '../types';
import BylawService from '../services/bylaw.service';
import { DataAccess } from '../persistance';
import IBylaw from '../services/interfaces/IBylaw';

const { BylawDataAccess } = DataAccess;

@Route('Bylaw')
class BylawController {
  private bylaw: IBylaw;

  constructor() {
    const bylawDataAccess = new BylawDataAccess();
    this.bylaw = new BylawService(bylawDataAccess);
  }

  @Post()
  public create = async (req: Request, res: Response, next: NextFunction) => {
      const { ...body } = req.body;
      try {
        const bylaw = await this.bylaw.create(body);
        res.status(201).send({
          msg: 'Bylaw added successfully',
          bylaw,
        });
      } catch (e) {
        next(e);
      }
    };

  @Get('/{id}')
  public getById = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      try {
        const bylaw = await this.bylaw.getById(id);
        if (bylaw) {
          res.send({
            msg: 'Bylaw retrieved successfully',
            bylaw,
          });
        } else {
          res.status(404).send({ msg: 'Bylaw not found' });
        }
      } catch (e) {
        next(e);
      }
    };

  @Get('/limits/{id}')
  public getBylawLimits = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      try {
        const bylawLimits = await this.bylaw.getBylawLimits(id);
        if (bylawLimits) {
          res.send({
            message: 'Bylaw limits retrieved successfully',
            bylawLimits,
          });
        } else {
          res.status(404).send({ msg: 'Bylaw limits not found' });
        }
      } catch (e) {
        next(e);
      }
    };

  @Get('/code/{code}')
  public getByCode = async (req: Request, res: Response, next: NextFunction) => {
      const { code } = req.params;
      try {
        const bylaw = await this.bylaw.getByCode(code);
        if (bylaw) {
          res.send({
            msg: 'Bylaw retrieved successfully',
            bylaw,
          });
        } else {
          res.status(404).send({ msg: 'Bylaw not found' });
        }
      } catch (e) {
        next(e);
      }
    };

  @Get('/')
  public getAll = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const bylaws = await this.bylaw.getAll();
        res.send({
          msg: 'Bylaws retrieved successfully',
          bylaws,
        });
      } catch (e) {
        next(e);
      }
    };

  @Put('/{id}')
  public update = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const updateData: Partial<BylawType> = req.body;
      try {
        const updatedBylaw = await this.bylaw.update(id, updateData);
        if (updatedBylaw) {
          res.send({
            msg: 'Bylaw updated successfully',
            updatedBylaw,
          });
        } else {
          res.status(404).send({ msg: 'Bylaw not found' });
        }
      } catch (e) {
        next(e);
      }
    };

  @Delete('/{id}')
  public delete = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      try {
        const success = await this.bylaw.delete(id);
        if (success) {
          res.send({ msg: 'Bylaw deleted successfully' });
        } else {
          res.status(404).send({ msg: 'Bylaw not found' });
        }
      } catch (e) {
        next(e);
      }
    };

  @Post('/{bylawId}/course/{courseId}')
  public addCourseToBylaw = async (req: Request, res: Response, next: NextFunction) => {
      const { bylawId, courseId } = req.params;
      const { isElective } = req.body;
      try {
        const bylawCourse = await this.bylaw.addCourseToBylaw(bylawId, courseId, isElective);
        if (bylawCourse) {
          res.status(201).send({
            msg: 'Course added to bylaw successfully',
            bylawCourse,
          });
        } else {
          res.status(404).send({ msg: 'Failed to add course to bylaw' });
        }
      } catch (e) {
        next(e);
      }
    };

  @Get('/courses')
  public getAllBylawCourses = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const bylawCourses = await this.bylaw.getAllBylawCourses();
        res.send({
          msg: 'Bylaw courses retrieved successfully',
          bylawCourses,
        });
      } catch (e) {
        next(e);
      }
    };

  @Delete('/{bylawId}/course/{courseId}')
  public removeCourseFromBylaw = async (req: Request, res: Response, next: NextFunction) => {
      const { bylawId, courseId } = req.params;
      try {
        const success = await this.bylaw.removeCourseFromBylaw(bylawId, courseId);
        if (success) {
          res.send({ msg: 'Course removed from bylaw successfully' });
        } else {
          res.status(404).send({ msg: 'Failed to remove course from bylaw' });
        }
      } catch (e) {
        next(e);
      }
    };

  @Get('/{id}/courses')
  public getBylawCourses = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      try {
        const bylawCourses = await this.bylaw.getBylawCourses(id);
        if (bylawCourses) {
          res.send({
            msg: 'Bylaw courses retrieved successfully',
            bylawCourses,
          });
        } else {
          res.status(404).send({ msg: 'Bylaw courses not found' });
        }
      } catch (e) {
        next(e);
      }
    };
}

export default new BylawController();
