import StudentType from './student';

type ScheduleType ={
    Students?: StudentType;
    id?:string,
    scheduleType: 'lab' | 'lecture';
    GroupId: string|undefined,
    SectionId: string|undefined,
    SlotId: string|undefined,
    RoomId: string|undefined,
    CourseId: string|undefined,
    InstructorId1: string|undefined,
    InstructorId2?: string|undefined,
    SemesterId: string|undefined,
    level?:number;
    cell?:number;
    DepartmentId?:string;
    cell?:number

    };
export default ScheduleType;
