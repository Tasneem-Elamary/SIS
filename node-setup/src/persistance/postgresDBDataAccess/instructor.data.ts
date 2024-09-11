// import models from '../../models';
import { Instructor, User } from '../../models';
import { InstructorRepo } from '../Repositories';
import { InstructorType, UserType } from '../../types';

class InstructorData implements InstructorRepo {
  create = async (instructor: InstructorType): Promise<InstructorType | undefined> => {
    try {
      // const newInstructor = await models.Instructor.create(instructor);
      const newInstructor = await Instructor.create(instructor);
      return newInstructor ? (newInstructor.get() as InstructorType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Fail to create the instructor, Please try again !!');
    }
  };

  public getById = async (id: string): Promise<(InstructorType & { User: UserType }) | undefined> => {
    try {
      // const instructor = await models.Instructor.findOne({
      const instructor = await Instructor.findOne({
        where: { id },
        include: [
          {
            // model: models.User,
            model: User,
            as: 'User',
          },
        ],
      });

      // If an instructor is found, return it as a plain object with associated User data
      return instructor ? (instructor.get() as InstructorType & { User: UserType }) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the instructor, please try again!');
    }
  };

  getByUserId = async (UserId: string): Promise<InstructorType | undefined> => {
    try {
      // const instructor = await models.Instructor.findOne({ where: { UserId } });
      const instructor = await Instructor.findOne({ where: { UserId } });
      return instructor ? (instructor.get() as InstructorType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the instructor, please try again!');
    }
  };

  getAll = async (): Promise<(InstructorType & { User: UserType })[] | undefined[]> => {
    try {
      const instructors = await Instructor.findAll({
        // const instructors = await models.Instructor.findAll({
        include: [
          {
            model: User,
            // model: models.User,
            as: 'User',
          },
        ],
      });

      return instructors.map((instructor) => instructor.get({ plain: true }) as InstructorType & { User: UserType });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve instructors, please try again!');
    }
  };

  update = async (id: string, updates: Partial<InstructorType>): Promise<InstructorType | undefined> => {
    try {
      const instructor = await Instructor.findOne({ where: { id } });
      // const instructor = await models.Instructor.findOne({ where: { id } });
      if (instructor) {
        await instructor.update(updates);
        return instructor.get() as InstructorType;
      }
      return undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update the instructor, please try again!');
    }
  };

  delete = async (id: string): Promise<boolean> => {
    try {
      const result = await Instructor.destroy({ where: { id } });
      // const result = await models.Instructor.destroy({ where: { id } });
      return result > 0;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete the instructor, please try again!');
    }
  };
}

export default InstructorData;
