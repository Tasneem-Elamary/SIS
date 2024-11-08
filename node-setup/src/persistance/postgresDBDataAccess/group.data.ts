import {
  Group, Schedule, Section, Student, StudentSchedule,
} from '../../models';
import { db } from '../../../config/postgresDB.config';
import { GroupType, SectionType, StudentType } from '../../types';

class GroupDataAccess {
  create = async (group: GroupType, transaction?: any): Promise<GroupType | undefined> => {
    try {
      const newGroup = await Group.create(group, { transaction });
      return newGroup.get();
    } catch (error) {
      console.error('Failed to create the group:', error);
      throw new Error('Failed to create the group, please try again!,error');
    }
  };

  getByGroupCode = async (groupCode: string): Promise<GroupType | undefined> => {
    try {
      const group = await Group.findOne({ where: { groupCode } });
      return group ? (group.get() as GroupType) : undefined;
    } catch (error) {
      console.error('Failed to find the group by group code:', error);
      throw new Error('Failed to find the group, please try again!');
    }
  };

  getByGroupCodeAndCapacity = async (groupCode: string, capacity:number): Promise<GroupType | undefined> => {
    try {
      const group = await Group.findOne({ where: { groupCode, capacity } });
      return group ? (group.get() as GroupType) : undefined;
    } catch (error) {
      console.error('Failed to find the group by group code and capacity:', error);
      throw new Error('Failed to find the group, please try again!');
    }
  };

  getById = async (id: string): Promise<GroupType | undefined> => {
    try {
      const group = await Group.findOne({ where: { id } });
      return group ? (group.get() as GroupType) : undefined;
    } catch (error) {
      console.error('Failed to find the group by ID:', error);
      throw new Error('Failed to find the group, please try again!');
    }
  };

  getAll = async (): Promise<GroupType[]> => {
    try {
      const groups = await Group.findAll();
      return groups.map((group) => group.get() as GroupType);
    } catch (error) {
      console.error('Failed to get all groups:', error);
      throw new Error('Failed to get all groups, please try again!');
    }
  };

  update = async (id: string, updateData: Partial<GroupType>): Promise<GroupType | undefined> => {
    const transaction = await db.transaction();
    try {
      const group = await Group.findByPk(id, { transaction });

      if (!group) {
        console.error('Group not found');
        await transaction.rollback();
        return undefined;
      }

      await group.update(updateData, { transaction });
      await transaction.commit();

      return group.get() as GroupType;
    } catch (error) {
      await transaction.rollback();
      console.error('Failed to update group:', error);
      throw new Error('Failed to update the group, please try again!');
    }
  };

  delete = async (id: string): Promise<boolean> => {
    const transaction = await db.transaction();
    try {
      const group = await Group.findByPk(id, { transaction });

      if (!group) {
        console.error('Group not found');
        await transaction.rollback();
        return false;
      }

      await group.destroy({ transaction });
      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      console.error('Failed to delete group:', error);
      throw new Error('Failed to delete the group, please try again!');
    }
  };

  async getStudentsInASpecificGroup(CourseId: string, SectionId:string): Promise<StudentType[]> {
    const students = await StudentSchedule.findAll({
      where: { CourseId, SectionId },
      include: [{ model: Student }],
    });
    return students.map((student) => student.get({ plain: true }));
  }

  async getSectionsInASpecificGroup(CourseId: string, GroupId: string):Promise<Partial<SectionType>[]> {
    const sections = await Schedule.findAll({
      where: { CourseId, GroupId },
      include: [{ model: Section }],
    });
    return sections.map((section) => section.get({ plain: true }));
  }
}

export default GroupDataAccess;
