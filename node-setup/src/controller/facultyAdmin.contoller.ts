import { NextFunction, Request, Response } from 'express';
import { Get, Route } from 'tsoa';
import { hashPassword, isPasswordValid } from '../util/hashing';
import { signUser } from '../util/auth.util';
import { FacultyAdmin } from '../services';
import { IfacultyAdmin } from '../services/interfaces';
import { DataAccess } from '../persistance';
import {
  UserType, InstructorType, CourseType, DepartmentType,
} from '../types';
import { UserRepo } from '../persistance/Repositories';

const {
  UserDataAccess, InstructorDataAccess, CourseDataAcces, DepartmentDataAccess, FacultyDataAccess,
} = DataAccess;

@Route('user')
class FacultyAdminController {
  private facultyAdmin: IfacultyAdmin;

  constructor() {
    const userDataAccess = new UserDataAccess();
    const instructorDataAccess = new InstructorDataAccess();
    const courseDataAcces = new CourseDataAcces();
    const departmentDataAccess = new DepartmentDataAccess();
    const facultyAdmin = new FacultyAdmin(userDataAccess, instructorDataAccess, courseDataAcces, departmentDataAccess);
    this.facultyAdmin = facultyAdmin;
  }

  createInstructor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      console.log(body);

      const user: UserType = {
        email: body.email,
        password: hashPassword(body.password),
        role: body.role,

      };

      // Assuming these are the instructor-specific fields
      const instructor: Partial<InstructorType> = {
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        type: body.type,
        employmentType: body.employmentType,

        // Add other instructor-specific fields as necessary
      };
      const newInstructor = await this.facultyAdmin.createInstructor(user, instructor);

      res.status(201).json({ message: 'done', newInstructor });
    } catch (e) {
      next(e);
    }
  };

  getInstructorById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const instructor = await this.facultyAdmin.getInstructorById(id);

      if (!instructor) {
        res.status(404).json({ message: 'Instructor not found' });
      }

      res.status(200).json({ instructor });
    } catch (e) {
      next(e);
    }
  };

  getInstructorByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.params;

      const instructor = await this.facultyAdmin.getInstructorByEmail(email);

      if (!instructor) {
        res.status(404).json({ message: 'Instructor not found' });
      }

      res.status(200).json({ instructor });
    } catch (e) {
      next(e);
    }
  };

  getAllInstructors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const instructors = await this.facultyAdmin.getAllInstructors();
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

      const updatedInstructor = await this.facultyAdmin.updateInstructor(id, updatedData);

      if (!updatedInstructor) {
        res.status(404).json({ message: 'Instructor not found' });
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

      const deletedInstructor = await this.facultyAdmin.deleteInstructor(id);

      if (!deletedInstructor) {
        res.status(404).json({ message: 'Instructor not found' });
      }

      res.status(200).json({ message: 'Instructor deleted' });
    } catch (e) {
      next(e);
    }
  };

  createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;

      const newCourse = await this.facultyAdmin.createCourse(body);

      if (!newCourse) {
        res.status(500).json({ message: 'Failed to create course' });
      }

      res.status(201).json({ message: 'Course created successfully', newCourse });
    } catch (e) {
      next(e);
    }
  };

  // Update course
  updateCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedData: Partial<CourseType> = req.body;

      const updatedCourse = await this.facultyAdmin.updateCourse(id, updatedData);

      if (!updatedCourse) {
        res.status(404).json({ message: 'Course not found' });
      }

      res.status(200).json({ message: 'Course updated successfully', updatedCourse });
    } catch (e) {
      next(e);
    }
  };

  // Delete course
  deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedCourse = await this.facultyAdmin.deleteCourse(id);

      if (!deletedCourse) {
        res.status(404).json({ message: 'Course not found' });
      }

      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (e) {
      next(e);
    }
  };

  createDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      console.log(body);

      const newDepartment = await this.facultyAdmin.createDepartment(body);

      res.status(201).json({ message: 'Department created successfully', newDepartment });
    } catch (e) {
      next(e);
    }
  };

  // Get Department by ID
  getDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const department = await this.facultyAdmin.getDepartmentById(id);

      if (!department) {
        res.status(404).json({ message: 'Department not found' });
      }

      res.status(200).json({ department });
    } catch (e) {
      next(e);
    }
  };

  // Get Department by Code
  getDepartmentByCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.params;

      const department = await this.facultyAdmin.getDepartmentByCode(code);

      if (!department) {
        res.status(404).json({ message: 'Department not found' });
      }

      res.status(200).json({ department });
    } catch (e) {
      next(e);
    }
  };

  // Get All Departments
  getAllDepartments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const departments = await this.facultyAdmin.getAllDepartments();
      res.status(200).json({ departments });
    } catch (e) {
      next(e);
    }
  };

  // Update Department
  updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedData: Partial<DepartmentType> = req.body;
      console.log(updatedData);

      const updatedDepartment = await this.facultyAdmin.updateDepartment(id, updatedData);

      if (!updatedDepartment) {
        res.status(404).json({ message: 'Department not found' });
      }

      res.status(200).json({ message: 'Department updated successfully', updatedDepartment });
    } catch (e) {
      next(e);
    }
  };

  // Delete Department
  deleteDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedDepartment = await this.facultyAdmin.deleteDepartment(id);

      if (!deletedDepartment) {
        res.status(404).json({ message: 'Department not found' });
      }

      res.status(200).json({ message: 'Department deleted successfully' });
    } catch (e) {
      next(e);
    }
  };
}
export default new FacultyAdminController();
