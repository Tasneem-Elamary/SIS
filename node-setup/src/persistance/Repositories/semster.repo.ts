import { SemesterType } from '../../types';

interface SemesterRepo {
    create(semester: SemesterType): Promise<SemesterType | undefined>;
    getById(id: string): Promise<SemesterType | undefined>;
    getAll(): Promise<SemesterType[] | undefined[]>;
    update(id: string, updatedData: Partial<SemesterType>): Promise<SemesterType | undefined>;
    delete(id: string): Promise<boolean>;
  }

export default SemesterRepo;
