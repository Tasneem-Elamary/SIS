import { CourseEnrollmentRepo } from '../persistance/Repositories';
import { CourseEnrollmentType } from '../types';
import { ICourseEnrollment } from './interfaces';

class CourseEnrollmentService implements ICourseEnrollment {
  constructor(private courseEnrollmentData: CourseEnrollmentRepo) {}

  public async create(enrollmentData: CourseEnrollmentType): Promise<CourseEnrollmentType | undefined> {
    try {
      const enrollment = await this.courseEnrollmentData.create(enrollmentData);
      return enrollment;
    } catch (error) {
      throw new Error('Failed to create course enrollment, Please try again!');
    }
  }

  public async requestOverload(enrollmentData: CourseEnrollmentType): Promise<CourseEnrollmentType | undefined> {
    try {
      const enrollmentWithDefaults: CourseEnrollmentType = {
        ...enrollmentData,
        enrollmentType: 'overload' as const, // Type assertion
        hasPaidFees: false,
        approvalStatus: 'pending',
      };

      const createdEnrollment = await this.courseEnrollmentData.create(enrollmentWithDefaults);
      return createdEnrollment;
    } catch (error) {
      throw new Error('Failed to create course enrollment, please try again!');
    }
  }

  public async requestSelfStudey(enrollmentData: CourseEnrollmentType): Promise<CourseEnrollmentType | undefined> {
    try {
      const enrollmentWithDefaults: CourseEnrollmentType = {
        ...enrollmentData,
        enrollmentType: 'seltstudy' as 'selfstudy', // Type assertion
        hasPaidFees: false,
        approvalStatus: 'pending',
      };

      const createdEnrollment = await this.courseEnrollmentData.create(enrollmentWithDefaults);
      return createdEnrollment;
    } catch (error) {
      throw new Error('Failed to create course enrollment, please try again!');
    }
  }

  public async requestRegular(enrollmentData: CourseEnrollmentType): Promise<CourseEnrollmentType | undefined> {
    try {
      const enrollmentWithDefaults: CourseEnrollmentType = {
        ...enrollmentData,
        enrollmentType: 'regular' as const, // Type assertion
        hasPaidFees: false,
        approvalStatus: 'pending',
      };

      const createdEnrollment = await this.courseEnrollmentData.create(enrollmentWithDefaults);
      return createdEnrollment;
    } catch (error) {
      throw new Error('Failed to create course enrollment, please try again!');
    }
  }

  public async getById(id: string): Promise<CourseEnrollmentType | undefined> {
    try {
      const enrollment = await this.courseEnrollmentData.getById(id);
      if (enrollment) {
        return enrollment;
      }
      throw new Error('Course enrollment not found');
    } catch (error) {
      throw new Error('Failed to find course enrollment by ID, Please try again!');
    }
  }

  // Method to retrieve all course enrollments
  public async getAll(): Promise<CourseEnrollmentType[]|undefined> {
    try {
      const enrollments = await this.courseEnrollmentData.getAll();
      if (enrollments) { return enrollments; }
    } catch (error) {
      throw new Error('Failed to retrieve course enrollments, Please try again!');
    }
  }

  // Method to update an existing course enrollment
  public async update(id: string, updateData: Partial<CourseEnrollmentType>): Promise<CourseEnrollmentType | undefined> {
    try {
      const updatedEnrollment = await this.courseEnrollmentData.update(id, updateData);
      if (updatedEnrollment) {
        return updatedEnrollment;
      }
      throw new Error('Course enrollment not found');
    } catch (error) {
      throw new Error('Failed to update course enrollment, Please try again!');
    }
  }

  // Method to delete an existing course enrollment
  public async delete(id: string): Promise<boolean> {
    try {
      const success = await this.courseEnrollmentData.delete(id);
      if (success) {
        return success;
      }
      throw new Error('Course enrollment not found');
    } catch (error) {
      throw new Error('Failed to delete course enrollment, Please try again!');
    }
  }
}

export default CourseEnrollmentService;
