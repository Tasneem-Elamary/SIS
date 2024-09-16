import { NextFunction, Request, Response } from 'express';
import { Get, Route } from 'tsoa';
import { hashPassword, isPasswordValid } from '../util/hashing';
import { signUser } from '../util/auth.util';
import { Department } from '../services';
import { IDepartment } from '../services/interfaces';
import { DataAccess } from '../persistance';
import { DepartmentType } from '../types';

// Assuming CourseDataAccess and UserDataAccess are part of DataAccess
const { DepartmentDataAccess, BylawDataAccess, FacultyDataAccess } = DataAccess;

class DepartmentController {
  private department: IDepartment;

  constructor() {
    const departmentDataAccess = new DepartmentDataAccess();
    const bylawDataAccess = new BylawDataAccess();
    const facultDataAccess = new FacultyDataAccess();
    this.department = new Department(departmentDataAccess, facultDataAccess, bylawDataAccess);
  }

  createDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      console.log(body);

      const newDepartment = await this.department.createDepartment(body);

      res.status(201).json({ message: 'Department created successfully', newDepartment });
    } catch (e) {
      next(e);
    }
  };

  // Get Department by ID
  getDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const department = await this.department.getDepartmentById(id);

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

      const department = await this.department.getDepartmentByCode(code);

      if (!department) {
        res.status(404).json({ message: 'Department not found' });
      }

      res.status(200).json({ department });
    } catch (e) {
      next(e);
    }
  };

  // Get All Departments
  getAllDepartmentsByFacultId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { FacultyId } = req.params;
      const departments = await this.department.getAllDepartmentsByFacultId(FacultyId);
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

      const updatedDepartment = await this.department.updateDepartment(id, updatedData);

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

      const deletedDepartment = await this.department.deleteDepartment(id);

      if (!deletedDepartment) {
        res.status(404).json({ message: 'Department not found' });
      }

      res.status(200).json({ message: 'Department deleted successfully' });
    } catch (e) {
      next(e);
    }
  };
}

export default new DepartmentController();
