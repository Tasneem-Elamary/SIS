import { Sequelize } from 'sequelize';
import { SemesterType } from '../../types';
import models from '../../models';
import { SemesterRepo } from '../Repositories';

class SemesterData implements SemesterRepo {
  create = async (semester: SemesterType): Promise<SemesterType | undefined> => {
    try {
      const newSemester = await models.Semester.create(semester);
      return newSemester ? (newSemester.get() as SemesterType) : undefined;
    } catch (error) {
      console.error('Failed to create the semester:', error);
      throw new Error('Failed to create the semester, please try again!');
    }
  };

  getById = async (id: string): Promise<SemesterType | undefined> => {
    try {
      const semester = await models.Semester.findOne({ where: { id } });
      return semester ? (semester.get() as SemesterType) : undefined;
    } catch (error) {
      console.error('Failed to get the semester:', error);
      throw new Error('Failed to get the semester, please try again!');
    }
  };

  getAll = async (): Promise<SemesterType[] | undefined[]> => {
    try {
      const semesters = await models.Semester.findAll();
      return semesters.map((semester) => semester.get() as SemesterType);
    } catch (error) {
      console.error('Failed to retrieve semesters:', error);
      throw new Error('Failed to retrieve semesters, please try again!');
    }
  };

  getCurrentSemester = async () : Promise<SemesterType| undefined> => {
    try {
      const semester = await models.Semester.findOne({
        attributes: ['id', 'year', 'season'],
        order: [
          ['year', 'DESC'],
          [
            // Use Sequelize.literal to create a custom ORDER BY for season
            Sequelize.literal(`
              CASE 
                WHEN "season" = 'Winter' THEN 1
                WHEN "season" = 'spring' THEN 2
                WHEN "season" = 'summer' THEN 3
                WHEN "season" = 'fall' THEN 4
                ELSE 5
              END
            `),
            'DESC', // Change to 'ASC' if you want Winter to come first
          ],
        ],
      });

      return semester ? (semester.get() as SemesterType) : undefined;
    } catch (error) {
      console.error('Error fetching current semester:', error);
      throw error;
    }
  };

  update = async (id: string, updates: Partial<SemesterType>): Promise<SemesterType | undefined> => {
    try {
      const semester = await models.Semester.findOne({ where: { id } });
      if (semester) {
        await semester.update(updates);
        return semester.get() as SemesterType;
      }
      return undefined;
    } catch (error) {
      console.error('Failed to update the semester:', error);
      throw new Error('Failed to update the semester, please try again!');
    }
  };

  delete = async (id: string): Promise<boolean> => {
    try {
      const result = await models.Semester.destroy({ where: { id } });
      return result > 0;
    } catch (error) {
      console.error('Failed to delete the semester:', error);
      throw new Error('Failed to delete the semester, please try again!');
    }
  };
}

export default SemesterData;
