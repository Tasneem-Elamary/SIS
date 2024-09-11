import { CourseEnrollment } from '../../models';
import { CourseEnrollmentType } from '../../types';
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
}

export default CourseEnrollmentDataAccess;
