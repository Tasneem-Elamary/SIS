type ScheduleType ={
    id?:string,
    scheduleType: 'lab' | 'lecture';
    GroupId: string|undefined,
    SectionId: string|undefined,
    SlotId: string|undefined,
    RoomId: string|undefined,
    CourseId: string|undefined,
    InstructorId: string|undefined,
    SemesterId: string|undefined,
    level?:number;
    cell?:number;
    DepartmentId?:string;
    cell?:number

    };
export default ScheduleType;
