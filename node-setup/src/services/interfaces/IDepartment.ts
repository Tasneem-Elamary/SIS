import { DepartmentType } from '../../types';

interface departmentRepo {
    createDepartment(department: DepartmentType): Promise<DepartmentType | undefined>;
getDepartmentById(id: string): Promise<(DepartmentType) | undefined>;
getDepartmentByCode(code: string): Promise<DepartmentType | undefined>;
getAllDepartmentsByFacultId(FacultyId: string): Promise<(DepartmentType)[] | undefined[]>;
getAllDepartments(): Promise<DepartmentType[] | undefined[]>
updateDepartment(id: string, updatedData: Partial<DepartmentType>): Promise<DepartmentType | undefined>;
deleteDepartment(id: string): Promise<boolean>;
}

export default departmentRepo;
