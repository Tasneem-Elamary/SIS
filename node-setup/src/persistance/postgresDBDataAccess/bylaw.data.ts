import models, {
  Bylaw, Grade, BylawRule, Faculty, Course,
  BylawCourse,
} from '../../models';

import { db } from '../../../config/postgresDB.config';
import {
  BylawCourseType, BylawRuleType, BylawType, CourseType, GradeType,
} from '../../types';
import { BylawRepo } from '../Repositories';

class BylawDataAccess implements BylawRepo {
  create = async (bylaw: BylawType, transaction?: any): Promise<BylawType | undefined> => {
    try {
      const newBylaw = await models.Bylaw.create(bylaw, { transaction });
      return newBylaw.get();
    } catch (error) {
      console.error('Failed to create the bylaw:', error);
      throw new Error('Failed to create the bylaw, please try again!');
    }
  };

  getByCode = async (code: string): Promise<BylawType | undefined> => {
    try {
      const bylaw = await models.Bylaw.findOne({ where: { code } });
      return bylaw ? (bylaw.get() as BylawType) : undefined;
    } catch (error) {
      console.error('Failed to find the bylaw by code:', error);
      throw new Error('Failed to find the bylaw, please try again!');
    }
  };

  getById = async (id: string): Promise<BylawType | undefined> => {
    try {
      const bylaw = await Bylaw.findOne({ where: { id }, include: [{ model: Faculty, attributes: ['name'] }] });
      return bylaw ? (bylaw.get() as BylawType) : undefined;
    } catch (error) {
      console.error('Failed to find the bylaw by ID:', error);
      throw new Error('Failed to find the bylaw, please try again!');
    }
  };

  getBylawDetails = async (id: string): Promise<(Partial<BylawRuleType> & Partial<GradeType>) | undefined> => {
    const bylawDetails = await Bylaw.findByPk(id, {
      include: [
        { model: Grade, attributes: ['letter', 'point'] },
        { model: BylawRule, attributes: ['min_GPA', 'hoursAllowed'] },
      ],
      attributes: ['code'],
    });
    if (bylawDetails) return bylawDetails.get({ plain: true });

    throw Error('Failed to get bylaw details');
  };

  getBylawCourses = async (id: string): Promise<Partial<BylawType & { Courses: Partial<CourseType>[] }> | undefined> => {
    const bylawDetails = await Bylaw.findByPk(id, {
      include: [
        { model: Course, attributes: ['code', 'name'], through: { attributes: [] } },
      ],
      attributes: ['code'],
    });

    if (bylawDetails) return bylawDetails.get({ plain: true });

    throw Error('Failed to get bylaw courses');
  };

  addCourseToBylaw = async (bylawId: string, courseId: string, isElective: boolean): Promise<BylawCourseType | undefined> => {
    try {
      const bylawCourse = await BylawCourse.create({ BylawId: bylawId, CourseId: courseId, isElective });
      if (!bylawCourse) throw new Error('Failed to create bylawCourse');
      return bylawCourse.get({ plain: true });
    } catch (error) {
      console.log('Error encountered while creating bylawCourse:', error);
      return undefined;
    }
  };

  getAllBylawCourses = async (): Promise<BylawCourseType[] | undefined> => {
    try {
      const bylawCourses = await BylawCourse.findAll();
      if (!bylawCourses) throw new Error('No bylaw courses found');
      return bylawCourses.map((bylawCourse) => bylawCourse.get({ plain: true }));
    } catch (error) {
      console.log('Error encountered while fetching bylaw courses:', error);
      return undefined;
    }
  };

  removeCourseFromBylaw = async (bylawId: string, courseId: string): Promise<boolean> => {
    try {
      const result = await BylawCourse.destroy({
        where: {
          BylawId: bylawId,
          CourseId: courseId,
        },
      });
      if (result === 0) throw new Error('No bylawCourse found to delete');
      return true;
    } catch (error) {
      console.log('Error encountered while removing course from bylaw:', error);
      return false;
    }
  };

  getAll = async (): Promise<BylawType[]> => {
    try {
      const bylaws = await Bylaw.findAll();
      return bylaws.map((bylaw) => bylaw.get() as BylawType);
    } catch (error) {
      console.error('Failed to get all bylaws:', error);
      throw new Error('Failed to get all bylaws, please try again!');
    }
  };

  update = async (id: string, updateData: Partial<BylawType>): Promise<BylawType | undefined> => {
    const transaction = await db.transaction();
    try {
      const bylaw = await models.Bylaw.findByPk(id, { transaction });

      if (!bylaw) {
        console.error('Bylaw not found');
        await transaction.rollback();
        return undefined;
      }

      await bylaw.update(updateData, { transaction });
      await transaction.commit();

      return bylaw.get() as BylawType;
    } catch (error) {
      await transaction.rollback();
      console.error('Failed to update bylaw:', error);
      throw new Error('Failed to update the bylaw, please try again!');
    }
  };

  delete = async (id: string): Promise<boolean> => {
    const transaction = await db.transaction();
    try {
      const bylaw = await models.Bylaw.findByPk(id, { transaction });

      if (!bylaw) {
        console.error('Bylaw not found');
        await transaction.rollback();
        return false;
      }

      await bylaw.destroy({ transaction });
      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      console.error('Failed to delete bylaw:', error);
      throw new Error('Failed to delete the bylaw, please try again!');
    }
  };
}

export default BylawDataAccess;
