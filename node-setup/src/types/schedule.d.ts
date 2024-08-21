type ScheduleType ={
    id?:string,
    scheduleType: 'lab' | 'lecture';
    GroupId: string,
    SectionId: string,
    SlotId: string,
    RoomId: string,
    CourseId: string,
    InstructorId: string,
    SemesterId: string,
    };
export default ScheduleType;
