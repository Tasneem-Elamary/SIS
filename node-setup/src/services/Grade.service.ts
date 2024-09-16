import User from './user.service';
import { IGrade } from './interfaces';
import { GradesRepo } from '../persistance/Repositories';
import {
  GradeType,
} from '../types';

class Grade implements IGrade {
  constructor(private gradeData: GradesRepo) {
  }

  createGrade = async (grade: GradeType): Promise<GradeType | undefined> => {
    try {
      const newGrade = await this.gradeData.create(grade);
      return newGrade;
    } catch (error) {
      console.error('Error creating grade:', error);
      throw new Error('Failed to create the grade, please try again!');
    }
  };

  getAllGradesBylawId = async (BylawId: string): Promise<GradeType[] | undefined[]> => {
    try {
      const grades = await this.gradeData.getAllByBylaw(BylawId);

      return grades;
    } catch {
      throw new Error('Failed to get all grades.');
    }
  };

  getGradeIdByLetterAndBylawId = async (gradeLetter: string, BylawId: string): Promise<GradeType | undefined> => {
    try {
      const grade = await this.gradeData.getGradeIdByLetterAndBylawId(gradeLetter, BylawId);

      return grade;
    } catch (error) {
      console.error('Error fetching grade:', error);
      throw error;
    }
  };

  updateGrade = async (id: string, updatedData: Partial<GradeType>): Promise<GradeType | undefined> => {
    try {
      const updatedGrade = await this.gradeData.update(id, updatedData);
      return updatedGrade;
    } catch (error) {
      console.error('Error updating grade:', error);
      throw new Error('Failed to update the grade, please try again!');
    }
  };

  deleteGrade = async (id: string): Promise<boolean> => {
    try {
      const isDeleted = await this.gradeData.delete(id);
      return isDeleted;
    } catch (error) {
      console.error('Error deleting grade:', error);
      throw new Error('Failed to delete the grade, please try again!');
    }
  };
}

export default Grade;
