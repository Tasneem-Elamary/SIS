import { NextFunction, Request, Response } from 'express';
import { Get, Route } from 'tsoa';
import { hashPassword, isPasswordValid } from '../util/hashing';
import { signUser } from '../util/auth.util';
import { Grade } from '../services';
import { IGrade } from '../services/interfaces';
import { DataAccess } from '../persistance';
import { GradeType } from '../types';
import { UserRepo } from '../persistance/Repositories';

// Assuming CourseDataAccess and UserDataAccess are part of DataAccess
const { GradesDataAccess } = DataAccess;

class GradeController {
  private grade: IGrade;

  constructor() {
    const gradeDataAccess = new GradesDataAccess();
    this.grade = new Grade(gradeDataAccess);
  }

  createGrade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;

      const newGrade = await this.grade.createGrade(body);

      if (!newGrade) {
        res.status(500).json({ message: 'Failed to create grade' });
      }

      res.status(201).json({ message: 'Grade created successfully', newGrade });
    } catch (e) {
      next(e);
    }
  };

  getAllGradesBylawId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { BylawId } = req.params;
      const grades = await this.grade.getAllGradesBylawId(BylawId);
      res.status(200).json({ grades });
    } catch (e) {
      next(e);
    }
  };

  // Update grade
  updateGrade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedData: Partial<GradeType> = req.body;

      const updatedGrade = await this.grade.updateGrade(id, updatedData);

      if (!updatedGrade) {
        res.status(404).json({ message: 'Grade not found' });
      }

      res.status(200).json({ message: 'Grade updated successfully', updatedGrade });
    } catch (e) {
      next(e);
    }
  };

  // Delete grade
  deleteGrade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedGrade = await this.grade.deleteGrade(id);

      if (!deletedGrade) {
        res.status(404).json({ message: 'Grade not found' });
      }

      res.status(200).json({ message: 'Grade deleted successfully' });
    } catch (e) {
      next(e);
    }
  };
}

export default new GradeController();
