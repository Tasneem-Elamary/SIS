import {
  FacultyType,
} from '../../types';

    interface facultyRepo {

        createFaculty(faculty: FacultyType): Promise<FacultyType | undefined>;
        getFacultyById(id: string): Promise<FacultyType | undefined>;
        getFacultyByCode(code: string): Promise<FacultyType | undefined>;
        getAllFaculties(): Promise<FacultyType[] | undefined[]>;
        updateFaculty(id: string, updatedData: Partial<FacultyType>): Promise<FacultyType | undefined>;
        deleteFaculty(id: string): Promise<boolean>;

      }
export default facultyRepo;
