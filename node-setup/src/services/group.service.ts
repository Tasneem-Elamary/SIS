import GroupRepo from '../persistance/Repositories/group.repo';
import { GroupType } from '../types';

import IGroup from './interfaces/IGroup';

class GroupService implements IGroup {
  private groupRepo: GroupRepo;

  constructor(groupRepo: GroupRepo) {
    this.groupRepo = groupRepo;
  }

  async create(groupData: GroupType): Promise<GroupType | undefined> {
    return this.groupRepo.create(groupData);
  }

  async getByCode(groupCode: string): Promise<GroupType | undefined> {
    return this.groupRepo.getByGroupCode(groupCode);
  }

  async getById(id: string): Promise<GroupType | undefined> {
    return this.groupRepo.getById(id);
  }

  async getAll(): Promise<GroupType[]| undefined> {
    return this.groupRepo.getAll();
  }

  async update(id: string, updateData: Partial<GroupType>): Promise<GroupType | undefined> {
    return this.groupRepo.update(id, updateData);
  }

  async delete(id: string): Promise<boolean> {
    return this.groupRepo.delete(id);
  }
}

export default GroupService;
