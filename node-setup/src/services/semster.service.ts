import User from './user.service';
import { ISemster } from './interfaces';
import { SemesterRepo } from '../persistance/Repositories';
import {
  SemesterType,
} from '../types';

class Semster implements ISemster {
  constructor(private semsterData: SemesterRepo) {
  }

  createSemester = async (semester: SemesterType): Promise<SemesterType | undefined> => {
    try {
      const newSemester = await this.semsterData.create(semester);
      return newSemester;
    } catch (error) {
      console.error('Error creating semester:', error);
      throw new Error('Failed to create the semester, please try again!');
    }
  };

  updateSemester = async (id: string, updatedData: Partial<SemesterType>): Promise<SemesterType | undefined> => {
    try {
      const updatedSemester = await this.semsterData.update(id, updatedData);
      return updatedSemester;
    } catch (error) {
      console.error('Error updating semester:', error);
      throw new Error('Failed to update the semester, please try again!');
    }
  };

  getCurrentSemester = async () : Promise<SemesterType| undefined> => {
    try {
      const currentSemester = await this.semsterData.getCurrentSemester();
      return currentSemester;
    } catch (error) {
      console.error('Error updating semester:', error);
      throw new Error('Failed to update the semester, please try again!');
    }
  };

  deleteSemester = async (id: string): Promise<boolean> => {
    try {
      const isDeleted = await this.semsterData.delete(id);
      return isDeleted;
    } catch (error) {
      console.error('Error deleting semester:', error);
      throw new Error('Failed to delete the semester, please try again!');
    }
  };
}

export default Semster;
