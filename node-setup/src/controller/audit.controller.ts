import { NextFunction, Request, Response } from 'express';

import { Audit } from '../services';
import { IAudit } from '../services/interfaces';
import { DataAccess } from '../persistance';
import { AuditType } from '../types';

// Assuming CourseDataAccess and UserDataAccess are part of DataAccess
const { AuditDataAccess } = DataAccess;

class AuditController {
  private audit: IAudit;

  constructor() {
    const auditDataAccess = new AuditDataAccess();
    this.audit = new Audit(auditDataAccess);
  }

  getByuserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const audits = await this.audit.getByuserId(userId);
      res.status(200).json({ mesage: 'done', audits });
    } catch (e) {
      next(e);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const audits = await this.audit.getAll();
      res.status(200).json({ mesage: 'done', audits });
    } catch (e) {
      next(e);
    }
  };
}

export default new AuditController();
