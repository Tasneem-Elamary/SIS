import { UniversityType } from '../../types';

interface UniversityRepo {
  create(university: UniversityType): Promise<UniversityType | undefined>;
  getById(id: string): Promise<UniversityType | undefined>;
  getByUniversityCode(universityCode: string): Promise<UniversityType | undefined>;
  getAll(): Promise<UniversityType[] | undefined[]>;
  update(id: string, updatedData: Partial<UniversityType>): Promise<UniversityType | undefined>;
  delete(id: string): Promise<boolean>;
}

export default UniversityRepo;
