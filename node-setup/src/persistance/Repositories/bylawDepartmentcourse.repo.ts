import { BylawDepartmentCourseType } from '../../types';

interface BylawDepartmentCourseRepo {
  // Method to create a new bylaw
  create(bylawId:string, departmentId:string, courseId: string): Promise<void | undefined>;

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
