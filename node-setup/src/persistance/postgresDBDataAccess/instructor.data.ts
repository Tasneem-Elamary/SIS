import { Transaction } from 'sequelize';
import models from '../../models';
import { InstructorRepo } from '../Repositories';
import { InstructorType, StudentType, UserType } from '../../types';

class InstructorData implements InstructorRepo {
  create = async (instructor: InstructorType, transaction?: Transaction): Promise<InstructorType | undefined> => {
    try {
      const newInstructor = await models.Instructor.create(instructor);
      return newInstructor ? (newInstructor.get() as InstructorType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Fail to create the instructor, Please try again !!');
    }
  };

  getById = async (id: string): Promise<(InstructorType & UserType) | undefined> => {
    try {
      const instructor = await models.Instructor.findOne({
        where: { id },
        include: [
          {
            model: models.User,
            as: 'User',
          },
        ],
      });

      if (instructor) {
        const user = instructor.User; // Extract the User model instance
        if (user) {
          const { User, ...instructorData } = instructor.get() as (InstructorType&{User:UserType});
          return {
            ...instructorData,
            ...user.get(),
          } as InstructorType & UserType;
        }
      }

      return undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the instructor, please try again!');
    }
  };

  getByUserId = async (UserId: string): Promise<InstructorType | undefined> => {
    try {
      const instructor = await models.Instructor.findOne({ where: { UserId } });
      return instructor ? (instructor.get() as InstructorType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the instructor, please try again!');
    }
  };

  getAll = async (): Promise<(InstructorType & UserType)[] | undefined[]> => {
    try {
      const instructors = await models.Instructor.findAll({
        include: [
          {
            model: models.User,
            as: 'User',
          },
        ],
      });

      if (instructors.length === 0) return [];

      return instructors.map((instructor) => {
        const user = instructor.User;
        const fullName = `${instructor.get().firstName} ${instructor.get().lastName}`.trim();

        const { User, ...instructorData } = instructor.get() as (InstructorType&{User:UserType});

        return {
          ...user.get(),
          name: fullName,
          ...instructorData,

        } as InstructorType & UserType;
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  getadvisorStudents = async (instructorId: string): Promise<(InstructorType & { Student: StudentType[] })| undefined> => {
    try {
      const instructor = await models.Instructor.findOne({
        where: { id: instructorId },
        include: [{ model: models.Student, as: 'Students', through: { attributes: [] } }], // Assuming 'prerequisite' association exists
      });

      return instructor ? (instructor.get() as InstructorType & { Student: StudentType[] }) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get course prerequisites, please try again!');
    }
  };

  update = async (id: string, updates: Partial<InstructorType>): Promise<InstructorType | undefined> => {
    try {
      const instructor = await models.Instructor.findOne({ where: { id } });
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

  delete = async (id: string, transaction?:Transaction): Promise<boolean> => {
    try {
      const result = await models.Instructor.destroy({ where: { id } });
      return result > 0;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete the instructor, please try again!');
    }
  };

  getListOfPendingStudents = async (instructorId: string): Promise<InstructorType|undefined> => {
    try {
      const instructor = await models.Instructor.findOne({
        where: { id: instructorId }, // Filter by specific instructor
        include: [
          {
            model: models.Student,
            as: 'Students', // The alias for the association
            through: { attributes: [] }, // Hide the join table attributes (StudentAdvisors)
            include: [
              {
                model: models.Schedule,
                through: {
                  attributes: ['approvalStatus'], // Get the approvalStatus from the join table
                  where: { approvalStatus: 'pending' }, // Filter only for pending approval status
                },
                required: true, // Ensure INNER JOIN between Student and Schedule
              },
            ],
            required: true, //  // Ensures students must have schedules with pending status
          },
        ],
      });

      return instructor ? (instructor.get() as InstructorType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch instructors with pending students.');
    }
  };

  getSelfStudyOROverloadPendingStudents = async (instructorId: string, enrollmentType:string): Promise<InstructorType|undefined> => {
    try {
      const instructor = await models.Instructor.findOne({
        where: { id: instructorId }, // Filter by specific advisor
        include: [
          {
            model: models.Student,
            as: 'Students', // Alias for the association with students
            through: { attributes: [] }, // Exclude the join table (StudentAdvisors) attributes
            include: [
              {
                model: models.Course,

                through: {
                  attributes: [], // Exclude the CourseEnrollments attributes
                  where: {
                    enrollmentType, // Filter for selfstudy type
                    approvalStatus: 'pending', // Filter for pending status
                  },
                },
                required: true,
              },
            ],
          },
        ],
      });

      return instructor ? (instructor.get()) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch students enrolled in self-study courses with pending status.');
    }
  };
}

export default InstructorData;
