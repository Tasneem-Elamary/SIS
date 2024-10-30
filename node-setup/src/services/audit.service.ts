import { IAudit } from './interfaces';
import { AuditRepo } from '../persistance/Repositories';
import {
  AuditType,
} from '../types';

class Audit implements IAudit {
  constructor(private auditData:AuditRepo) {
  }

  getByuserId = async (userid: string): Promise<AuditType[] | undefined> => {
    try {
      const audits = await this.auditData.getByuserId(userid);

      return audits;
    } catch {
      throw new Error('Failed to get the department.');
    }
  };

  getAll = async (): Promise<AuditType[] | undefined[]> => {
    try {
      const audits = await this.auditData.getAll();

      return audits;
    } catch {
      throw new Error('Failed to get the department.');
    }
  };
}

export default Audit;
