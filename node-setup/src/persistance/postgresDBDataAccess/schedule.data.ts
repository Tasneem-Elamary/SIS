import { Model, Op, where } from 'sequelize';
import {
  Bylaw, BylawRule, Course, CourseEnrollment, CoursePrerequisite, Grade, Group, Instructor, Result, Room, Schedule, Section, Slot,
  Student,
  StudentSchedule,
} from '../../models';
import models from '../../models';
import {
  CourseEnrollmentType,
  CourseType, GroupType, InstructorType, RoomType, ScheduleType, SectionType, SlotType,
} from '../../types';
import { ScheduleRepo } from '../Repositories';
import RoomDataAccess from './room.data';
import InstructorDataAccess from './instructor.data';

export class ScheduleDataAccess implements ScheduleRepo {
  private roomDataAccess = new RoomDataAccess();

  private instructorDataAccess = new InstructorDataAccess();

  async create(schedule: ScheduleType): Promise<ScheduleType> {
    const createdSchedule = await Schedule.create(schedule);
    return createdSchedule.toJSON();
  }

  public getById = async (id: string): Promise<Partial<ScheduleType>
    & {
      instructor?: Partial<InstructorType>,
      course?: Partial<CourseType>,
      slot?: Partial<SlotType>,
      group?: Partial<GroupType>,
      section?: Partial<SectionType>,
      room?: Partial<RoomType>
    }> => {
    try {
      const schedule = await Schedule.findByPk(id, {
        include: [
          { model: Instructor, attributes: ['id', 'firstName', 'lastName'] },
          { model: Course, attributes: ['id', 'code', 'name', 'creditHours'] },
          { model: Slot, attributes: ['startTime', 'endTime', 'day'] },
          { model: Group, attributes: ['id', 'groupCode', 'capacity'] },
          { model: Section, attributes: ['id', 'sectionCode', 'capacity'] },
          { model: Room, attributes: ['id', 'code', 'capacity'] },
        ],
        attributes: ['scheduleType', 'cell', 'level'],

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
        { model: Instructor, attributes: ['id', 'firstName', 'lastName'] },
        { model: Course, attributes: ['id', 'code', 'name', 'creditHours'] },
        { model: Slot, attributes: ['startTime', 'endTime', 'day'] },
        { model: Group, attributes: ['id', 'groupCode', 'capacity'] },
        { model: Section, attributes: ['id', 'sectionCode', 'capacity'] },
        { model: Room, attributes: ['id', 'code', 'capacity'] },
      ],
      attributes: ['scheduleType', 'cell', 'level'],

    });
    return schedules.map((schedule) => schedule.toJSON());
  }

  public async getInstructorSchedules(InstructorId: string): Promise<{ schedules: ScheduleType[], instructorData: (InstructorType | undefined) }> {
    const instructor = await Instructor.findByPk(InstructorId);

    if (!instructor) {
      console.warn(`Instructor with ID ${InstructorId} not found`);
      return { schedules: [], instructorData: undefined };
    }

    const schedules = await Schedule.findAll({
      where: { InstructorId },
      include: [
        { model: Course, attributes: ['id', 'code', 'name', 'creditHours'] },
        { model: Slot, attributes: ['startTime', 'endTime', 'day'] },
        { model: Group, attributes: ['id', 'groupCode', 'capacity'] },
        { model: Section, attributes: ['id', 'sectionCode', 'capacity'] },
        { model: Room, attributes: ['id', 'code', 'capacity'] },
      ],
      attributes: ['scheduleType', 'cell', 'level'],

    });

    return {
      schedules: schedules.map((schedule) => schedule.toJSON() as ScheduleType),
      instructorData: instructor.get() as InstructorType,
    };
  }

  public async getRoomSchedules(RoomId: string): Promise<{ schedules: ScheduleType[], roomData: RoomType }> {
    const roomData = await this.roomDataAccess.getById(RoomId);
    if (!roomData) {
      throw Error("couldn't get room details");
    }
    const schedules = await Schedule.findAll({
      where: { RoomId },
      include: [
        { model: Instructor, attributes: ['firstName', 'lastName'] },
        { model: Course, attributes: ['code', 'name', 'creditHours'] },
        { model: Slot, attributes: ['startTime', 'endTime', 'day'] },
        { model: Group, attributes: ['groupCode', 'capacity'] },
        { model: Section, attributes: ['sectionCode', 'capacity'] },

      ],
      attributes: ['scheduleType', 'cell', 'level'],

    });
    return { schedules: schedules.map((schedule) => schedule.toJSON()), roomData };
  }

  public async getCourseSchedules(CourseId: string): Promise<{ schedules: ScheduleType[], courseData: CourseType }> {
    const courseData = await Course.findByPk(CourseId);
    const schedules = await Schedule.findAll({

      where: { CourseId },
      include: [
        { model: Instructor, attributes: ['firstName', 'lastName'] },
        { model: Slot, attributes: ['startTime', 'endTime', 'day'] },
        { model: Group, attributes: ['groupCode', 'capacity'] },
        { model: Section, attributes: ['sectionCode', 'capacity'] },
        { model: Room, attributes: ['code', 'capacity'] },
      ],
      attributes: ['scheduleType', 'cell', 'level'],

    });
    return { schedules: schedules.map((schedule) => schedule.toJSON()), courseData: courseData?.get() };
  }

  public async getLevelSchedules(level: number): Promise<{ schedules: ScheduleType[] }> {
    const schedules = await Schedule.findAll({
      where: { level },
      include: [
        { model: Course, attributes: ['id', 'code', 'name', 'creditHours'] },
        { model: Slot, attributes: ['startTime', 'endTime', 'day'] },
        { model: Group, attributes: ['id', 'groupCode', 'capacity'] },
        { model: Section, attributes: ['id', 'sectionCode', 'capacity'] },
        { model: Room, attributes: ['id', 'code', 'capacity'] },
      ],
      attributes: ['scheduleType', 'cell', 'level'],
    });
    if (!schedules) {
      throw new Error('No schedules found');
    }
    return { schedules: schedules.map((schedule) => schedule.get({ plain: true })) };
  }

  public async getDepartmentSchedules(DepartmentId: string): Promise<{ schedules: ScheduleType[] }> {
    const schedules = await Schedule.findAll({
      where: { DepartmentId },
      include: [
        { model: Course, attributes: ['id', 'code', 'name', 'creditHours'] },
        { model: Slot, attributes: ['startTime', 'endTime', 'day'] },
        { model: Group, attributes: ['id', 'groupCode', 'capacity'] },
        { model: Section, attributes: ['id', 'sectionCode', 'capacity'] },
        { model: Room, attributes: ['id', 'code', 'capacity'] },
      ],
      attributes: ['scheduleType', 'cell', 'level'],
    });
    if (!schedules) {
      throw new Error('No schedules found');
    }
    return { schedules: schedules.map((schedule) => schedule.get({ plain: true })) };
  }

  public async getStudentToReisterSchedules(StudentId: string): Promise<{ message: string, schedules: any[] }> {
    try {
      const enrolledCourses = await CourseEnrollment.findAll({
        where: { StudentId },
        attributes: ['CourseId'],
      });

      const enrolledCourseIds = enrolledCourses.map((enrollment) => enrollment.get({ plain: true }).CourseId); // No more error here

      const schedules = await Schedule.findAll({
        where: {
          CourseId: {
            [Op.notIn]: enrolledCourseIds,
          },
        },
        include: [

          {
            model: Student,

            include: [{ model: Bylaw, include: [BylawRule] }],
            attributes: ['GPA'],
          },
          {
            model: Course,
            attributes: ['id', 'code', 'name', 'creditHours'],

            include: [

              {
                model: Result,
                required: false,
                include: [
                  {
                    model: Grade,
                    where: {
                      [Op.or]: [{ letter: 'F' }],
                    },
                    attributes: [],
                  },
                ],
                where: { StudentId },
                attributes: [],
              },
              {
                model: Course,
                as: 'Prerequisite',
                attributes: ['id', 'name'],
                include: [
                  {
                    model: Result,
                    required: false,
                    include: [
                      {
                        model: Grade,
                        where: { letter: { [Op.ne]: 'F' } },
                        attributes: [],
                      },
                    ],
                    where: { StudentId },
                    attributes: [],
                  },
                ],
              },
            ],
          },
          { model: Slot, attributes: ['startTime', 'endTime', 'day'] },
          { model: Group, attributes: ['id', 'groupCode', 'capacity'] },
          { model: Section, attributes: ['id', 'sectionCode', 'capacity'] },
          { model: Room, attributes: ['id', 'code', 'capacity'] },
          { model: Instructor, attributes: ['id', 'firstName', 'lastName'] },
        ],
        attributes: ['id', 'scheduleType', 'cell', 'level'],
      });

      if (!schedules) {
        throw new Error('No schedules found');
      }

      return {
        message: 'Succeeded',
        schedules: schedules.map((schedule) => schedule.get({ plain: true })),
      };
    } catch (error) {
      console.log('register schedule data access error:', error);
      throw Error('Failed to get schedules student allowed to register');
    }
  }

  public async getStudentSchedules(StudentId: string): Promise<{ schedules: ScheduleType[] }> {
    const schedules = await models.StudentSchedule.findAll({
      where: { StudentId, approvalStatus: 'approved' },
      include: [
        {
          model: models.Schedule,
          include: [
            { model: Course, attributes: ['id', 'code', 'name'] },
            { model: Slot, attributes: ['startTime', 'endTime', 'day'] },
            { model: Group, attributes: ['id', 'groupCode', 'capacity'] },
            { model: Section, attributes: ['id', 'sectionCode', 'capacity'] },
            { model: Room, attributes: ['id', 'code', 'capacity'] },
            { model: Instructor, attributes: ['id', 'firstName', 'lastName'] },
          ],
          attributes: ['scheduleType', 'cell', 'level'],

        },

      ],
      attributes: [],
    });
    console.log(schedules);
    if (!schedules) {
      throw new Error('No schedules found');
    }

    return {
      schedules: schedules.map((schedule) => schedule.get().Schedule),

    };
  }

  public async getStudentPendingSchedules(StudentId: string): Promise<{ schedules: ScheduleType[] }> {
    const schedules = await StudentSchedule.findAll({
      where: { StudentId, approvalStatus: 'pending' },
      include: [
        {
          model: Schedule,
          include: [
            { model: Course, attributes: ['id', 'code', 'name'] },
            { model: Slot, attributes: ['startTime', 'endTime', 'day'] },
            { model: Group, attributes: ['id', 'groupCode', 'capacity'] },
            { model: Section, attributes: ['id', 'sectionCode', 'capacity'] },
            { model: Room, attributes: ['id', 'code', 'capacity'] },
            { model: Instructor, attributes: ['id', 'firstName', 'lastName'] },
          ],
          attributes: ['scheduleType', 'cell', 'level'],

        },

      ],
      attributes: [],
    });

    if (!schedules) {
      throw new Error('No schedules found');
    }

    return {
      schedules: schedules.map((schedule) => schedule.get().Schedule),

    };
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
