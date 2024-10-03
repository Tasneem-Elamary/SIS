import { NextFunction, Request, Response } from 'express';
import { Get, Route } from 'tsoa';
import { hashPassword, isPasswordValid } from '../util/hashing';
import { signUser } from '../util/auth.util';
import { FacultyAdmin } from '../services';
// import { IfacultyAdmin, IUniversityAdmin } from '../services/interfaces';
import { DataAccess } from '../persistance';
import {
  UserType, InstructorType, CourseType, DepartmentType, StudentAdvisorType, GradeType, SemesterType, FacultyType, UniversityType,
} from '../types';
import { UserRepo } from '../persistance/Repositories';
import { UniversityDataAccess } from '../persistance/postgresDBDataAccess';
// import UniversityAdmin from '../services/';
// import { DataAccess } from '../persistance/postgresDBDataAccess';

const {
  UserDataAccess, InstructorDataAccess, CourseDataAcces, DepartmentDataAccess, FacultyDataAccess, GradesDataAccess, SemesterDataAccess,
} = DataAccess;

// class FacultyAdminController {
//   private universityAdmin: IUniversityAdmin;

//   constructor() {
//     const userDataAccess = new UserDataAccess();
//     const instructorDataAccess = new InstructorDataAccess();
//     const courseDataAcces = new CourseDataAcces();
//     const departmentDataAccess = new DepartmentDataAccess();
//     const gradeDataAccess = new GradesDataAccess();
//     const semesterDataAccess = new SemesterDataAccess();
//     const facultyDataAccess = new FacultyDataAccess();
//     const universityDataAccess = new UniversityDataAccess();
//     this.universityAdmin = new UniversityAdmin(
//       userDataAccess,
//       instructorDataAccess,
//       courseDataAcces,
//       departmentDataAccess,
//       gradeDataAccess,
//       semesterDataAccess,
//       facultyDataAccess,
//       universityDataAccess,
//     );
//   }

// }
