import { GroupType } from '../../types';

interface IGroup {
  create(group: GroupType): Promise<GroupType | undefined>;
  getByCode(code: string): Promise<GroupType | undefined>;
  getById(id: string): Promise<GroupType | undefined>;
  getAll(): Promise<GroupType[]|undefined>;
  update(id: string, updateData: Partial<GroupType>): Promise<GroupType | undefined>;
  delete(id: string): Promise<boolean>;
}

export default IGroup;
