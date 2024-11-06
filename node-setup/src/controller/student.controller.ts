import { NextFunction, Request, Response } from 'express';
import { Get, Route } from 'tsoa';
import { hashPassword, isPasswordValid } from '../util/hashing';
import { signUser } from '../util/auth.util';
import { User, Student } from '../services';
import { IStudent, IUser } from '../services/interfaces';
import { DataAccess } from '../persistance';
import { StudentType, UserType } from '../types';
import { UserRepo } from '../persistance/Repositories';
import StudentService from '../services/student.service';
import { parseCSV } from '../util/csvParser';
import auditservice from '../util/auditservice';

const { StudentDataAccess, ResultDataAccess, CourseDataAcces } = DataAccess;

class StudentController {
  private student: StudentService;

  constructor() {
    const studentDataAccess = new StudentDataAccess();
    const resultDataAcess = new ResultDataAccess();
    const courseDataAccess = new CourseDataAcces();
    this.student = new StudentService(studentDataAccess, resultDataAcess, courseDataAccess);
  }

  @Get('/{id}')
  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { id } = req.params;
        const student = await this.student.getById(id);
        if (student) {
          res.status(200).json(student);
        } else {
          res.status(404).json({ message: 'Student not found' });
        }
      } catch (error) {
        next(error);
      }
    };

  public getAllStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const students = await this.student.getAllStudents(); // Corrected method call
      res.status(200).json(students);
    } catch (error) {
      console.log('debugggggg', error);
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      studentCode, name, email, bylawCode,
    } = req.body;

    try {
      const student = await this.student.create({
        email,
        studentCode,
        name,
        bylawCode,
      });

      res.status(201).json({
        msg: 'User added successfully',
        student,
      });
    } catch (e) {
      next(e);
    }
  };

  public uploadCSVStudents = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const filePath = req.file?.path;
    if (!filePath) {
      return res.status(400).send({ msg: 'CSV file is required' });
    }

    try {
      const parsedData = await parseCSV<StudentType & UserType>(filePath);
      await this.student.createStudents(parsedData);
      return res.status(201).send({ msg: 'Students created successfully' });
    } catch (error) {
      next(error);
      return res.status(500).send({ msg: error });
    }
  };

  public updateStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { studentId } = req.params;
    const updateData = req.body;
    try {
      const updatedStudent = await this.student.updateStudent(studentId, updateData);
      if (!updatedStudent) {
        res.status(404).send({ msg: 'Student not found' });
      } else {
        res.status(200).send({ msg: 'Student updated successfully', updatedStudent });
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { studentId } = req.params;

    try {
      await this.student.deleteStudent(studentId);
      res.status(200).send({ msg: 'Student deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { studentIds } = req.body;
console.log(studentIds)
    try {
      const numOfDeletedRecords = await this.student.deleteStudents(studentIds);
      res.status(200).send({ msg: `${numOfDeletedRecords} records deleted successfully` });
    } catch (error) {
      next(error);
    }
  };

  public registerSchedule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { StudentId, ScheduleId } = req.body;
    console.log('Debugging from controller', StudentId, ScheduleId);
    try {
      await this.student.registerSchedule(StudentId, ScheduleId);
      res.status(200).send({ msg: 'Schedule registered successfully' });
    } catch (error) {
      next(error);
    }
  };

  public registerSchedules = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { StudentId } = req.params;
    const { scheduleIds } = req.body;
    console.log('Debugging from controller', StudentId, scheduleIds);
    try {
      await this.student.registerSchedules(StudentId, scheduleIds);
      res.status(200).send({ msg: 'Schedule registered successfully' });
    } catch (error) {
      next(error);
    }
  };

  public unregisterSchedule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { studentId, scheduleId } = req.body;
    try {
      await this.student.unregisterSchedule(studentId, scheduleId);
      res.status(200).send({ msg: 'Schedule unregistered successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getFailedOrNotEnrolledStudents = async (req: Request, res: Response) => {
    const { courseId } = req.params;

    try {
      const students = await this.student.studentFailedOrNotEnrolledCourse(courseId);

      if (students) {
        return res.status(200).json({
          success: true,
          data: students,
        });
      }
      return res.status(404).json({
        success: false,
        message: 'No students found for this course',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while fetching students',
        error,
      });
    }
  };

  public getStudentsInASpecificBylaw = async (req: Request, res: Response) => {
    const { courseId } = req.params;

    try {
      const students = await this.student.getStudentsForSpecificBylaw(courseId);

      if (students) {
        return res.status(200).json({
          success: true,
          data: students,
        });
      }
      return res.status(404).json({
        success: false,
        message: 'No students found for this course',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while fetching students',
        error,
      });
    }
  };

  ApproveRegularRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { studentId } = req.params;
      const schedulecell = parseInt(req.params.schedulecell, 10);
      const { courseType } = req.body;
      const student :any = await this.student.ApproveRegularRequest(studentId, schedulecell);
      console.log(student);
      auditservice.logAudit({
        action: 'Approve Regular Request',
        userId: req?.user?.id as string, // Admin performing the action
        entityIds: [student?.studentCode, student?.Courses?.[0].code], // Array of entity IDs
        entityTypes: ['student', 'course'], // Array of entity types
        details: 'TA  approved student  Regular Request with course.',
      });
      res.status(200).json({ message: 'done', student });
    } catch (e) {
      next(e);
    }
  };

  ApproveSelfstudyOROverloadRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { studentId, courseCode, courseType } = req.params;
      // const { courseType } = req.body;
      const student:any = await this.student.ApproveSelfstudyOROverloadRequest(studentId, courseCode, courseType);
      auditservice.logAudit({
        action: `Approve ${courseType} Request`,
        userId: req?.user?.id as string, // Admin performing the action
        entityIds: [student?.studentCode, student?.Courses?.[0].code], // Array of entity IDs
        entityTypes: ['student', 'course'], // Array of entity types
        details: `TA  approved student  ${courseType} Request with course.`,
      });
      res.status(200).json({ message: 'done', student });
    } catch (e) {
      next(e);
    }
  };

  RejectRegularRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { studentId } = req.params;
      const schedulecell = parseInt(req.params.schedulecell, 10);
      const student:any = await this.student.RejectRegularRequest(studentId, schedulecell);
      auditservice.logAudit({
        action: 'Reject Regular Request',
        userId: req?.user?.id as string, // Admin performing the action
        entityIds: [student?.studentCode, student?.Courses?.[0].code], // Array of entity IDs
        entityTypes: ['student', 'course'], // Array of entity types
        details: 'TA  Rejected student  Regular Request with course.',
      });
      res.status(200).json({ message: 'done', student });
    } catch (e) {
      next(e);
    }
  };

  RejectSelfstudyRequestOROverload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { studentId, courseCode, courseType } = req.params;
      // const { courseType } = req.body;
      const student:any = await this.student.RejectSelfstudyRequestOROverload(studentId, courseCode, courseType);
      auditservice.logAudit({
        action: `Reject ${courseType} Request`,
        userId: req?.user?.id as string, // Admin performing the action
        entityIds: [student?.studentCode, student?.Courses?.[0].code], // Array of entity IDs
        entityTypes: ['student', 'course'], // Array of entity types
        details: `TA  Rejected student  ${courseType} Request with course.`,
      });
      res.status(200).json({ message: 'done', student });
    } catch (e) {
      next(e);
    }
  };

  hasCompletedPrerequisitesAndEarnedHours = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { studentId, courseId } = req.params; // scheduleId is not needed here if you're only checking prerequisites
      const studentHasCompleted = await this.student.hasCompletedPrerequisitesAndEarnedHours(studentId, courseId);

      if (!studentHasCompleted) {
        return res.status(400).json({ message: 'Prerequisites or earned hours not satisfied.' });
      }

      next();
    } catch (e) {
      next(e);
    }
  };

  public getTopStudentsByGPA = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { prefix } = req.params;
      const limit = parseInt(req.params.limit, 10);

      const students = await this.student.getTopStudentsByGPA(prefix, limit); // Corrected method call
      res.status(200).json({ message: 'done', students });
    } catch (error) {
      next(error);
    }
  };

  public getStudentRank = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { studentCode } = req.params;

      const rank = await this.student.getStudentRank(studentCode); // Corrected method call
      res.status(200).json({ message: 'done', rank });
    } catch (error) {
      next(error);
    }
  };

  // Commented out login example
  // login = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { body: { email, password } } = req;
  //     const user = await this.user.getByEmail(email);
  //     if (user && isPasswordValid(user.password, password)) {
  //       const token = signUser(user);
  //       res.send({
  //         msg: 'Sign in successfully',
  //         token,
  //       });
  //     } else {
  //       throw new Error('Email and password not match, Please try again !!');
  //     }
  //   } catch (e) {
  //     next(e);
  //   }
  // };
}

export default new StudentController();
