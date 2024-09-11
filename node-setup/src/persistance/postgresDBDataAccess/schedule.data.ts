import { Op } from 'sequelize';
import {
  Course, Group, Instructor, Room, Schedule, Section, Slot,
  Student,
} from '../../models';
import {
  CourseType, GroupType, InstructorType, RoomType, ScheduleType, SectionType, SlotType,
} from '../../types'; // Adjust path as necessary
import { ScheduleRepo } from '../Repositories';

export class ScheduleDataAccess implements ScheduleRepo {
  async create(schedule: ScheduleType): Promise<ScheduleType> {
    const createdSchedule = await Schedule.create(schedule);
    return createdSchedule.toJSON();
  }

  public getById = async (id: string): Promise<Partial<ScheduleType>
  & { instructor?: Partial<InstructorType>,
      course?: Partial<CourseType>,
      slot?: Partial<SlotType>,
      group?: Partial<GroupType>,
      section?: Partial<SectionType>,
      room?: Partial<RoomType>
    }> => {
    try {
      const schedule = await Schedule.findByPk(id, {
        include: [
          { model: Instructor, attributes: ['firstName', 'lastName'] },
          { model: Course, attributes: ['code', 'name', 'creditHours'] },
          { model: Slot, attributes: ['startTime', 'endTime', 'day'] },
          { model: Group, attributes: ['groupCode', 'capacity'] },
          { model: Section, attributes: ['sectionCode', 'capacity'] },
          { model: Room, attributes: ['code', 'capacity'] },
        ],
        attributes: ['scheduleType'], // Attributes from the Schedule model itself
      });

      if (!schedule) {
        throw new Error('Schedule not found!');
      }

      return schedule.get({ plain: true });
    } catch (error) {
      console.log(error);
      throw new Error('Failed to get the schedule, Please try again!');
    }
  };

  public async getAll(): Promise<ScheduleType[]> {
    const schedules = await Schedule.findAll({
      include: [
        { model: Instructor, attributes: ['firstName', 'lastName'] },
        { model: Course, attributes: ['code', 'name', 'creditHours'] },
        { model: Slot, attributes: ['startTime', 'endTime', 'day'] },
        { model: Group, attributes: ['groupCode', 'capacity'] },
        { model: Section, attributes: ['sectionCode', 'capacity'] },
        { model: Room, attributes: ['code', 'capacity'] },
      ],
      attributes: ['scheduleType'], // Attributes from the Schedule model itself
    });
    return schedules.map((schedule) => schedule.toJSON());
  }

  public async getInstructorSchedules(InstructorId:string): Promise<ScheduleType[]> {
    const schedules = await Schedule.findAll({
      where: { InstructorId },
      include: [
        { model: Instructor, attributes: ['firstName', 'lastName'] },
        { model: Course, attributes: ['code', 'name', 'creditHours'] },
        { model: Slot, attributes: ['startTime', 'endTime', 'day'] },
        { model: Group, attributes: ['groupCode', 'capacity'] },
        { model: Section, attributes: ['sectionCode', 'capacity'] },
        { model: Room, attributes: ['code', 'capacity'] },
      ],
      attributes: ['scheduleType'],
    });
    return schedules.map((schedule) => schedule.toJSON());
  }

  public async getRoomSchedules(RoomId:string): Promise<ScheduleType[]> {
    const schedules = await Schedule.findAll({
      where: { RoomId },
      include: [
        { model: Instructor, attributes: ['firstName', 'lastName'] },
        { model: Course, attributes: ['code', 'name', 'creditHours'] },
        { model: Slot, attributes: ['startTime', 'endTime', 'day'] },
        { model: Group, attributes: ['groupCode', 'capacity'] },
        { model: Section, attributes: ['sectionCode', 'capacity'] },
        { model: Room, attributes: ['code', 'capacity'] },
      ],
      attributes: ['scheduleType'],
    });
    return schedules.map((schedule) => schedule.toJSON());
  }

  public async getCourseSchedules(CourseId:string): Promise<ScheduleType[]> {
    const schedules = await Schedule.findAll({
      where: { CourseId },
      include: [
        { model: Instructor, attributes: ['firstName', 'lastName'] },
        { model: Course, attributes: ['code', 'name', 'creditHours'] },
        { model: Slot, attributes: ['startTime', 'endTime', 'day'] },
        { model: Group, attributes: ['groupCode', 'capacity'] },
        { model: Section, attributes: ['sectionCode', 'capacity'] },
        { model: Room, attributes: ['code', 'capacity'] },
      ],
      attributes: ['scheduleType'],
    });
    return schedules.map((schedule) => schedule.toJSON());
  }

  public async update(id: string, schedule: Partial<ScheduleType>): Promise<boolean> {
    const [updatedCount] = await Schedule.update(schedule, { where: { id } });
    return updatedCount > 0;
  }

  public async delete(id: string): Promise<boolean> {
    const deleteCount = await Schedule.destroy({ where: { id } });
    return deleteCount > 0;
  }

  public async findExistingSchedule(schedule: Partial<ScheduleType>): Promise<ScheduleType | null> {
    const existingSchedule = await Schedule.findOne({
      where: {
        scheduleType: schedule.scheduleType,
        GroupId: schedule.GroupId,
        SectionId: schedule.SectionId,
        SlotId: schedule.SlotId,
        RoomId: schedule.RoomId,
        CourseId: schedule.CourseId,
        InstructorId: schedule.InstructorId,
        SemesterId: schedule.SemesterId,
      },
    });
    return existingSchedule ? existingSchedule.toJSON() : null;
  }
}
