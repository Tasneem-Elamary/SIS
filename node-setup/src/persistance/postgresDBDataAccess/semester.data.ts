import { Sequelize } from 'sequelize';
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

  async getCurrentSemester(): Promise<SemesterType | undefined> {
    try {
      const semester = await Semester.findOne({
        attributes: ['id', 'year', 'season'],
        order: [
          ['year', 'DESC'],
          [

            Sequelize.literal(`
              CASE 
                WHEN "season" = 'Winter' THEN 1
                WHEN "season" = 'spring' THEN 2
                WHEN "season" = 'summer' THEN 3
                WHEN "season" = 'fall' THEN 4
                ELSE 5
              END
            `),
            'ASC',
          ],
        ],
      });

      return semester ? (semester.get() as SemesterType) : undefined;
    } catch (error) {
      console.error('Error fetching current semester:', error);
      throw error;
    }
  }
}
