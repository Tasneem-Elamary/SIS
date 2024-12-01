import {
  CourseType, GroupType, InstructorType, RoomType, ScheduleType, SectionType, SlotType,
  StudentType,
} from '../../types';

export interface ISchedule {
    createSchedule(instructorId:string, roomId:string,
    groupCode:string,
    sectionCode:string, startTime:Date, endTime:Date):
    Promise<ScheduleType>
    getScheduleById (id: string):Promise<Partial<ScheduleType>
                                                 &{instructor?:Partial<InstructorType>
                                                 , course?:Partial<CourseType>
                                                 , slot?:Partial<SlotType>
                                                 , group?:Partial<GroupType>
                                                 , section?:Partial<SectionType>
                                                 , room?:Partial<RoomType> }>;
    getAllSchedules(): Promise<ScheduleType[]>;
    updateSchedule(id: string, schedule: Partial<ScheduleType>): Promise<boolean>;
    deleteSchedule(id: string): Promise<void>;
    deleteSchedules (scheduleIds: string[]): Promise<number>;
    getStudentsInASpecificSection(SectionId: string, CourseId: string): Promise<StudentType[]>
    getStudentsInASpecificGroup(SectionId:string, CourseId: string): Promise<StudentType[]>;
    getSectionsInASpecificGroup(GroupId: string, CourseId: string):Promise<Partial<SectionType>[]>;

  }
