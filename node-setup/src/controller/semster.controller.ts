import { NextFunction, Request, Response } from 'express';
import { Get, Route } from 'tsoa';
import { hashPassword, isPasswordValid } from '../util/hashing';
import { signUser } from '../util/auth.util';
import { Semster } from '../services';
import { ISemster } from '../services/interfaces';
import { DataAccess } from '../persistance';
import { SemesterType } from '../types';
import { UserRepo } from '../persistance/Repositories';

// Assuming CourseDataAccess and UserDataAccess are part of DataAccess
const { SemesterDataAccess } = DataAccess;

class SemsterController {
  private semster: ISemster;

  constructor() {
    const semesterDataAccess = new SemesterDataAccess();
    this.semster = new Semster(semesterDataAccess);
  }

  createSemester = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;

      const newSemester = await this.semster.createSemester(body);

      if (!newSemester) {
        res.status(500).json({ message: 'Failed to create semester' });
      }

      res.status(201).json({ message: 'Semester created successfully', newSemester });
    } catch (e) {
      next(e);
    }
  };

  getCurrentSemester = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentSemester = await this.semster.getCurrentSemester();

      if (!currentSemester) {
        res.status(404).json({ message: 'Semester not found' });
      }

      res.status(200).json({ message: 'done', currentSemester });
    } catch (e) {
      next(e);
    }
  };

  updateSemester = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedData: Partial<SemesterType> = req.body;

      const updatedSemester = await this.semster.updateSemester(id, updatedData);

      if (!updatedSemester) {
        res.status(404).json({ message: 'Semester not found' });
      }

      res.status(200).json({ message: 'Semester updated successfully', updatedSemester });
    } catch (e) {
      next(e);
    }
  };

  deleteSemester = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedSemester = await this.semster.deleteSemester(id);

      if (!deletedSemester) {
        res.status(404).json({ message: 'Semester not found' });
      }

      res.status(200).json({ message: 'Semester deleted successfully' });
    } catch (e) {
      next(e);
    }
  };
}

export default new SemsterController();
