import { NextFunction, Request, Response } from 'express';
import { ScheduleService } from '../services';
import { ScheduleDataAccess } from '../persistance/postgresDBDataAccess/schedule.data';
import ScheduleInputType from '../types/scheduleInput';
import { parseCSV } from '../util/csvParser';

class ScheduleController {
  private scheduleService: ScheduleService;

  constructor() {
    const scheduleRepo = new ScheduleDataAccess();
    this.scheduleService = new ScheduleService(scheduleRepo);
  }

  public createSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        instructorCode,
        scheduleType,
        roomCode,
        groupCode,
        groupCapacity,
        sectionCode,
        sectionCapacity,
        courseCode,
        startTime,
        endTime,
        day,
      } = req.body;

      const createdSchedule = await this.scheduleService.createSchedule(
        instructorCode,
        scheduleType,
        roomCode,
        groupCode,
        groupCapacity,
        sectionCode,
        sectionCapacity,
        courseCode,
        startTime,
        endTime,
        day,
      );

      res.status(201).json({ message: 'Schedule created successfully', createdSchedule });
    } catch (e) {
      next(e);
    }
  };

  public getSchedule = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const schedule = await this.scheduleService.getScheduleById(id);
      if (schedule) {
        res.status(200).json({ message: 'Schedule exists', schedule });
      } else {
        res.status(404).json({ message: 'Schedule not found!' });
      }
    } catch (error) {
      next(error);
    }
  };

  public uploadCSVSchedules = async (req: Request, res: Response, next: NextFunction) => {
    const filePath = req.file?.path;
    if (!filePath) {
      return res.status(400).send({ msg: 'CSV file is required' });
    }

    try {
      const parsedData = await parseCSV<ScheduleInputType>(filePath);
      await this.scheduleService.createSchedules(parsedData);
      return res.status(201).send({ msg: 'Schedule created successfully' });
    } catch (error) {
      return res.status(500).send({ message: `couldn;t create schedules due to${error}` });
    }
  };

  public getAllSchedules = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schedules = await this.scheduleService.getAllSchedules();
      res.status(200).json({ message: 'Succeeded', schedules });
    } catch (error) {
      next(error);
    }
  };

  public getInstructorSchedules = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const schedules = await this.scheduleService.getInstructorSchedules(id);
      res.status(200).json({ message: 'Succeeded', schedules });
    } catch (error) {
      next(error);
    }
  };

  public getRoomSchedules = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { schedules, roomData } = await this.scheduleService.getRoomSchedules(id);
      res.status(200).json({ message: 'Succeeded', schedules, roomData });
    } catch (error) {
      next(error);
    }
  };

  public getCourseSchedules = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const schedules = await this.scheduleService.getCourseSchedules(id);
      res.status(200).json({ message: 'Succeeded', schedules });
    } catch (error) {
      next(error);
    }
  };

  public updateSchedule = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updated = await this.scheduleService.updateSchedule(id, updateData);
      if (updated) {
        res.status(200).json({ message: 'Schedule updated successfully' });
      } else {
        res.status(404).json({ message: 'Schedule not found' });
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteSchedule = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const isDeleted = await this.scheduleService.deleteSchedule(id);
      if (isDeleted) {
        res.status(200).json({ message: 'Schedule deleted successfully' });
      } else {
        res.status(404).json({ message: 'Schedule not found' });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default new ScheduleController();
