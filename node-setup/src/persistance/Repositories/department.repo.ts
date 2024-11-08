import { DepartmentType } from '../../types';

interface DepartmentRepo {
  create(department:DepartmentType): Promise<DepartmentType | undefined>;
  getById(id: string): Promise<DepartmentType | undefined>;
  getBydepartmentCode (departmentCode: string): Promise<DepartmentType | undefined>
  getAllDepartments (): Promise<DepartmentType[] | undefined[]>
  getAllDepartmentsByFacultId(FacultyId: string): Promise<DepartmentType[]|undefined[]>;
  update(id: string, updatedData: Partial<DepartmentType>): Promise<DepartmentType | undefined>;
  delete(id: string): Promise<boolean>;
}
export default DepartmentRepo;
