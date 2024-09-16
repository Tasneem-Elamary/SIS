import { SemesterType } from '../../types';

export interface ISemester{
    createSemester(semester: SemesterType): Promise<SemesterType>;
    getSemesterById(id: string): Promise<SemesterType | null>;
    getSemesterBySeason(season: 'Winter' | 'Spring' | 'Fall' | 'Summer'): Promise<SemesterType | null>;
    updateSemester(id: string, semester: Partial<SemesterType>): Promise<void>;
    deleteSemester(id: string): Promise<void>;
}
