import { NextFunction, Request, Response } from 'express';
import { parseCSV } from '../util/csvParser';
import ScheduleInputType from '../types/scheduleInput';

export const parseCSVFile = async (req: Request, res: Response, next: NextFunction) => {
  const filePath = req.file?.path;
  if (!filePath) {
    return res.status(400).send({
      status: 'error',
      message: 'CSV file is required',
    });
  }
  try {
    const parsedData = await parseCSV<ScheduleInputType>(filePath);
    req.body = parsedData;
    next();
  } catch (e) {
    next(e);
  }
};
