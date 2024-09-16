import { QueryTypes } from 'sequelize';
import User from './user.service';
import { IfacultyAdmin } from './interfaces';
import {
  UserRepo, InstructorRepo, CourseRepo, DepartmentRepo, SemesterRepo,
  GradesRepo,
} from '../persistance/Repositories';
import {
  UserType, StudentType, InstructorType, CourseType, DepartmentType, StudentAdvisorType, GradeType, SemesterType,
} from '../types';
import { sequelize } from '../models';
import { db } from '../../config/postgresDB.config';

class FacultyAdmin extends User implements IfacultyAdmin {
  constructor(
    userData: UserRepo,
    private instructorData: InstructorRepo,
    private courseData: CourseRepo,
    private departmentData: DepartmentRepo,
    private gradeRepo: GradesRepo,
    private semsterRepo: SemesterRepo,
  ) {
    super(userData);
  }

  createFacultyAdmin = async (facultyAdmin:UserType): Promise<UserType | undefined> => {
    try {
      const newUser = await this.userData.create(facultyAdmin);
      return newUser;
    } catch {
      throw new Error('Fail to create the facultyAdmin, Please try again !!');
    }
  };
}

export default FacultyAdmin;
