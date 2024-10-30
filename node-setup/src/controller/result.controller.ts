import { NextFunction, Request, Response } from 'express';
import { Get, Route } from 'tsoa';
import { hashPassword, isPasswordValid } from '../util/hashing';
import { signUser } from '../util/auth.util';
import { Result } from '../services';
import { IResult } from '../services/interfaces';
import { DataAccess } from '../persistance';
import { ResultType } from '../types';

import { parseCSV } from '../util/csvParser';

// Assuming CourseDataAccess and UserDataAccess are part of DataAccess
const {
  ResultDataAccess, SemesterDataAccess, CourseDataAcces, StudentDataAccess, GradesDataAccess,
} = DataAccess;

class ResultController {
  private result: IResult;

  constructor() {
    const resultDataAccess = new ResultDataAccess();
    const semesterDataAccess = new SemesterDataAccess();
    const studentDataAccess = new StudentDataAccess();
    const gradeDataAccess = new GradesDataAccess();
    const courseDataAccess = new CourseDataAcces();
    this.result = new Result(resultDataAccess, studentDataAccess, courseDataAccess, semesterDataAccess, gradeDataAccess);
  }

  uploadStudentsResults = async (req: Request, res: Response): Promise<void> => {
    try {
      const filePath = req.file?.path;
      if (!filePath) {
        res.status(400).send({ msg: 'CSV file is required' });
      } else {
        const parsedData = await parseCSV<ResultType>(filePath);
        console.log(parsedData);
        const results = await this.result.uploadResults(parsedData);
        res.status(201).json({ message: 'done', results });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to create results' });
    }
  };

  updateResultById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedResult = await this.result.updateResultbyId(id, updatedData);
      res.status(200).json(updatedResult);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the result' });
    }
  };

  getStudentResult = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = req.params;
      const transcript = await this.result.getStudentResult(studentId);

      if (transcript.length === 0) {
        res.status(404).json({ message: 'Transcript not found' });
      } else {
        res.status(200).json({ message: 'done', results: transcript });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve transcript' });
    }
  };

  // Method to get course result by student ID, course ID, and semester ID
  async getStudentCourseResult(req: Request, res: Response): Promise<void> {
    try {
      const { studentId, courseId, semesterId } = req.params;
      const result = await this.result.getStudentCourseResult(studentId, courseId, semesterId);

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'Course result not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve course result' });
    }
  }

  // Method to get semester results by student ID and semester ID
  async getStudentSemesterResult(req: Request, res: Response): Promise<void> {
    try {
      const { studentId, semesterId } = req.params;
      const results = await this.result.getStudentSemesterResult(studentId, semesterId);

      if (results.length === 0) {
        res.status(404).json({ message: 'Semester results not found' });
      } else {
        res.status(200).json(results);
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve semester results' });
    }
  }

  getAllResults = async (req: Request, res: Response): Promise<void> => {
    try {
      const results = await this.result.getAllResults();

      if (results.length === 0) {
        res.status(404).json({ message: 'no results' });
      } else {
        res.status(200).json({ message: 'done', results });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve semester results' });
    }
  };

  deleteResult = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedResult = await this.result.deleteResultById(id);

      if (!deletedResult) {
        return res.status(404).json({ message: 'Reult not found' });
      }

      res.status(200).json({ message: 'Reult deleted successfully' });
    } catch (e) {
      next(e);
    }
  };
}

export default new ResultController();
