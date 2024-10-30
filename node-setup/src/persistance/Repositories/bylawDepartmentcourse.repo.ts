import { BylawDepartmentCourseType } from '../../types';

interface BylawDepartmentCourseRepo {
  // Method to create a new bylaw
  create (DepartmentId: string | null, CourseId: string, BylawId:string): Promise<BylawDepartmentCourseType | undefined>
  getAll ():Promise<BylawDepartmentCourseType[] | undefined[]>
  getAllByCourseLevel (courseLevel: number): Promise<BylawDepartmentCourseType[] | undefined[]>
  delete (DepartmentId: string | null, CourseId: string, BylawId: string): Promise<boolean>
//   // Method to find a bylaw by code
//   getByCode(code: string): Promise<BylawType | undefined>;

//   // Method to find a bylaw by ID
//   getById(id: string): Promise<BylawType | undefined>;

//   // Method to update an existing bylaw
//   update(id: string, updateData: Partial<BylawType>): Promise<BylawType | undefined>;

//   // Method to delete an existing bylaw
//   delete(id: string): Promise<boolean>;
}

export default BylawDepartmentCourseRepo;
