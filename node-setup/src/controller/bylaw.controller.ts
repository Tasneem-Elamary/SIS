import { NextFunction, Request, Response } from 'express';
import {
  Route, Get, Post, Put, Delete,
} from 'tsoa';
import {
  BylawType, BylawCourseType, BylawRuleType, GradeType,
} from '../types';
import BylawService from '../services/bylaw.service';
import { DataAccess } from '../persistance';
import IBylaw from '../services/interfaces/IBylaw';
import BylawRuleService from '../services/bylawRule.service';
import BylawRuleDataAccess from '../persistance/postgresDBDataAccess/bylawRules.data';
import { GradesDataAccess } from '../persistance/postgresDBDataAccess';

const { BylawDataAccess } = DataAccess;
const GradesData = new GradesDataAccess();
@Route('Bylaw')
class BylawController {
  private bylaw: IBylaw;

  private bylawRule:BylawRuleService;

  constructor() {
    const bylawDataAccess = new BylawDataAccess();
    const bylawRuleDataAccess = new BylawRuleDataAccess();
    this.bylaw = new BylawService(bylawDataAccess, GradesData);
    this.bylawRule = new BylawRuleService(bylawRuleDataAccess);
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
          return res.status(404).send({ msg: 'Bylaw not found' });
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
          return res.status(404).send({ msg: 'Bylaw limits not found' });
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
          return res.status(404).send({ msg: 'Bylaw not found' });
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
          return res.status(404).send({ msg: 'Bylaw not found' });
        }
      } catch (e) {
        next(e);
      }
    };

    @Post('/{bylawId}/rules')
  public createBylawRules = async (req: Request, res: Response, next: NextFunction) => {
        const { bylawId } = req.params;
        const rules: Partial<BylawRuleType>[] = req.body;

        try {
          const createdRules = await this.bylawRule.createBylawRules(bylawId, rules);
          if (createdRules && createdRules.length > 0) {
            res.status(201).send({
              msg: 'Bylaw rules created successfully',
              createdRules,
            });
          } else {
            res.status(400).send({
              msg: 'Failed to create bylaw rules. No valid rules provided.',
            });
          }
        } catch (e) {
          next(e);
        }
      };

      @Post('/{bylawId}/grades')
    public createBylawGrades = async (req: Request, res: Response, next: NextFunction) => {
          const { bylawId } = req.params;
          const grades: Partial<GradeType>[] = req.body;

          try {
            const createdGrades = await this.bylaw.createBylawGrades(bylawId, grades);
            if (createdGrades && createdGrades.length > 0) {
              res.status(201).send({
                message: 'Bylaw Grade schema created successfully',
                createdGrades,
              });
            } else {
              res.status(400).send({
                message: 'Failed to create bylaw grade schema. No valid rules provided.',
              });
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

    @Get('/{id}/notInCourses')
  public getCoursesNotInBylaw = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
          const courses = await this.bylaw.getCoursesNotInBylaw(id);
          if (courses) {
            res.send({
              msg: 'Courses retrieved successfully',
              courses,
            });
          } else {
            res.status(404).send({ msg: 'Courses not found' });
          }
        } catch (e) {
          next(e);
        }
      };
}

export default new BylawController();
