import { ISchedule } from './interfaces/ISchedule';
import {
  CourseType, GroupType, InstructorType, RoomType, ScheduleType, SectionType, SlotType,
} from '../types';
import { ScheduleRepo } from '../persistance/Repositories';
import GroupDataAccess from '../persistance/postgresDBDataAccess/group.data';
import { SlotDataAccess } from '../persistance/postgresDBDataAccess/slot.data';
import { SectionDataAccess } from '../persistance/postgresDBDataAccess/section.data';
import InstructorData from '../persistance/postgresDBDataAccess/instructor.data';
import RoomDataAccess from '../persistance/postgresDBDataAccess/room.data';
import { SemesterDataAccess } from '../persistance/postgresDBDataAccess/semester.data';
import RoomService from './room.service';
import { CourseDataAcces } from '../persistance/postgresDBDataAccess';
import ScheduleInputType from '../types/scheduleInput';

class Schedule {
  // class ScheduleService implements ISchedule {
  private instructor = new InstructorData();

  private room = new RoomDataAccess();

  private slot = new SlotDataAccess();

  private group = new GroupDataAccess();

  private section = new SectionDataAccess();

  private semester = new SemesterDataAccess();

  private course = new CourseDataAcces();

  constructor(private ScheduleData: ScheduleRepo) {

  }

  public createSchedule = async (
    instructorId: string,
    scheduleType: 'lecture' | 'lab',
    roomCode: string,
    semesterId: string,
    groupCode: string,
    groupCapacity: number,
    sectionCode: string,
    sectionCapacity: number,
    courseCode: string,
    startTime: Date,
    endTime: Date,
    day: 'Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday',
  ):
    Promise<ScheduleType> => {
    try {
      const instructor = await this.instructor.getById(instructorId);
      const room = await this.room.getByCode(roomCode);

      if (!instructor && instructorId) {
        throw new Error('Instructor does not exist.');
      }
      if (!room) {
        throw new Error('Room does not exist.');
      }

      let slot = await this.slot.getByTimeRange(startTime, endTime);
      if (!slot) {
        slot = await this.slot.create({ startTime, endTime, day });
      }
      const course = await this.course.getByCourseCode(courseCode);
      console.log(course);
      const group = await this.group.create({ groupCode, capacity: groupCapacity });
      const section = await this.section.create({ sectionCode, capacity: sectionCapacity });

      const schedule: ScheduleType = {
        scheduleType,
        CourseId: course?.id,
        InstructorId: instructor?.id,
        RoomId: room.id,
        SectionId: section.id,
        GroupId: group?.id,
        SlotId: slot.id,
        SemesterId: semesterId,
      };
      const createdSchedule = await this.ScheduleData.create(schedule);
      return createdSchedule;
    } catch (error) {
      throw new Error(`Failed to create the schedule, Please try again! Due to${error} Error`);
    }
  };

  public getScheduleById = async (id: string): Promise<Partial<ScheduleType>
    & {
      instructor?: Partial<InstructorType>
      , course?: Partial<CourseType>
      , slot?: Partial<SlotType>
      , group?: Partial<GroupType>
      , section?: Partial<SectionType>
      , room?: Partial<RoomType>
    }
  > => {
    try {
      const schedule = this.ScheduleData.getById(id);
      return schedule;
    } catch (error) {
      throw new Error('Failed to get the schedule, Please try again!');
    }
  };

  public createSchedules = async (schedules: ScheduleInputType[]): Promise<ScheduleType[]> => {
    try {
      const schedulePromises = schedules.map((scheduleData) => {
        const {
          instructorId,
          scheduleType,
          roomCode,
          semesterId,
          groupCode,
          groupCapacity,
          sectionCode,
          sectionCapacity,
          courseCode,
          startTime,
          endTime,
          day,
        } = scheduleData;

        return this.createSchedule(
          instructorId,
          scheduleType,
          roomCode,
          semesterId,
          groupCode,
          groupCapacity,
          sectionCode,
          sectionCapacity,
          courseCode,
          startTime,
          endTime,
          day,
        );
      });

      const createdSchedules = await Promise.all(schedulePromises);

      return createdSchedules;
    } catch (error) {
      throw new Error(`Failed to create schedules from CSV. Error: ${error}`);
    }
  };

  public getAllSchedules = async (): Promise<ScheduleType[]> => {
    try {
      return await this.ScheduleData.getAll();
    } catch (error) {
      throw new Error('Failed to get all schedules, Please try again!');
    }
  };

  public getInstructorSchedules = async (instructorId: string): Promise<ScheduleType[]> => {
    try {
      return await this.ScheduleData.getInstructorSchedules(instructorId);
    } catch (error) {
      throw new Error('Failed to get all schedules, Please try again!');
    }
  };

  public getRoomSchedules = async (roomId: string): Promise<ScheduleType[]> => {
    try {
      return await this.ScheduleData.getRoomSchedules(roomId);
    } catch (error) {
      throw new Error('Failed to get all schedules, Please try again!');
    }
  };

  public getCourseSchedules = async (courseId: string): Promise<ScheduleType[]> => {
    try {
      return await this.ScheduleData.getCourseSchedules(courseId);
    } catch (error) {
      throw new Error('Failed to get all schedules, Please try again!');
    }
  };

  public updateSchedule = async (scheduleId: string, updateData: Partial<ScheduleType>): Promise<boolean> => {
    try {
      const updatedSchedule = await this.ScheduleData.update(scheduleId, updateData);
      if (!updatedSchedule) {
        throw new Error('Schedule not found');
      }
      return updatedSchedule;
    } catch (error) {
      throw new Error('Failed to update the schedule, Please try again!');
    }
  };

  public deleteSchedule = async (scheduleId: string): Promise<boolean> => {
    try {
      const isDeleted = await this.ScheduleData.delete(scheduleId);

      return isDeleted;
    } catch (error) {
      throw new Error('Failed to delete the schedule, Please try again!');
    }
  };
  //
}

export default Schedule;
