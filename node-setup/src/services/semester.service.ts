import { SemesterRepo } from '../persistance/Repositories/semester.repo';
import { SemesterType } from '../types';
import { ISemester } from './interfaces/ISemester';

export class SemesterService implements ISemester {
  private semesterRepo: SemesterRepo;

  constructor(semesterRepo: SemesterRepo) {
    this.semesterRepo = semesterRepo;
  }

  async createSemester(semester: SemesterType): Promise<SemesterType> {
    return this.semesterRepo.create(semester);
  }

  async getSemesterById(id: string): Promise<SemesterType | null> {
    return this.semesterRepo.getById(id);
  }

  async getSemesterBySeason(season: 'Winter' | 'Spring' | 'Fall' | 'Summer'): Promise<SemesterType | null> {
    return this.semesterRepo.getBySeason(season);
  }

  async updateSemester(id: string, semester: Partial<SemesterType>): Promise<void> {
    await this.semesterRepo.update(id, semester);
  }

  async deleteSemester(id: string): Promise<void> {
    await this.semesterRepo.delete(id);
  }
}
