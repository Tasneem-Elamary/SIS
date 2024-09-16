import models from '../../models';
import { DepartmentRepo } from '../Repositories';
import { DepartmentType } from '../../types';

class DepartmentData implements DepartmentRepo {
  create = async (department: DepartmentType): Promise<DepartmentType | undefined> => {
    try {
      const newDepartment = await models.Department.create(department);
      return newDepartment ? (newDepartment.get() as DepartmentType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create the department, please try again!');
    }
  };

  getById = async (id: string): Promise<DepartmentType | undefined> => {
    try {
      const department = await models.Department.findOne({ where: { id } });
      return department ? (department.get() as DepartmentType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the department, please try again!');
    }
  };

  getBydepartmentCode = async (departmentCode: string): Promise<DepartmentType | undefined> => {
    try {
      const department = await models.Department.findOne({ where: { departmentCode } });
      return department ? (department.get() as DepartmentType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the department by code, please try again!');
    }
  };

  getAllDepartmentsByFacultId = async (FacultyId: string): Promise<DepartmentType[] | undefined[]> => {
    try {
      const departments = await models.Department.findAll({ where: { FacultyId } });
      return departments.map((department) => department.get() as DepartmentType);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve departments, please try again!');
    }
  };

  update = async (id: string, updates: Partial<DepartmentType>): Promise<DepartmentType | undefined> => {
    try {
      const department = await models.Department.findOne({ where: { id } });
      if (department) {
        await department.update(updates);
        return department.get() as DepartmentType;
      }
      return undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update the department, please try again!');
    }
  };

  delete = async (id: string): Promise<boolean> => {
    try {
      const result = await models.Department.destroy({ where: { id } });
      return result > 0;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete the department, please try again!');
    }
  };
}

export default DepartmentData;
