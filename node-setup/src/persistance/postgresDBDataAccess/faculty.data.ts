import models from '../../models';
import { FacultyRepo } from '../Repositories';
import { FacultyType } from '../../types';

class FacultyData implements FacultyRepo {
  create = async (faculty: FacultyType): Promise<FacultyType | undefined> => {
    try {
      const newFaculty = await models.Faculty.create(faculty);
      return newFaculty ? (newFaculty.get() as FacultyType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create the faculty, please try again!');
    }
  };

  getById = async (id: string): Promise<FacultyType | undefined> => {
    try {
      const faculty = await models.Faculty.findOne({ where: { id } });
      return faculty ? (faculty.get() as FacultyType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the faculty, please try again!');
    }
  };

  getByFacultyCode = async (facultyCode: string): Promise<FacultyType | undefined> => {
    try {
      const faculty = await models.Faculty.findOne({ where: { facultyCode } });
      return faculty ? (faculty.get() as FacultyType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the faculty by code, please try again!');
    }
  };

  getAll = async (): Promise<FacultyType[] | undefined[]> => {
    try {
      const faculties = await models.Faculty.findAll();
      return faculties.map((faculty) => faculty.get() as FacultyType);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve faculties, please try again!');
    }
  };

  update = async (id: string, updates: Partial<FacultyType>): Promise<FacultyType | undefined> => {
    try {
      const faculty = await models.Faculty.findOne({ where: { id } });
      if (faculty) {
        await faculty.update(updates);
        return faculty.get() as FacultyType;
      }
      return undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update the faculty, please try again!');
    }
  };

  delete = async (id: string): Promise<boolean> => {
    try {
      const result = await models.Faculty.destroy({ where: { id } });
      return result > 0;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete the faculty, please try again!');
    }
  };
}

export default FacultyData;
