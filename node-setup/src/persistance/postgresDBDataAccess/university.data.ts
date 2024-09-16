import models from '../../models';
import { UniversityRepo } from '../Repositories';
import { UniversityType } from '../../types';

class UniversityData implements UniversityRepo {
  create = async (university: UniversityType): Promise<UniversityType | undefined> => {
    try {
      const newUniversity = await models.University.create(university);
      return newUniversity ? (newUniversity.get() as UniversityType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create the university, please try again!');
    }
  };

  getById = async (id: string): Promise<UniversityType | undefined> => {
    try {
      const university = await models.University.findOne({ where: { id } });
      return university ? (university.get() as UniversityType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the university, please try again!');
    }
  };

  getByUniversityCode = async (universityCode: string): Promise<UniversityType | undefined> => {
    try {
      const university = await models.University.findOne({ where: { universityCode } });
      return university ? (university.get() as UniversityType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the university by code, please try again!');
    }
  };

  getAll = async (): Promise<UniversityType[] | undefined[]> => {
    try {
      const universities = await models.University.findAll();
      return universities.map((university) => university.get() as UniversityType);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve universities, please try again!');
    }
  };

  update = async (id: string, updates: Partial<UniversityType>): Promise<UniversityType | undefined> => {
    try {
      const university = await models.University.findOne({ where: { id } });
      if (university) {
        await university.update(updates);
        return university.get() as UniversityType;
      }
      return undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update the university, please try again!');
    }
  };

  delete = async (id: string): Promise<boolean> => {
    try {
      const result = await models.University.destroy({ where: { id } });
      return result > 0;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete the university, please try again!');
    }
  };
}

export default UniversityData;
