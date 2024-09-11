import { SemesterType } from '../../types';

export interface SemesterRepo {
    create(semester: SemesterType): Promise<SemesterType>;
    getById(id: string): Promise<SemesterType | null>;
    getBySeason(season: 'Winter' | 'Spring' | 'Fall' | 'Summer'): Promise<SemesterType | null>;
    update(id: string, semester: Partial<SemesterType>): Promise<void>;
    delete(id: string): Promise<void>;
}
