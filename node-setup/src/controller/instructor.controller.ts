import { NextFunction, Request, Response } from 'express';
import { Get, Route } from 'tsoa';
import { hashPassword, isPasswordValid } from '../util/hashing';
import { signUser } from '../util/auth.util';
import { Instructor } from '../services';
import { IInstuctor } from '../services/interfaces';
import { DataAccess } from '../persistance';
import { UserType, InstructorType, ResultType } from '../types';
import { UserRepo } from '../persistance/Repositories';

import { passwordGenerator } from '../util/passwordGenerator';
import { DepartmentDataAccess } from '../persistance/postgresDBDataAccess';

const { UserDataAccess, InstructorDataAccess, ResultDataAccess } = DataAccess;

class InstructorController {
  private instructor: Instructor;

  constructor() {
    const userDataAccess = new UserDataAccess();
    const instructorDataAccess = new InstructorDataAccess();
    const resultDataAcess = new ResultDataAccess();
    const departmentDataAccess = new DepartmentDataAccess();
    this.instructor = new Instructor(userDataAccess, instructorDataAccess, resultDataAcess, departmentDataAccess);
  }

  createInstructor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      console.log(body);

      const password = passwordGenerator();

      const user: UserType = {
        email: body.email,
        password: hashPassword(password),
        role: body.role,

      };

      // Assuming these are the instructor-specific fields
      const instructor: Partial<InstructorType> = {
        firstName: body.firstName,
        lastName: body.lastName,
        birthDate: body.birthDate,
        gender: body.gender,
        type: body.type,
        employmentType: body.employmentType,
        DepartmentId: body.DepartmentCode,

        // Add other instructor-specific fields as necessary
      };
      const newInstructor = await this.instructor.createInstructor(user, instructor);

      res.status(201).json({ message: 'done', newInstructor });
    } catch (e) {
      next(e);
    }
  };

  getInstructorById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const instructor = await this.instructor.getInstructorById(id);

      if (!instructor) {
        return res.status(404).json({ message: 'Instructor not found' });
      }

      res.status(200).json({ message: 'done', instructor });
    } catch (e) {
      next(e);
    }
  };

  getInstructorByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.params;

      const instructor = await this.instructor.getInstructorByEmail(email);

      if (!instructor) {
        return res.status(404).json({ message: 'Instructor not found' });
      }

      res.status(200).json({ message: 'done', instructor });
    } catch (e) {
      next(e);
    }
  };

  getAllInstructors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const instructors = await this.instructor.getAllInstructors();
      res.status(200).json({ message: 'done', instructors });
    } catch (e) {
      next(e);
    }
  };

  getAllTAs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const instructors = await this.instructor.getAllTAs();
      res.status(200).json({ message: 'done', instructors });
    } catch (e) {
      next(e);
    }
  };

  getAllDoctors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const instructors = await this.instructor.getAllDoctors();
      res.status(200).json({ message: 'done', instructors });
    } catch (e) {
      next(e);
    }
  };

  // Update instructor
  updateInstructor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedData: Partial<InstructorType> = req.body;
      console.log(updatedData);

      const updatedInstructor = await this.instructor.updateInstructor(id, updatedData);

      if (!updatedInstructor) {
        return res.status(404).json({ message: 'Instructor not found' });
      }

      res.status(200).json({ message: 'Instructor updated', updatedInstructor });
    } catch (e) {
      next(e);
    }
  };

  // Delete instructor
  deleteInstructor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedInstructor = await this.instructor.deleteInstructor(id);

      if (!deletedInstructor) {
        return res.status(404).json({ message: 'Instructor not found' });
      }

      res.status(200).json({ message: 'Instructor deleted' });
    } catch (e) {
      next(e);
    }
  };

  getAdvisedStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { instructorId } = req.params;

    try {
      const instuctor = await this.instructor.getadvisorStudents(instructorId); // Call service method
      res.status(200).json({ message: 'done', instuctor });
    } catch (error) {
      console.error('Error fetching students for advisor:', error);
      next(error);
    }
  };

  AdviseStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { instructorId, studentId } = req.params;
    try {
      await this.instructor.AdviseStudent(instructorId, studentId); // Call service method
      res.status(201).json({ message: 'Student added to advisor successfully' });
    } catch (error) {
      console.error('Error adding student to advisor:', error);
      res.status(500).json({ message: 'Failed to add student to advisor' });
    }
  };

  // Method to remove a student from an advisor
  deleteAdvisedStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { instructorId, studentId } = req.params;

    try {
      await this.instructor.deleteAdvisedStudent(studentId, instructorId); // Call service method
      res.status(200).json({ message: 'Student removed from advisor successfully' });
    } catch (error) {
      console.error('Error removing student from advisor:', error);
      res.status(500).json({ message: 'Failed to remove student from advisor' });
    }
  };

  // Method to update a student-advisor relationship
  updateAdvisedStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { instructorId, studentId } = req.params;
    const { newInstructorId } = req.body;

    try {
      await this.instructor.updateAdvisedStudent(instructorId, studentId, newInstructorId); // Call service method
      res.status(200).json({ message: 'Student-advisor relationship updated successfully' });
    } catch (error) {
      console.error('Error updating student-advisor relationship:', error);
      res.status(500).json({ message: 'Failed to update student-advisor relationship' });
    }
  };

  getListOfPendingStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { instructorId } = req.params;

    try {
      const instuctor = await this.instructor.getListOfPendingStudents(instructorId); // Call service method
      res.status(200).json({ message: 'done', instuctor });
    } catch (error) {
      console.error('Error fetching students for advisor:', error);
      res.status(500).json({ message: 'Failed to get pending students for the advisor' });
    }
  };

  getSelfStudyOROverloadPendingStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { instructorId, enrollmentType } = req.params;

    try {
      const instuctor = await this.instructor.getSelfStudyOROverloadPendingStudents(instructorId, enrollmentType); // Call service method
      res.status(200).json({ message: 'done', instuctor });
    } catch (error) {
      console.error('Error fetching students for advisor:', error);
      res.status(500).json({ message: 'Failed to get pending students for the advisor' });
    }
  };

  getDistinctCoursesByInstructor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { instructorId } = req.params;

    try {
      const instructor = await this.instructor.getDistinctCoursesByProfessor(instructorId); // Call service method
      res.status(200).json({ message: 'done', instructor });
    } catch (error) {
      console.error('Error fetching students for advisor:', error);
      res.status(500).json({ message: 'Failed to get pending students for the advisor' });
    }
  };
}

export default new InstructorController();
