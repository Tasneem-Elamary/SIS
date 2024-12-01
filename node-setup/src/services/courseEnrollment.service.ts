import { CourseEnrollmentRepo, CourseRepo, StudentRepo } from '../persistance/Repositories';
import { CourseEnrollmentType, CourseType, StudentType } from '../types';
import { ICourseEnrollment } from './interfaces';
import { DataAccess } from '../persistance';
import { ScheduleDataAccess } from '../persistance/postgresDBDataAccess/schedule.data';

class CourseEnrollmentService implements ICourseEnrollment {
  constructor(private courseEnrollmentData: CourseEnrollmentRepo, private studentDataAccess:StudentRepo, private courseDataAccess:CourseRepo) {}

  private scheduleData = new ScheduleDataAccess();

  public async create(enrollmentData: CourseEnrollmentType): Promise<CourseEnrollmentType | undefined> {
    try {
      const enrollment = await this.courseEnrollmentData.create(enrollmentData);
      return enrollment;
    } catch (error) {
      throw new Error('Failed to create course enrollment, Please try again!');
    }
  }

  public async request(enrollmentData: CourseEnrollmentType, cell?:number): Promise<CourseEnrollmentType | undefined> {
    try {
      const enrollment = await this.courseEnrollmentData.create({
        ...enrollmentData,
        hasPaidFees: false,
        approvalStatus: 'pending',
      });
      if (cell) {

      }
      return enrollment;
    } catch (error) {
      throw new Error('Failed to create course enrollment, Please try again!');
    }
  }

  public async requestByStudentCode(enrollmentData: CourseEnrollmentType): Promise<CourseEnrollmentType | undefined> {
    try {
      const studentCode = enrollmentData.StudentId;
      console.log(studentCode);
      const student = await this.studentDataAccess.getStudentByCode(studentCode);
      const StudentId = student?.id;
      if (StudentId) { enrollmentData.StudentId = StudentId; } else {
        throw Error("Couldn't find equivalent student code ");
      }
      const enrollment = await this.courseEnrollmentData.create({
        ...enrollmentData,
        hasPaidFees: false,
        approvalStatus: 'pending',
      });
      return enrollment;
    } catch (error) {
      throw new Error('Failed to create course enrollment, Please try again!');
    }
  }

  public async requestOverload(enrollmentData: CourseEnrollmentType): Promise<CourseEnrollmentType | undefined> {
    try {
      const enrollmentWithDefaults: CourseEnrollmentType = {
        ...enrollmentData,
        enrollmentType: 'overload' as const,
        hasPaidFees: false,
        approvalStatus: 'pending',
      };

      const createdEnrollment = await this.courseEnrollmentData.create(enrollmentWithDefaults);
      return createdEnrollment;
    } catch (error) {
      throw new Error('Failed to create course enrollment, please try again!');
    }
  }

  public async requestSelfStudy(enrollmentData: CourseEnrollmentType): Promise<CourseEnrollmentType | undefined> {
    try {
      const enrollmentWithDefaults: CourseEnrollmentType = {
        StudentId: enrollmentData.StudentId,
        CourseId: enrollmentData.CourseId,
        enrollmentType: 'seltstudy' as 'selfstudy',
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
        enrollmentType: 'regular' as const,
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

  public async getCoursesStudentAllowedToEnroll(StudentId: string): Promise<CourseType[]> {
    try {
      const success = await this.courseEnrollmentData.getCoursesStudentAllowedToEnroll(StudentId);
      if (success) {
        return success;
      }
      throw new Error('No Courses allowed to enroll inc found');
    } catch (error) {
      throw new Error('Failed to find allowed courses to enroll in, Please try again!');
    }
  }

  public async getEnrollmentRequests(): Promise<Partial<StudentType & CourseType>[]> {
    const courseEnrollments = await this.courseEnrollmentData.getPendingEnrollmentRequests();

    const data = await Promise.all(
      courseEnrollments.map(async (item) => {
        const course = await this.courseDataAccess.getById(item.CourseId);
        const student = await this.studentDataAccess.getById(item.StudentId);
        const studentData = {
          studentCode: student?.studentCode,
          studentName: student?.name,
        };

        const courseData = {
          courseName: course?.name,
        };
        return {
          ...item,
          ...studentData,
          ...courseData,
        };
      }),
    );

    return data;
  }
}

export default CourseEnrollmentService;
