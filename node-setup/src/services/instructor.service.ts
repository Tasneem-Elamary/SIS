import { QueryTypes } from 'sequelize';
import User from './user.service';
import { IInstuctor } from './interfaces';
import {
  UserRepo, InstructorRepo, CourseRepo, ResultRepo,
  DepartmentRepo,
} from '../persistance/Repositories';
import {
  UserType, StudentType, InstructorType, CourseType, StudentAdvisorType, ResultType,
} from '../types';
import { sequelize } from '../models';
import { db } from '../../config/postgresDB.config';

class Instructor extends User implements IInstuctor {
  constructor(userData: UserRepo, private instructorData: InstructorRepo, private resultData: ResultRepo, private departmentData: DepartmentRepo) {
    super(userData);
  }

  createInstructor = async (user: UserType, instructor: Partial<InstructorType>): Promise<InstructorType | undefined> => {
    const transaction = await db.transaction();
    try {
      const newUser = await this.userData.create(user, transaction);
      const userId = newUser?.id;

      if (!userId) {
        throw new Error('Failed to create user');
      }
      const Department = await this.departmentData.getBydepartmentCode(instructor.DepartmentId as string);

      if (!Department) {
        throw new Error('Department not found');
      }

      // Construct the full InstructorType object
      const fullInstructor: InstructorType = {
        ...instructor,
        DepartmentId: Department?.id,
        UserId: userId,
      } as InstructorType;

      // console.log(fullInstructor);

      await transaction.commit();

      return this.instructorData.create(fullInstructor, transaction);
    } catch {
      await transaction.rollback();
      throw new Error('Fail to create instructor');
    }
  };

  getInstructorById = async (id: string): Promise<(InstructorType & UserType) | undefined> => {
    try {
      const instructor = await this.instructorData.getById(id);

      return instructor;
    } catch {
      throw new Error('Fail to get the instructor');
    }
  };

  getInstructorByEmail = async (email: string): Promise<InstructorType | undefined> => {
    try {
      const user = await this.userData.getByEmail(email);

      if (!user) {
        throw new Error('Failed to get the instructor by email');
      }

      const userId = user.id as string;
      console.log(userId);

      const instructor = await this.instructorData.getByUserId(userId);
      console.log(instructor);
      return instructor || undefined;
    } catch {
      throw new Error('Failed to get the instructor by email');
    }
  };

  // Method to get all instructors
  getAllInstructors = async (): Promise<(InstructorType & UserType)[] | undefined[]> => {
    try {
      const instructors = await this.instructorData.getAll();
      return instructors || [];
    } catch {
      throw new Error('Failed to get the instructors');
    }
  };

  getAllTAs = async (): Promise<(InstructorType & UserType)[] | undefined[]> => {
    try {
      const instructors = await this.instructorData.getAll();
      if (instructors && instructors.length > 0) {
        const filteredInstructors = (instructors as (InstructorType & UserType)[])
          .filter((instructor): instructor is InstructorType & UserType => !!instructor && instructor.type === 'TA');

        return filteredInstructors.length > 0 ? filteredInstructors : [];
      }

      return [];
    } catch (error) {
      throw new Error('Failed to get the TAs');
    }
  };

  getAllDoctors = async (): Promise<(InstructorType & UserType)[] | undefined[]> => {
    try {
      const instructors = await this.instructorData.getAll();

      if (instructors && instructors.length > 0) {
        const filteredInstructors = (instructors as (InstructorType & UserType)[])
          .filter((instructor): instructor is InstructorType & UserType => !!instructor && instructor.type === 'Professor');

        return filteredInstructors.length > 0 ? filteredInstructors : [];
      }

      return [];
    } catch {
      throw new Error('Failed to get the Doctors');
    }
  };

  // Method to update an instructor
  updateInstructor = async (id: string, updatedData: Partial<InstructorType>): Promise<InstructorType | undefined> => {
    try {
      if (updatedData.DepartmentId) {
        // Fetch the department using the provided DepartmentId
        const department = await this.departmentData.getBydepartmentCode(updatedData.DepartmentId);

        if (!department) {
          throw new Error('Department not found');
        }
        const updateData = { ...updatedData, DepartmentId: department.id };
        const updatedInstructor = await this.instructorData.update(id, updateData);
        return updatedInstructor;
      }
      return undefined;
    } catch {
      throw new Error('Failed to update the instructor');
    }
  };

  // Method to delete an instructor
  deleteInstructor = async (id: string): Promise<boolean> => {
    const transaction = await db.transaction();
    try {
      const instructor = await this.instructorData.getById(id);

      if (!instructor) {
        throw new Error('Instructor not found');
      }

      const userId = instructor.UserId;

      const instructorDeleted = await this.instructorData.delete(id, transaction);

      if (!instructorDeleted) {
        throw new Error('Failed to delete the instructor');
      }

      const userDeleted = await this.userData.delete(userId, transaction);

      if (!userDeleted) {
        throw new Error('Failed to delete the associated user');
      }
      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw new Error('Failed to delete the instructor');
    }
  };

  // getAdvisedStudents = async (instructorId: string): Promise<StudentType[]> => {
  //   try {
  //     const results = await sequelize.query<StudentType>(

  //       'SELECT * FROM "Students" WHERE "id" IN (SELECT "StudentId" FROM "StudentAdvisors" WHERE "InstructorId" = :instructorId)',
  //       {
  //         type: QueryTypes.SELECT, // Use QueryTypes directly
  //         replacements: { instructorId }, // Safely pass the instructorId
  //       },
  //     );

  //     console.log('Students for Advisor:', results);
  //     return results;
  //   } catch (error) {
  //     console.error('Error fetching records for advisor:', error);
  //     throw new Error('Failed to get students for the specified advisor');
  //   }
  // };

  getadvisorStudents = async (instructorId: string): Promise<(InstructorType & { Student: StudentType[] })| undefined> => {
    try {
      const instructor = await this.instructorData.getadvisorStudents(instructorId);

      return instructor || undefined;
    } catch (error) {
      console.error('Error fetching records for advisor:', error);
      throw new Error('Failed to get students for the specified advisor');
    }
  };

  AdviseStudent = async (instructorId: string, studentId: string): Promise<void> => {
    console.log(studentId);
    try {
      const instructor = await this.instructorData.getById(instructorId);

      if (!instructor || instructor.type !== 'TA') {
        throw new Error('instructor must br TA type');
      }
      await sequelize.query(
        'INSERT INTO "StudentAdvisors"("StudentId", "InstructorId") VALUES (:studentId, :instructorId)',
        {
          replacements: { studentId, instructorId },
          type: QueryTypes.INSERT,
        },
      );
      console.log('Record inserted successfully');
    } catch (error) {
      console.error('Error inserting record:', error);
      throw new Error('Failed to add student advisor association');
    }
  };

  updateAdvisedStudent = async (instructorId: string, studentId: string, newInstructorId: string): Promise<void> => {
    try {
      await sequelize.query(
        'UPDATE "StudentAdvisors" SET "InstructorId" = :newInstructorId WHERE "StudentId" = :studentId AND "InstructorId" = :instructorId',
        {
          replacements: { studentId, instructorId, newInstructorId },
          type: QueryTypes.UPDATE, // Use QueryTypes directly
        },
      );
      console.log('Record updated successfully');
    } catch (error) {
      console.error('Error updating record:', error);
      throw new Error('Failed to update student advisor association');
    }
  };

  deleteAdvisedStudent = async (studentId: string, instructorId: string): Promise<void> => {
    try {
      await sequelize.query(
        'DELETE FROM "StudentAdvisors" WHERE "StudentId" = :studentId AND "InstructorId" = :instructorId',
        {
          replacements: { studentId, instructorId },
          type: QueryTypes.DELETE, // Use QueryTypes directly
        },
      );
      console.log('Record deleted successfully');
    } catch (error) {
      console.error('Error deleting record:', error);
      throw new Error('Failed to delete student advisor association');
    }
  };

  getListOfPendingStudents = async (instructorId: string): Promise<InstructorType|undefined> => {
    try {
      const instructor = await this.instructorData.getListOfPendingStudents(instructorId);

      return instructor || undefined;
    } catch (error) {
      console.error('Error fetching records for advisor:', error);
      throw new Error('Failed to get pending students for the specified advisor');
    }
  };

  getSelfStudyOROverloadPendingStudents = async (instructorId: string, enrollmentType:string): Promise<InstructorType|undefined> => {
    try {
      const instructor = await this.instructorData.getSelfStudyOROverloadPendingStudents(instructorId, enrollmentType);

      return instructor || undefined;
    } catch (error) {
      console.error('Error fetching records for advisor:', error);
      throw new Error('Failed to get pending students for the specified advisor');
    }
  };

  getDistinctCoursesByProfessor = async (instructorId: string): Promise<InstructorType&{Schedules:CourseType[]} | undefined> => {
    try {
      const courses = await this.instructorData.getDistinctCoursesByProfessor(instructorId);

      return courses || undefined;
    } catch (error) {
      console.error('Error fetching records for advisor:', error);
      throw new Error('Failed to get pending students for the specified advisor');
    }
  };
}

export default Instructor;
