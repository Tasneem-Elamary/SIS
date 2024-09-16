import { PassThrough } from 'stream';

import { IStudent } from './interfaces';
import { StudentType, UserType, ResultType } from '../types';
import { ResultRepo, StudentRepo } from '../persistance/Repositories';
import UserService from './user.service';

class StudentService implements IStudent {
//   eslint-disable-next-line no-useless-constructor
  constructor(private StudentData: StudentRepo, private ResultData:ResultRepo) {}

  public createStudents = async (studentsData: (StudentType&UserType)[]): Promise<(StudentType&UserType)[]> => {
    try {
      studentsData.forEach((studentData) => {
        this.create(studentData);
      });
      return studentsData;
    } catch (error) {
      throw new Error('Failed to create multiple students through CSV');
    }
  };

  public create = async (student:StudentType&UserType): Promise<StudentType|undefined> => {
    try {
      const newUser = await this.StudentData.create(student);
      return newUser;
    } catch (error) {
      throw new Error('Failed to create the user, Please try again!');
    }
  };

  public getAllStudents = async (): Promise<(StudentType& { email: string })[]> => {
    try {
      const newUser = await this.StudentData.getAll(); // Call the getAll method in UserDataAccess
      return newUser;
    } catch (error) {
      console.log('service debug:', error);
      throw new Error('Failed to get All Students, Please try again!');
    }
  };

  public updateStudent = async (studentId: string, updateData: Partial<StudentType>): Promise<StudentType|null> => {
    try {
      const updatedStudent = await this.StudentData.update(studentId, updateData);
      if (!updatedStudent) {
        throw new Error('Student not found');
      }
      return updatedStudent;
    } catch (error) {
      throw new Error('Failed to update the student');
    }
  };

  public deleteStudent = async (studentId: string): Promise<boolean> => {
    try {
      const deletionSuccess = await this.StudentData.delete(studentId);
      return deletionSuccess;
    } catch (error) {
      console.error('Error deleting student:', error);
      throw new Error('Failed to delete the student, Please try again!');
    }
  };

  getById = (id: string) => {
    try {
      return this.StudentData.getById(id);
    } catch {
      throw new Error('Fail to get the Student Data, Please try again !!');
    }
  };

  getStudentByCode = async (studentCode: string): Promise<StudentType | undefined> => {
    try {
      const student = await this.StudentData.getStudentByCode(studentCode);
      return student;
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  };

  public registerSchedule = async (studentId: string, scheduleId: string): Promise<void> => {
    try {
      await this.StudentData.registerSchedule(studentId, scheduleId);
    } catch (error) {
      throw new Error('Failed to register the schedule, Please try again!');
    }
  };

  public unregisterSchedule = async (studentId: string, scheduleId: string): Promise<void> => {
    try {
      await this.StudentData.unregisterSchedule(studentId, scheduleId);
    } catch (error) {
      throw new Error('Failed to unregister the schedule, Please try again!');
    }
  };
  // getByEmail = (email: string) => {w
  //   try {
  //     return this.userData.getByEmail(email);
  //   } catch {
  //     throw new Error('Fail to get the user Data, Please try again !!');
  //   }
  // };
}

export default StudentService;
