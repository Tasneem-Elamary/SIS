import { GradeType } from '../../types';
// import models from '../../models';
import { GradesRepo } from '../Repositories';
import { Grade } from '../../models';

class GradesData implements GradesRepo {
  create = async (grade: GradeType): Promise<GradeType | undefined> => {
    try {
      const newGrade = await Grade.create(grade);
      // const newGrade = await models.Grade.create(grade);
      return newGrade ? (newGrade.get() as GradeType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create the grade, please try again!');
    }
  };

  getById = async (id: string): Promise<GradeType | undefined> => {
    try {
      const grade = await Grade.findOne({ where: { id } });
      // const grade = await models.Grade.findOne({ where: { id } });
      return grade ? (grade.get() as GradeType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the grade, please try again!');
    }
  };

  getAll = async (): Promise<GradeType[] | undefined[]> => {
    try {
      const grades = await Grade.findAll();
      // const grades = await models.Grade.findAll();
      return grades.map((grade) => grade.get() as GradeType);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve grades, please try again!');
    }
  };

  getBylawGrades = async (BylawId:string): Promise<GradeType[] | undefined[]> => {
    try {
      const grades = await Grade.findAll({ where: { BylawId } });

      return grades.map((grade) => grade.get() as GradeType);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve Bylaw grades, please try again!');
    }
  };

  update = async (id: string, updates: Partial<GradeType>): Promise<GradeType | undefined> => {
    try {
      const grade = await Grade.findOne({ where: { id } });
      // const grade = await models.Grade.findOne({ where: { id } });
      if (grade) {
        await grade.update(updates);
        return grade.get() as GradeType;
      }
      return undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update the grade, please try again!');
    }
  };

  delete = async (id: string): Promise<boolean> => {
    try {
      const result = await Grade.destroy({ where: { id } });
      // const result = await models.Grade.destroy({ where: { id } });
      return result > 0;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete the grade, please try again!');
    }
  };
}

export default GradesData;
