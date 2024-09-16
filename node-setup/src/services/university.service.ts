import User from './user.service';
import { IUniversity } from './interfaces';
import { UniversityRepo } from '../persistance/Repositories';
import {
  UniversityType,
} from '../types';

class University implements IUniversity {
  constructor(private universityData: UniversityRepo) {
  }

  createUniversity = async (university: UniversityType): Promise<UniversityType | undefined> => {
    try {
      const newUniversity = await this.universityData.create(university);
      if (!newUniversity) {
        throw new Error('Failed to create university.');
      }

      return newUniversity;
    } catch {
      throw new Error('Failed to create university.');
    }
  };

  getUniversityById = async (id: string): Promise<UniversityType | undefined> => {
    try {
      const university = await this.universityData.getById(id);

      return university;
    } catch {
      throw new Error('Failed to get the university.');
    }
  };

  getUniversityByCode = async (code: string): Promise<UniversityType | undefined> => {
    try {
      const university = await this.universityData.getByUniversityCode(code);

      return university;
    } catch {
      throw new Error('Failed to get the university by code.');
    }
  };

  getAllUniversities = async (): Promise<UniversityType[] | undefined[]> => {
    try {
      const universities = await this.universityData.getAll();

      return universities;
    } catch {
      throw new Error('Failed to get all universities.');
    }
  };

  updateUniversity = async (id: string, updatedData: Partial<UniversityType>): Promise<UniversityType | undefined> => {
    try {
      const updatedUniversity = await this.universityData.update(id, updatedData);

      return updatedUniversity;
    } catch {
      throw new Error('Failed to update the university.');
    }
  };

  deleteUniversity = async (id: string): Promise<boolean> => {
    try {
      const universityDeleted = await this.universityData.delete(id);

      if (!universityDeleted) {
        throw new Error('Failed to delete the university.');
      }

      return true;
    } catch {
      throw new Error('Failed to delete the university.');
    }
  };
}

export default University;
