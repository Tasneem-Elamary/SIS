import { NextFunction, Request, Response } from 'express';
import { Get, Route } from 'tsoa';
import { hashPassword, isPasswordValid } from '../util/hashing';
import { signUser } from '../util/auth.util';
import { FacultyAdmin } from '../services';
import { IfacultyAdmin, IUniversityAdmin } from '../services/interfaces';
import { DataAccess } from '../persistance';
import {
  UserType, InstructorType, CourseType, DepartmentType, StudentAdvisorType, GradeType, SemesterType, FacultyType, UniversityType,
} from '../types';
import { UserRepo } from '../persistance/Repositories';
import { UniversityDataAccess } from '../persistance/postgresDBDataAccess';
import UniversityAdmin from '../services/universityAdmin.service';
// import { DataAccess } from '../persistance/postgresDBDataAccess';

const {
  UserDataAccess, InstructorDataAccess, CourseDataAcces, DepartmentDataAccess, FacultyDataAccess, GradesDataAccess, SemesterDataAccess,
} = DataAccess;

class FacultyAdminController {
  private universityAdmin: IUniversityAdmin;

  constructor() {
    const userDataAccess = new UserDataAccess();
    const instructorDataAccess = new InstructorDataAccess();
    const courseDataAcces = new CourseDataAcces();
    const departmentDataAccess = new DepartmentDataAccess();
    const gradeDataAccess = new GradesDataAccess();
    const semesterDataAccess = new SemesterDataAccess();
    const facultyDataAccess = new FacultyDataAccess();
    const universityDataAccess = new UniversityDataAccess();
    this.universityAdmin = new UniversityAdmin(
      userDataAccess,
      instructorDataAccess,
      courseDataAcces,
      departmentDataAccess,
      gradeDataAccess,
      semesterDataAccess,
      facultyDataAccess,
      universityDataAccess,
    );
  }

  createFaculty = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      console.log(body);

      const newFaculty = await this.universityAdmin.createFaculty(body);

      res.status(201).json({ message: 'Faculty created successfully', newFaculty });
    } catch (e) {
      next(e);
    }
  };

  // Get Faculty by ID
  getFacultyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const faculty = await this.universityAdmin.getFacultyById(id);

      if (!faculty) {
        res.status(404).json({ message: 'Faculty not found' });
      }

      res.status(200).json({ faculty });
    } catch (e) {
      next(e);
    }
  };

  // Get Faculty by Code
  getFacultyByCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.params;

      const faculty = await this.universityAdmin.getFacultyByCode(code);

      if (!faculty) {
        res.status(404).json({ message: 'Faculty not found' });
      }

      res.status(200).json({ faculty });
    } catch (e) {
      next(e);
    }
  };

  // Get All Faculties
  getAllFaculties = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const faculties = await this.universityAdmin.getAllFaculties();
      res.status(200).json({ faculties });
    } catch (e) {
      next(e);
    }
  };

  // Update Faculty
  updateFaculty = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedData: Partial<FacultyType> = req.body;
      console.log(updatedData);

      const updatedFaculty = await this.universityAdmin.updateFaculty(id, updatedData);

      if (!updatedFaculty) {
        res.status(404).json({ message: 'Faculty not found' });
      }

      res.status(200).json({ message: 'Faculty updated successfully', updatedFaculty });
    } catch (e) {
      next(e);
    }
  };

  // Delete Faculty
  deleteFaculty = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedFaculty = await this.universityAdmin.deleteFaculty(id);

      if (!deletedFaculty) {
        res.status(404).json({ message: 'Faculty not found' });
      }

      res.status(200).json({ message: 'Faculty deleted successfully' });
    } catch (e) {
      next(e);
    }
  };

  createUniversity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      console.log(body);

      const newUniversity = await this.universityAdmin.createUniversity(body);

      res.status(201).json({ message: 'University created successfully', newUniversity });
    } catch (e) {
      next(e);
    }
  };

  // Get University by ID
  getUniversityById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const university = await this.universityAdmin.getUniversityById(id);

      if (!university) {
        res.status(404).json({ message: 'University not found' });
      }

      res.status(200).json({ university });
    } catch (e) {
      next(e);
    }
  };

  // Get University by Code
  getUniversityByCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.params;

      const university = await this.universityAdmin.getUniversityByCode(code);

      if (!university) {
        res.status(404).json({ message: 'University not found' });
      }

      res.status(200).json({ university });
    } catch (e) {
      next(e);
    }
  };

  // Get All Universities
  getAllUniversities = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const universities = await this.universityAdmin.getAllUniversities();
      res.status(200).json({ universities });
    } catch (e) {
      next(e);
    }
  };

  // Update University
  updateUniversity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedData: Partial<UniversityType> = req.body;
      console.log(updatedData);

      const updatedUniversity = await this.universityAdmin.updateUniversity(id, updatedData);

      if (!updatedUniversity) {
        res.status(404).json({ message: 'University not found' });
      }

      res.status(200).json({ message: 'Universityupdated successfully', updatedUniversity });
    } catch (e) { next(e); }
  };

  // Delete University

  deleteUniversity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deletedUniversity = await this.universityAdmin.deleteUniversity(id);

      if (!deletedUniversity) {
        res.status(404).json({ message: 'University not found' });
      }

      res.status(200).json({ message: 'University deleted successfully' });
    } catch (e) {
      next(e);
    }
  };
}
