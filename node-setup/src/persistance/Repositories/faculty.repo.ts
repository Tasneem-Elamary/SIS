import { FacultyType } from '../../types';

interface FacultyRepo {
  create(faculty:FacultyType): Promise<FacultyType | undefined>;
  getById(id: string): Promise<FacultyType | undefined>;
  getByFacultyCode (facultyCode: string): Promise<FacultyType | undefined>
  getAll(): Promise<FacultyType[]|undefined[]>;
  update(id: string, updatedData: Partial<FacultyType>): Promise<FacultyType | undefined>;
  delete(id: string): Promise<boolean>;
}
export default FacultyRepo;
