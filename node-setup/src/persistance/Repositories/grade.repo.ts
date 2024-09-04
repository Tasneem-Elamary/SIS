import { GradeType } from '../../types';

interface GradesRepo {
    create(grade: GradeType): Promise<GradeType | undefined>;
    getById(id: string): Promise<GradeType | undefined>;
    getAll(): Promise<GradeType[] | undefined[]>;
    update(id: string, updatedData: Partial<GradeType>): Promise<GradeType | undefined>;
    delete(id: string): Promise<boolean>;
  }

export default GradesRepo;
