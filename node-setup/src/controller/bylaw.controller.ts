import { NextFunction, Request, Response } from 'express';
import {
  Route, Get, Post, Put, Delete,
} from 'tsoa';
import { BylawType } from '../types';
import BylawService from '../services/bylaw.service';
import { DataAccess } from '../persistance';

const { BylawDataAccess } = DataAccess;

@Route('Bylaw')
class BylawController {
  private bylaw: BylawService;

  constructor() {
    const bylawDataAccess = new BylawDataAccess();
    this.bylaw = new BylawService(bylawDataAccess);
  }

  @Post()
  public create = async (req: Request, res: Response, next: NextFunction) => {
      const {
        code, year, credit_Hours, min_GPA, min_Hours,
      } = req.body;

      try {
        const bylaw = await this.bylaw.create({
          code,
          year,
          credit_Hours,
          min_GPA,
          min_Hours,
        });

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
        console.error('Error fetching data:', e);
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
}

export default new BylawController();
