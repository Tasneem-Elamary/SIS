import { Request, Response, NextFunction } from 'express';
import { SemesterDataAccess } from '../persistance/postgresDBDataAccess/semester.data';
import { SemesterService } from '../services/semester.service';

class SemesterController {
  private semesterService: SemesterService;

  constructor() {
    const semesterRepo = new SemesterDataAccess();
    this.semesterService = new SemesterService(semesterRepo);
  }

  public createSemester = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ...body } = req.body;
      const semester = await this.semesterService.createSemester(body);
      res.status(201).json({ message: 'Semester created successfully', semester });
    } catch (error) {
      next(error);
    }
  };
}

export default new SemesterController();
