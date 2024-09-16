import {
  CourseType, GroupType, InstructorType, RoomType, ScheduleType, SectionType, SlotType,
} from '../../types'; // Adjust path as necessary

 interface ScheduleRepo {
    create(schedule: ScheduleType): Promise<ScheduleType>;
    getById(id: string): Promise<Partial<ScheduleType>
    & { instructor?: Partial<InstructorType>,
        course?: Partial<CourseType>,
        slot?: Partial<SlotType>,
        group?: Partial<GroupType>,
        section?: Partial<SectionType>,
        room?: Partial<RoomType>
      }>
    getAll(): Promise<ScheduleType[]>;
    getInstructorSchedules(InstructorId:string): Promise<ScheduleType[]>;
    getRoomSchedules(RoomId:string): Promise<{schedules:ScheduleType[], roomData:RoomType}>
    getCourseSchedules(CourseId:string): Promise<ScheduleType[]>;
    update(id: string, schedule: Partial<ScheduleType>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    findExistingSchedule(schedule: Partial<ScheduleType>): Promise<ScheduleType | null>;
}
export default ScheduleRepo;
