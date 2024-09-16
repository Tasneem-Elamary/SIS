import {
  UniversityType,
} from '../../types';

     interface universityRepo {

        createUniversity(university: UniversityType): Promise<UniversityType | undefined>;
        getUniversityById(id: string): Promise<UniversityType | undefined>;
        getUniversityByCode(code: string): Promise<UniversityType | undefined>;
        getAllUniversities(): Promise<UniversityType[] | undefined[]>;
        updateUniversity(id: string, updatedData: Partial<UniversityType>): Promise<UniversityType | undefined>;
        deleteUniversity(id: string): Promise<boolean>;

       }
export default universityRepo;
