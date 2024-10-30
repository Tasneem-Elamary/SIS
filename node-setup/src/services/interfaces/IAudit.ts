import { AuditType } from '../../types';

interface AuditRepo {
  getByuserId(userId: string): Promise<AuditType[] | undefined>;

  getAll(): Promise<AuditType[]|undefined[]>;

}
export default AuditRepo;
