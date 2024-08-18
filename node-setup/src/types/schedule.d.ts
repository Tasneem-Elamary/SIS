type ScheduleType ={
    id?:string,
    type: 'lab' | 'lecture';
    groupId: string,
    sectionId: string,
    slotId: string,
    roomId: string,
    courseId: string,
    instructorId: string,
    semesterId: string,
    };
export default ScheduleType;
