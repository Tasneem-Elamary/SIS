import { NextFunction, Request, Response } from 'express';
import { Get, Route } from 'tsoa';
import { hashPassword, isPasswordValid } from '../util/hashing';
import { signUser } from '../util/auth.util';
import { FacultyAdmin } from '../services';
import { IfacultyAdmin } from '../services/interfaces';
import { DataAccess } from '../persistance';

const {
  UserDataAccess, InstructorDataAccess, CourseDataAcces, DepartmentDataAccess, FacultyDataAccess, GradesDataAccess, SemesterDataAccess,
} = DataAccess;

@Route('user')
class FacultyAdminController {
  private facultyAdmin: IfacultyAdmin;

  constructor() {
    const userDataAccess = new UserDataAccess();
    const instructorDataAccess = new InstructorDataAccess();
    const courseDataAcces = new CourseDataAcces();
    const departmentDataAccess = new DepartmentDataAccess();
    const gradeDataAccess = new GradesDataAccess();
    const semesterDataAccess = new SemesterDataAccess();
    this.facultyAdmin = new FacultyAdmin(
      userDataAccess,
      instructorDataAccess,
      courseDataAcces,
      departmentDataAccess,
      gradeDataAccess,
      semesterDataAccess,
    );
  }
}
export default new FacultyAdminController();
