import { Op, where } from 'sequelize';
import {
  Course, CourseEnrollment, Grade, Result, Student,
} from '../../models';
import course from '../../models/course.model';
import { CourseEnrollmentType, CourseType, StudentType } from '../../types';
import { CourseEnrollmentRepo } from '../Repositories';

class CourseEnrollmentDataAccess implements CourseEnrollmentRepo {
  public async create(enrollmentData: CourseEnrollmentType): Promise<CourseEnrollmentType | undefined> {
    try {
      const enrollment = await CourseEnrollment.create(enrollmentData);
      return enrollment.get({ plain: true });
    } catch (error) {
      console.error('Error creating course enrollment:', error);
      return undefined;
    }
  }

  public async getById(id: string): Promise<CourseEnrollmentType | undefined> {
    try {
      const enrollment = await CourseEnrollment.findByPk(id);
      if (!enrollment) {
        console.error('Enrollment not found');
        return undefined;
      }
      return enrollment.get({ plain: true });
    } catch (error) {
      console.error('Error fetching course enrollment:', error);
      return undefined;
    }
  }

  public async getAll(): Promise<CourseEnrollmentType[] | undefined> {
    try {
      const enrollments = await CourseEnrollment.findAll();
      return enrollments.map((enrollment) => enrollment.get({ plain: true }));
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      return undefined;
    }
  }

  public async update(id: string, updateData: Partial<CourseEnrollmentType>): Promise<CourseEnrollmentType | undefined> {
    try {
      const enrollment = await CourseEnrollment.findByPk(id);
      if (!enrollment) {
        console.error('Enrollment not found');
        return undefined;
      }
      const updatedEnrollment = await enrollment.update(updateData);
      return updatedEnrollment.get({ plain: true });
    } catch (error) {
      console.error('Error updating enrollment:', error);
      return undefined;
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const enrollment = await CourseEnrollment.findByPk(id);
      if (!enrollment) {
        console.error('Enrollment not found');
        return false;
      }
      await enrollment.destroy();
      return true;
    } catch (error) {
      console.error('Error deleting enrollment:', error);
      return false;
    }
  }

  public async getCoursesStudentAllowedToEnroll(studentId: string): Promise<CourseType[] | undefined> {
    try {
      const AllowedCoursesToEnroll = await Course.findAll({
        include: [

          {
            model: Result,
            where: {
              StudentId: studentId,
            },
            include: [
              {
                model: Grade,
                where: { letter: 'F' },
              },
            ],
            required: false,
            attributes: [],
          },

          {
            model: Course,
            as: 'Prerequisite',
            include: [
              {
                model: Result,
                where: {
                  StudentId: studentId,
                },
                include: [
                  {
                    model: Grade,
                    where: { letter: { [Op.ne]: 'F' } },
                  },
                ],
                attributes: [],
              },
            ],
          },
        ],
      });

      if (!AllowedCoursesToEnroll) {
        console.error('Courses to enroll in not found');
        return undefined;
      }

      return AllowedCoursesToEnroll.map((course) => course.get({ plain: true }));
    } catch (error) {
      console.error('Error finding allowed courses to enroll in:', error);
    }
  }

  public async getPendingEnrollmentRequests():Promise<CourseEnrollmentType[]> {
    try {
      const courseEnrollments = await CourseEnrollment.findAll({ where: { approvalStatus: 'pending' }, attributes: ['StudentId', 'CourseId'] });
      if (!courseEnrollments) {
        throw Error('Course enrollments Not found');
      } else {
        const courseEnrollmentIds = courseEnrollments.map((courseEnrollment) => courseEnrollment.get({ plain: true }));
        return courseEnrollmentIds;
      }
    } catch (error) {
      console.log(error);
      throw Error('Failed to get course enrollments ');
    }
  }
}

export default CourseEnrollmentDataAccess;
