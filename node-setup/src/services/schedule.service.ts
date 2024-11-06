import { ISchedule } from './interfaces/ISchedule';
import {
  CourseType, GroupType, InstructorType, RoomType, ScheduleType, SectionType, SlotType,
  StudentType,
} from '../types';
import { ScheduleRepo } from '../persistance/Repositories';
import GroupDataAccess from '../persistance/postgresDBDataAccess/group.data';
import { SlotDataAccess } from '../persistance/postgresDBDataAccess/slot.data';
import { SectionDataAccess } from '../persistance/postgresDBDataAccess/section.data';
import InstructorData from '../persistance/postgresDBDataAccess/instructor.data';
import RoomDataAccess from '../persistance/postgresDBDataAccess/room.data';
import { SemesterDataAccess } from '../persistance/postgresDBDataAccess/semester.data';
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
    instructorCode: string,
    scheduleType: 'lecture' | 'lab',
    roomCode: string,
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
      const instructor = await this.instructor.getByCode(instructorCode);
      const room = await this.room.getByCode(roomCode);

      if (!instructor && instructorCode) {
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
      let group = await this.group.getByGroupCodeAndCapacity(groupCode, groupCapacity);
      if (!group) group = await this.group.create({ groupCode, capacity: groupCapacity });
      let section = await this.section.getBySectionCodeAndCapacity(sectionCode, sectionCapacity);
      if (!section) section = await this.section.create({ sectionCode, capacity: sectionCapacity });

      const semester = await this.semester.getCurrentSemester();

      const schedule: ScheduleType = {
        scheduleType,
        CourseId: course?.id,
        InstructorId: instructor?.id,
        RoomId: room.id,
        SectionId: section.id,
        GroupId: group?.id,
        SlotId: slot.id,
        SemesterId: semester?.id,

      };
      const createdSchedule = await this.ScheduleData.create(schedule);
      return createdSchedule;
    } catch (error) {
      console.log(`Failed to create the schedule, Please try again! Due to${error} Error`);
      throw new Error('Failed to create the schedules, Please try again!');
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
          instructorCode,
          scheduleType,
          roomCode,
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
          instructorCode,
          scheduleType,
          roomCode,
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

  public getInstructorSchedules = async (instructorId: string):Promise<{ schedules: ScheduleType[], instructorData:(InstructorType | undefined) }> => {
    try {
      return await this.ScheduleData.getInstructorSchedules(instructorId);
    } catch (error) {
      throw new Error('Failed to get all schedules, Please try again!');
    }
  };

  public getStudentSchedules = async (studentId: string):Promise<{ schedules: ScheduleType[]}> => {
    try {
      return await this.ScheduleData.getStudentSchedules(studentId);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to get all schedules, Please try again!');
    }
  };

  public getStudentPendingSchedules = async (studentId: string):Promise<{ schedules: ScheduleType[]}> => {
    try {
      return await this.ScheduleData.getStudentPendingSchedules(studentId);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to get all schedules, Please try again!');
    }
  };

  public getStudenToRegistertSchedules = async (studentId: string):Promise<{ schedules: ScheduleType[]}> => {
    try {
      return await this.ScheduleData.getStudentToReisterSchedules(studentId);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to get all schedules, Please try again!');
    }
  };

  public getRoomSchedules = async (roomId:string): Promise<{schedules:ScheduleType[], roomData:RoomType}> => {
    try {
      return await this.ScheduleData.getRoomSchedules(roomId);
    } catch (error) {
      throw new Error('Failed to get all schedules, Please try again!');
    }
  };

  public getCourseSchedules = async (courseId: string): Promise<{schedules:ScheduleType[], courseData:CourseType}> => {
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

  public deleteSchedules = async (scheduleIds: string[]): Promise<number> => {
    try {
      let numOfDeleted = 0;

      for (const scheduleId of scheduleIds) {
        console.log('service logging', scheduleId);
        const deletionSuccess = await this.deleteSchedule(scheduleId);
        if (deletionSuccess) numOfDeleted += 1;
      }

      return numOfDeleted;
    } catch (error) {
      console.error('Error deleting schedules:', error);
      throw new Error('Failed to delete schedules, Please try again!');
    }
  };

  public getStudentsInASpecificSection = async (CourseId: string, SectionId: string): Promise<StudentType[]> => {
    try {
      const students = this.section.getStudentsInASpecificSection(CourseId, SectionId);
      return students;
    } catch (error) {
      throw new Error('Failed to et section students!');
    }
  };

  public getStudentsInASpecificGroup = async (CourseId: string, GroupId: string): Promise<StudentType[]> => {
    try {
      const students = this.group.getStudentsInASpecificGroup(CourseId, GroupId);
      return students;
    } catch (error) {
      throw new Error('Failed to et group students!');
    }
  };

  public getSectionsInASpecificGroup = async (CourseId: string, GroupId: string): Promise<Partial<SectionType>[]> => {
    try {
      const sections = this.group.getSectionsInASpecificGroup(CourseId, GroupId);
      return sections;
    } catch (error) {
      throw new Error('Failed to et group sections!');
    }
  };

  //
}

export default Schedule;
