import { PassThrough } from 'stream';

import { IStudent } from './interfaces';
import { StudentType, UserType } from '../types';
import { StudentRepo } from '../persistance/Repositories';
import UserService from './user.service';

class StudentService implements IStudent {
//   eslint-disable-next-line no-useless-constructor
  constructor(private StudentData: StudentRepo) {}

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
      const newUser = await this.StudentData.create(student); // Call the create method in UserDataAccess
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

  // getByEmail = (email: string) => {w
  //   try {
  //     return this.userData.getByEmail(email);
  //   } catch {
  //     throw new Error('Fail to get the user Data, Please try again !!');
  //   }
  // };
}

export default StudentService;
