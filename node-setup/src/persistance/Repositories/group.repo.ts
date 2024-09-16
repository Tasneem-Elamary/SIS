import { GroupType } from '../../types';

interface GroupRepo {
  create(group: GroupType): Promise<GroupType | undefined>;
  getByGroupCode(groupCode: string): Promise<GroupType | undefined>;
  getById(id: string): Promise<GroupType | undefined>;
  getAll(): Promise<GroupType[] | undefined>;
  update(id: string, updateData: Partial<GroupType>): Promise<GroupType | undefined>;
  delete(id: string): Promise<boolean>;
}

export default GroupRepo;
