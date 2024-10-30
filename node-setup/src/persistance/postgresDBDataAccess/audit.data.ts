import { Sequelize } from 'sequelize';
import models from '../../models';
import { AuditRepo } from '../Repositories';
import { AuditType } from '../../types';

class AuditData implements AuditRepo {
  getByuserId = async (userId: string): Promise<AuditType[] | undefined> => {
    try {
      const audits = await models.Audit.findAll({ where: { userId } });

      return audits.map((audit) => {
        const auditData = audit.get() as AuditType;

        // Separate entity IDs based on their types
        const studentId = auditData.entityTypes.includes('student')
          ? auditData.entityIds[auditData.entityTypes.indexOf('student')]
          : null;
        const courseId = auditData.entityTypes.includes('course')
          ? auditData.entityIds[auditData.entityTypes.indexOf('course')]
          : null;

        return {
          ...auditData,
          studentId,
          courseId,
        };
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the audits, please try again!');
    }
  };

  getAll = async (): Promise<AuditType[] | undefined[]> => {
    try {
      const audits = await models.Audit.findAll({ });

      return audits.map((audit) => audit.get() as AuditType);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the audits, please try again!');
    }
  };
}

export default AuditData;
