import { NextFunction, Request, Response } from 'express';
import { Get, Route } from 'tsoa';
import { hashPassword, isPasswordValid } from '../util/hashing';
import { signUser } from '../util/auth.util';
import { Instructor } from '../services';
import { IInstuctor } from '../services/interfaces';
import { DataAccess } from '../persistance';
import { UserType, InstructorType } from '../types';
import { UserRepo } from '../persistance/Repositories';

const { UserDataAccess, InstructorDataAccess } = DataAccess;

class InstructorController {
  private instructor: Instructor;

  constructor() {
    const userDataAccess = new UserDataAccess();
    const instructorDataAccess = new InstructorDataAccess();
    this.instructor = new Instructor(userDataAccess, instructorDataAccess);
  }

  viewprofile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const instructor = await this.instructor.viewProfile(id);

      if (!instructor) {
        res.status(404).json({ message: 'Instructor not found' });
      }

      res.status(200).json({ instructor });
    } catch (e) {
      next(e);
    }
  };

  editprofile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedData: Partial<InstructorType> = req.body;
      console.log(updatedData);

      const updatedInstructor = await this.instructor.editProfile(id, updatedData);

      if (!updatedInstructor) {
        res.status(404).json({ message: 'Instructor not found' });
      }

      res.status(200).json({ message: 'Instructor updated', updatedInstructor });
    } catch (e) {
      next(e);
    }
  };

}

export default new InstructorController();
