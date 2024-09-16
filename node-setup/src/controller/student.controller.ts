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

const { StudentDataAccess } = DataAccess;

class StudentController {
  private student: StudentService;

  constructor() {
    const studentDataAccess = new StudentDataAccess();
    this.student = new StudentService(studentDataAccess);
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

  public registerSchedule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { studentId, scheduleId } = req.body;
    try {
      await this.student.registerSchedule(studentId, scheduleId);
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

  // Commented out login example
  // login = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { body: { email, password } } = req;
  //     const user = await this.user.getByEmail(email);
  //     if (user && isPasswordValid(user.password, password)) {
  //       const token = signUser(user);
  //       res.send({
  //         msg: 'Signin successfully',
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
