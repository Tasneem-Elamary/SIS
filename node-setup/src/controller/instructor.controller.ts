import { NextFunction, Request, Response } from 'express';
import { Get, Route } from 'tsoa';
import { hashPassword, isPasswordValid } from '../util/hashing';
import { signUser } from '../util/auth.util';
import { Instructor } from '../services';
import { IInstuctor } from '../services/interfaces';
import { DataAccess } from '../persistance';
import { UserType, InstructorType } from '../types';
import { UserRepo } from '../persistance/Repositories';

const { UserDataAccess, InstructorDataAccess ,ResultDataAccess} = DataAccess;

class InstructorController {
  private instructor: Instructor;

  constructor() {
    const userDataAccess = new UserDataAccess();
    const instructorDataAccess = new InstructorDataAccess();
    const resultDataAcess= new ResultDataAccess ();
    this.instructor = new Instructor(userDataAccess, instructorDataAccess,resultDataAcess);
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

  getStudentsByAdvisor = async (req: Request, res: Response): Promise<void> => {
    const { instructorId } = req.params;

    try {
      const students = await this.instructor.getStudentsByAdvisor(instructorId); // Call service method
      res.status(200).json(students);
    } catch (error) {
      console.error('Error fetching students for advisor:', error);
      res.status(500).json({ message: 'Failed to get students for the advisor' });
    }
  };
  uploadStudentsResults= async(req: Request, res: Response): Promise<void> =>{
    try {
      const results = req.body; // Assuming body contains parsed CSV data
      const createdResults = await this.instructor.uploadResults(results);
      res.status(201).json(createdResults);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create results' });
    }
  }
   updateResultById=async(req: Request, res: Response): Promise<void> =>{
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedResult = await this.instructor.updateResultbyId(id, updatedData);
      res.status(200).json(updatedResult);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the result' });
    }
  }
}

export default new InstructorController();
