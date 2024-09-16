import { Request, Response, NextFunction } from 'express';
import {
  Route, Get, Post, Put, Delete,
} from 'tsoa';
import { FacultyType } from '../types';
import { FacultyDataAccess } from '../persistance/postgresDBDataAccess';

@Route('Faculty')
class FacultyController {
  private faculty = new FacultyDataAccess();

  constructor() {

  }

  @Post()
  public create = async (req: Request, res: Response, next: NextFunction) => {
      const {
        facultyCode, name, location, phone, UniversityId,
      } = req.body;

      try {
        const faculty = await this.faculty.create({
          facultyCode,
          name,
          location,
          phone,
          UniversityId,
        });

        res.status(201).send({
          msg: 'Faculty created successfully',
          faculty,
        });
      } catch (e) {
        next(e);
      }
    };

  @Get('/{id}')
  public getById = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      try {
        const faculty = await this.faculty.getById(id);

        if (faculty) {
          res.send({
            msg: 'Faculty retrieved successfully',
            faculty,
          });
        } else {
          res.status(404).send({ msg: 'Faculty not found' });
        }
      } catch (e) {
        next(e);
      }
    };

  @Get('/code/{facultyCode}')
  public getByFacultyCode = async (req: Request, res: Response, next: NextFunction) => {
      const { facultyCode } = req.params;

      try {
        const faculty = await this.faculty.getByFacultyCode(facultyCode);

        if (faculty) {
          res.send({
            msg: 'Faculty retrieved successfully',
            faculty,
          });
        } else {
          res.status(404).send({ msg: 'Faculty not found' });
        }
      } catch (e) {
        next(e);
      }
    };

  @Get('/')
  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
      try {
        const faculties = await this.faculty.getAll();

        res.send({
          msg: 'Faculties retrieved successfully',
          faculties,
        });
      } catch (e) {
        next(e);
      }
    };

  @Put('/{id}')
  public update = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const updateData: Partial<FacultyType> = req.body;

      try {
        const updatedFaculty = await this.faculty.update(id, updateData);

        if (updatedFaculty) {
          res.send({
            msg: 'Faculty updated successfully',
            updatedFaculty,
          });
        } else {
          res.status(404).send({ msg: 'Faculty not found' });
        }
      } catch (e) {
        next(e);
      }
    };

  @Delete('/{id}')
  public delete = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      try {
        const success = await this.faculty.delete(id);

        if (success) {
          res.send({ msg: 'Faculty deleted successfully' });
        } else {
          res.status(404).send({ msg: 'Faculty not found' });
        }
      } catch (e) {
        next(e);
      }
    };
}

export default new FacultyController();
