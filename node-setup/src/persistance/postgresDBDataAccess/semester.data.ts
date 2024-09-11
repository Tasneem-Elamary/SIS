import { Semester } from '../../models';
import { SemesterType } from '../../types';
import { SemesterRepo } from '../Repositories/semester.repo';

export class SemesterDataAccess implements SemesterRepo {
  async create(semester: SemesterType): Promise<SemesterType> {
    const createdSemester = await Semester.create(semester);
    return createdSemester.toJSON();
  }

  async getById(id: string): Promise<SemesterType | null> {
    const semester = await Semester.findByPk(id);
    return semester ? semester.toJSON() : null;
  }

  async getBySeason(season: 'Winter' | 'Spring' | 'Fall' | 'Summer'): Promise<SemesterType | null> {
    const semester = await Semester.findOne({ where: { season } });
    return semester ? semester.toJSON() : null;
  }

  async update(id: string, semester: Partial<SemesterType>): Promise<void> {
    await Semester.update(semester, { where: { id } });
  }

  async delete(id: string): Promise<void> {
    await Semester.destroy({ where: { id } });
  }
}
