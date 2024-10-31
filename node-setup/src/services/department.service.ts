import User from './user.service';
import { IDepartment } from './interfaces';
import { BylawRepo, DepartmentRepo, FacultyRepo } from '../persistance/Repositories';
import {
  DepartmentType,
} from '../types';

class Department implements IDepartment {
  constructor(private departmentData:DepartmentRepo, private facultyData:FacultyRepo, private bylawData:BylawRepo) {
  }

  createDepartment = async (department: DepartmentType): Promise<DepartmentType | undefined> => {
    try {
      const faculty = await this.facultyData.getByFacultyCode(department.FacultyId as string);

      if (!faculty) {
        throw new Error('Faculty not found');
      }
      // const bylaw = await this.bylawData.getByCode(department.BylawId as string);

      // if (!bylaw) {
      //   throw new Error('Bylaw not found');
      // }
      const newdepartment = { ...department, FacultyId: faculty.id } as DepartmentType;
      const newDepartment = await this.departmentData.create(newdepartment);
      if (!newDepartment) {
        throw new Error('Failed to create department.');
      }

      return newDepartment;
    } catch {
      throw new Error('Failed to create department.');
    }
  };

  getDepartmentById = async (id: string): Promise<DepartmentType | undefined> => {
    try {
      const department = await this.departmentData.getById(id);

      return department;
    } catch {
      throw new Error('Failed to get the department.');
    }
  };

  // Method to get a department by code
  getDepartmentByCode = async (code: string): Promise<DepartmentType | undefined> => {
    try {
      const department = await this.departmentData.getBydepartmentCode(code);

      return department;
    } catch {
      throw new Error('Failed to get the department by code.');
    }
  };

  // Method to get all departments
  getAllDepartmentsByFacultId = async (FacultyId: string): Promise<DepartmentType[] | undefined[]> => {
    try {
      const departments = await this.departmentData.getAllDepartmentsByFacultId(FacultyId);

      return departments;
    } catch {
      throw new Error('Failed to get all departments.');
    }
  };

  getAllDepartments = async (): Promise<DepartmentType[] | undefined[]> => {
    try {
      const departments = await this.departmentData.getAllDepartments();

      return departments;
    } catch {
      throw new Error('Failed to get all departments.');
    }
  };

  // Method to update a department
  updateDepartment = async (id: string, updatedData: Partial<DepartmentType>): Promise<DepartmentType | undefined> => {
    try {
      const updatedDepartment = await this.departmentData.update(id, updatedData);

      return updatedDepartment;
    } catch {
      throw new Error('Failed to update the department.');
    }
  };

  // Method to delete a department
  deleteDepartment = async (id: string): Promise<boolean> => {
    try {
      const departmentDeleted = await this.departmentData.delete(id);

      if (!departmentDeleted) {
        throw new Error('Failed to delete the department.');
      }

      return true;
    } catch {
      throw new Error('Failed to delete the department.');
    }
  };
}

export default Department;
